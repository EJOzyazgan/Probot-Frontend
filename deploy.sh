#/bin/bash
#upload files
aws s3 cp ./dist s3://probotplayground.com --recursive --acl public-read