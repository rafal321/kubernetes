#!/bin/sh
# rk ver. 2024-11-25
set -euo pipefail
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