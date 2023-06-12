#!/bin/bash

# Folder passed as a parameter
FOLDER=$1

# Create the folder if it does not exist
mkdir -p $FOLDER

# Generate a SHA1 hash from the current timestamp
HASH=$(date +%s | sha1sum | awk '{print $1}')

# Generate a new private key
openssl genpkey -algorithm RSA -out $FOLDER/$HASH.key

# OpenSSL Configuration
CONFIG="
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = req_ext
x509_extensions = v3_req

[ dn ]
C = CA
ST = BC
L = Vancouver
O = Org
OU = Org
CN = org.com

[ req_ext ]
subjectAltName = @alt_names

[ v3_req ]
keyUsage = digitalSignature

[ alt_names ]
DNS.1 = org.com
"

# Write OpenSSL config to a temp file
echo "$CONFIG" > $FOLDER/temp_openssl.cnf

# Create a self-signed certificate with the provided configuration
openssl req -new -x509 -key $FOLDER/$HASH.key -out $FOLDER/$HASH.cert -days 365 -config $FOLDER/temp_openssl.cnf

# Concatenate private key and certificate into a single .pem file
cat $FOLDER/$HASH.key $FOLDER/$HASH.cert > $FOLDER/$HASH.pem

# If keystore.pem already exists, prepend new key and cert, else create new keystore.pem
if [ -f "$FOLDER/keystore.pem" ]; then
    cat $FOLDER/$HASH.pem $FOLDER/keystore.pem > $FOLDER/temp.pem && mv $FOLDER/temp.pem $FOLDER/keystore.pem
else
    cp $FOLDER/$HASH.pem $FOLDER/keystore.pem
fi

cat $FOLDER/*.cert /etc/ssl/certs/ca-certificates.crt > $FOLDER/tmpcacrt.pem && mv $FOLDER/tmpcacrt.pem $FOLDER/ca-certificates.crt

# Remove temporary OpenSSL config file
rm $FOLDER/temp_openssl.cnf

# Echo the SHA1 of the newly created key
echo "Generated new key and certificate with ID: $HASH"
