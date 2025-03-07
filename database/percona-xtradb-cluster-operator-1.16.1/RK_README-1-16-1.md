
git clone -b v1.16.1 https://github.com/percona/percona-xtradb-cluster-operator
# ----------------------

ubuntu@db-tools-dp-76cdb7767b-csl8f:~$ aws s3 ls --summarize --human-readable --recursive s3://raf-ojt-bucket/percona-bkp-manual-compress-1-16/ | grep Total
Total Objects: 847
   Total Size: 281.0 MiB
ubuntu@db-tools-dp-76cdb7767b-csl8f:~$ aws s3 ls --summarize --human-readable --recursive s3://raf-ojt-bucket/percona-bkp-manual-nocompress-1-16/ | grep Total
Total Objects: 1070
   Total Size: 2.6 GiB

# ----------------------
>> kubectl get pxc
NAME       ENDPOINT                        STATUS   PXC   PROXYSQL   HAPROXY   AGE
cluster1   cluster1-haproxy.percona-1-16   ready    3                2         110m

kubectl get pxc-backup |c
NAME                                          CLUSTER    STORAGE      DESTINATION                                                                                STATUS      COMPLETED   AGE
backup-man-2025-02-05-1411                    cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-bkp-manual-nocompress-1-16/cluster1-2025-02-05-14:12:12-full   Succeeded   81m         83m
backup-man-compress-2025-02-05-1435           cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-bkp-manual-compress-1-16/cluster1-2025-02-05-14:35:58-full     Succeeded   58m         59m
cron-cluster1-s3-eu-west-20252515056-2t92l    cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-bkp-auto-compress-1-16/cluster1-2025-02-05-15:00:56-full       Succeeded   33m         34m
cron-cluster1-s3-eu-west-202525151556-2t92l   cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-bkp-auto-compress-1-16/cluster1-2025-02-05-15:15:56-full       Succeeded   18m         19m
cron-cluster1-s3-eu-west-202525153056-2t92l   cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-bkp-auto-compress-1-16/cluster1-2025-02-05-15:30:56-full       Succeeded   3m27s       4m

s3
PRE percona-bkp-auto-compress-1-16/
PRE percona-bkp-manual-compress-1-16/
PRE percona-bkp-manual-nocompress-1-16/







