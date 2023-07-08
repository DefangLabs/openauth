#!/bin/bash

set -e

apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      openssl \
    && apt-get install -y ca-certificates && apt-get clean

update-ca-certificates

# Folder passed as a parameter
FOLDER=$1

echo "@@ thing"

# Create the folder if it does not exist
mkdir -p $FOLDER

echo "@@ hash"

# Generate a SHA1 hash from the current timestamp
HASH=$(date +%s | sha1sum | awk '{print $1}')

echo "@@ ssl"

# Generate a new private key
openssl genpkey -algorithm RSA -out $FOLDER/$HASH.key

echo "@@ config"

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
basicConstraints = CA:TRUE
keyUsage = digitalSignature

[ alt_names ]
DNS.1 = org.com
"

echo "@@ write ssl config to temp"

# Write OpenSSL config to a temp file
echo "$CONFIG" > $FOLDER/temp_openssl.cnf

echo "@@ self-signed cert"

# Create a self-signed certificate with the provided configuration
openssl req -new -x509 -key $FOLDER/$HASH.key -out $FOLDER/$HASH.cert -days 365 -config $FOLDER/temp_openssl.cnf

echo "@@ create pem"

# Concatenate private key and certificate into a single .pem file
cat $FOLDER/$HASH.key $FOLDER/$HASH.cert > $FOLDER/$HASH.pem

echo "@@ prepend to pem or create new"

# If keystore.pem already exists, prepend new key and cert, else create new keystore.pem
if [ -f "$FOLDER/keystore.pem" ]; then
    cat $FOLDER/$HASH.pem $FOLDER/keystore.pem > $FOLDER/temp.pem && mv $FOLDER/temp.pem $FOLDER/keystore.pem
else
    cp $FOLDER/$HASH.pem $FOLDER/keystore.pem
fi

echo "@@ create cacrt"

cat $FOLDER/*.cert /etc/ssl/certs/ca-certificates.crt > $FOLDER/tmpcacrt.pem && mv $FOLDER/tmpcacrt.pem $FOLDER/ca-certificates.crt

# Remove temporary OpenSSL config file
rm $FOLDER/temp_openssl.cnf

# Echo the SHA1 of the newly created key
echo "Generated new key and certificate with ID: $HASH"
