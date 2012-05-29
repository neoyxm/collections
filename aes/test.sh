#!/bin/bash

KEY=546187EE7C373682086AEB12B321698A
IV=72146743DB21193F720E3C63A8CD9A48

TEST_FILE_LIST=(15B.data 16B.data 17B.data)
echo "KEY: "$KEY;
echo "IV: "$IV;

for var in ${TEST_FILE_LIST[@]};do

echo "======== Testing :$var =======";

## gen the md5sum for orignal file
orignal_md5sum=`md5sum $var|awk '{print $1}'`
echo "Orignal md5sum:"$orignal_md5sum;

## Do the encrypt and decrypt jobs
rm -f /tmp/$var.aes /tmp/$var
./aes enc $KEY $IV $var /tmp/$var.aes > /dev/null;
./aes dec $KEY $IV /tmp/$var.aes /tmp/$var > /dev/null;

## gen the md5sum for decrypted file
decrypt_md5sum=`md5sum /tmp/$var|awk '{print $1}'`
echo "Decrypt md5sum:"$decrypt_md5sum;

## check the results
if [ "$orignal_md5sum" = "$decrypt_md5sum" ]; then 
echo -e '\033[0;32;1mpass\033[0m';
else
echo -e '\033[0;31;1mfail\033[0m';
fi 

echo "======== Testing end =======";

echo "";
done



