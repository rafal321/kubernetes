 found this project
 I haven't tested it
 I have a copy of the image in my dockerhub:  therafk/kubernetes-s3-mysql-backup
 
FROM alpine:3.20
apk update
apk add --no-cache mysql-client aws-cli zip tar
WORKDIR /work
COPY db_bkp.sh .
COPY gen_cred.sh .
RUN chmod +x db_bkp.sh
RUN chmod +x gen_cred.sh
CMD ["./gen_cred.sh"]



docker commit container_id imagename

chmod +x db_bkp.sh

----
gen_cred.sh user password host
db_bkp.sh bucket path/
----

root P@ssword123
raf-ojt-bucket path-a/


mysql -uroot -hmycluster-v1.mysql-cluster.svc.cluster.local -pP@ssword123
######################################

/work # cat db_bkp.sh
#!/bin/sh
S3BUCKET=$1
S3PATH=$2
DBS_LIST=$(mysql -Bse 'SHOW DATABASES' | grep -v 'information_schema\|mysql\|sys\|performance_schema')
TODAY=$(date +%FT%H-%M-%a)
echo "--START: $(date)"
for DB in ${DBS_LIST}; do
   mysqldump --defaults-file=cred.cnf --triggers --routines --events $DB | gzip | aws s3 cp - s3://$S3BUCKET/$S3PATH"${DB}-bkp-${TODAY}.sql.gz"
done
aws s3 ls s3://$S3BUCKET/$S3PATH --human-readable
echo "--END..: $(date)"

######################################

/work # cat gen_cred.sh
#!/bin/sh
echo  "[client]" > cred.cnf
echo "user=$1" >> cred.cnf
echo "password=$2" >> cred.cnf
echo "host=$3" >> cred.cnf

################# WORKS  WORKS WORKS WORKS #####################
	-- MariaDB dump 10.19  Distrib 10.11.10-MariaDB, for Linux (x86_64)		
	[it is not mysql client it is mariadb client (it doesn't know GTID variable)]

FROM alpine:3.20
RUN apk add --update --no-cache mysql-client mariadb-connector-c
RUN apk add aws-cli zip tar
WORKDIR work
COPY db_bkp.sh .
RUN chmod +x db_bkp.sh


---------------------------------------
/work # cat db_bkp.sh
#!/bin/sh
# rk ver. 2024-11-25
DBCREDS="-u$DBUSER -h$DBHOST -p$DBPASS"
DBS_LIST=$(mysql $DBCREDS -Bse 'SHOW DATABASES;' 2>/dev/null | grep -v 'information_schema\|mysql\|sys\|performance_schema\|mysql_innodb_cluster_metadata')
TODAY=$(date +%FT%H-%M-%a)
echo "--START: $(date)"
for DB in ${DBS_LIST}; do
  mysqldump $DBCREDS --single-transaction --triggers --routines --events $DB 2>/dev/null | gzip | aws s3 cp - s3://$S3BUCKET/$S3PATH/"${DB}-bkp-${TODAY}.sql.tgz"
done
echo "s3://$S3BUCKET/$S3PATH/"
aws s3 ls s3://$S3BUCKET/$S3PATH/ --human-readable | grep -E "$TODAY"
echo "--END..: $(date)"
---------------------------------------

S3BUCKET					my-bucket
S3PATH						path-one	or	path-one/path-two
----
DBUSER
DBHOST
DBPASS
  
DBCREDS="$(-u$DBUSER -h$DBHOST -p$DBPASS)"

-----------------
################# WORKS  WORKS WORKS WORKS #####################



########### therafk/train-schedule:2.1
FROM public.ecr.aws/amazonlinux/amazonlinux   2023
dnf install awscli mariadb105 zip tar



S3PATH=a-path
S3BUCKET=raf-ojt-bucket
DBPASS=P@ssword123
DBHOST=mysql-cluster.mysql-cluster.svc.cluster.local
DBUSER=root


On linux in sh script I need to grep for TODAY variable value. How can I use a shell variable with grep command? the following aws s3 command fails. can you fix it?

TODAY=$(date +%FT%H-%M-%a)
aws s3 ls s3://my-bucket/my-path/ | grep "$TODAY"