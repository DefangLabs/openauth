CREATE OR REPLACE FUNCTION generate_unique_tenant(
  p_new_tenant TEXT,
  p_old_tenant TEXT,
  p_email TEXT
)
RETURNS TEXT AS $$
DECLARE
  base TEXT;
  candidate TEXT;
  counter INT := 0;

  -- Array of 50 three-letter words
  words TEXT[] := ARRAY[
    'ace', 'act', 'add', 'age', 'aid', 'aim', 'air', 'ale', 'all', 'ant',
    'ape', 'arm', 'art', 'ash', 'ask', 'bag', 'bar', 'bat', 'bid', 'bit',
    'cap', 'cat', 'cow', 'cup', 'dig', 'dog', 'dry', 'eat', 'fit', 'fun',
    'gap', 'gem', 'get', 'hit', 'ice', 'jar', 'joy', 'key', 'lap', 'log',
    'man', 'mix', 'new', 'nod', 'oil', 'pop', 'rob', 'run', 'sky', 'sun'
  ];

  -- Temporary array for shuffling
  shuffled_words TEXT[];
  i INT;
  j INT;
  temp TEXT;
BEGIN
  -- If a new tenant is provided and it's changed, check uniqueness and increment counter
  IF p_new_tenant IS NOT NULL AND p_new_tenant != p_old_tenant THEN
    candidate := p_new_tenant;
    WHILE EXISTS (SELECT 1 FROM users WHERE tenant = candidate) LOOP
      counter := counter + 1;
      candidate := p_new_tenant || counter;
    END LOOP;
  -- Else if email is provided, generate using email
  ELSIF p_email IS NOT NULL AND length(trim(p_email)) > 0 THEN
    -- Take the local part up to 12 characters, remove non-alphanumeric
    base := substring(
      regexp_replace(lower(split_part(p_email, '@', 1)), '[^a-z0-9]', '', 'g')
      FROM 1 FOR 12
    );
    candidate := base;
    -- Loop until tenant is unique
    WHILE EXISTS (SELECT 1 FROM users WHERE tenant = candidate) LOOP
      counter := counter + 1;
      candidate := base || counter;
    END LOOP;
  -- Else generate random from the word list
  ELSE
    -- Shuffle 'words' via a simple Fisher-Yates shuffle
    shuffled_words := words;
    FOR i IN 1..array_length(shuffled_words, 1) LOOP
      j := floor(random() * (array_length(shuffled_words, 1) - i + 1))::int + i;
      IF j != i THEN
        temp := shuffled_words[i];
        shuffled_words[i] := shuffled_words[j];
        shuffled_words[j] := temp;
      END IF;
    END LOOP;

    -- Concatenate the first three shuffled words with dashes
    base := shuffled_words[1] || '-' || shuffled_words[2] || '-' || shuffled_words[3];
    candidate := base;
    -- Loop until tenant is unique
    WHILE EXISTS (SELECT 1 FROM users WHERE tenant = candidate) LOOP
      counter := counter + 1;
      candidate := base || counter;
    END LOOP;
  END IF;

  RETURN candidate;
END;
$$ LANGUAGE plpgsql;

-- Next, create the trigger function that uses the above function:
CREATE OR REPLACE FUNCTION set_tenant_if_empty()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tenant := generate_unique_tenant(NEW.tenant, OLD.tenant, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Finally, attach the trigger to the `users` table:
CREATE TRIGGER users_tenant_trigger
BEFORE INSERT OR UPDATE
ON users
FOR EACH ROW
EXECUTE PROCEDURE set_tenant_if_empty();
