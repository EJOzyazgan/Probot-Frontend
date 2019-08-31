#/bin/bash
#upload files
aws s3 cp ./dist/AceCode-Frontend s3://probotplayground.com --recursive --acl public-read