complete -C '/aws/dist/aws_completer' aws

echo $(date +%FT%H-%M-%a)

cat <<EOF > .my.cnf
[client]
user=
password=
host=

[mysqldump]
user=
password=
host=
quick
max_allowed_packet=16M
EOF

sudo chown ubuntu: /db-data/

==ERROR===============================
https://uly.me/aws-s3-killedted
AWS S3 Killedted
    copy a large file from AWS S3 bucket to the smallest Amazon Lightsail instance
aws configure set default.s3.max_concurrent_requests 4
    The default is 10 which was too much for a small instance.

