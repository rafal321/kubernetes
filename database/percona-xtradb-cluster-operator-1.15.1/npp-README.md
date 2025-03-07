## =================================================================================================
 How to deploy MySQL on Kubernetes with Percona Operator for MySQL
 https://youtu.be/NpCz7Bjg-8s?si=8FYCDM3fBfxlaJSw
  - backup s3, restore, 

    volumeSpec:                       # _RAF_
      persistentVolumeClaim:
        storageClassName: gp3-exp
        resources:
          requests:
            storage: 2G
            
    configuration: |
      innodb_buffer_pool_size={{containerMemoryLimit * 3/4}}
      max_connections=95
      lower_case_table_names=1
      long_query_time=5
      slow_query_log=1
      log_bin_trust_function_creators=1
      innodb_print_all_deadlocks=1


git clone -b release-1.15.1 https://github.com/percona/percona-xtradb-cluster-operator.git
## =================================================================================================
Sergey Pronin - Percona XtraDB Cluster Operator - Architecture Decisions - Percona Live 2021            AWESOME theory only Sergey Pronin
https://www.youtube.com/watch?v=pJaZyIDeIJs
Why PXC
Percona XtraDB Cluster (PXC) vs. Percona Server for Mysql (PS)
PXC = Galera + Mysql
[...]
Why Proxies
ProxySQL vs HAProxy           (14:45)
https://check.percona.com/    (24:25)
Backup, Restore               (25:25)
Group Replication in Msql8 vs Galera         (43:30)   Synchrounus Replication
    Async Replication vs Group Replication


https://www.youtube.com/watch?v=0gSSmdNB-Zo
https://www.youtube.com/watch?v=J3sOAQLaFfQ
## =================================================================================================
Automated volume expansion in Percona Operator for MySQL    Sergey Pronin
https://youtu.be/gOXvgptj3UI?si=BjG58jBeoQ-IgMVR
https://www.percona.com/blog/percona-operator-for-mysql-now-supports-automated-volume-expansion-in-technical-preview/

## =================================================================================================
Using Kubernetes Operators to Migrate From MySQL Galera to MySQL Group Replication — Marco Tusa
https://youtu.be/Rudczyd8cvQ?si=MV39PZuLdVXgFjXj        (22:05)

- CREATE:
kubectl create ns mt-ps
kubectl apply --server-side -f bundle.yaml    Install Operator
kubectl apply --server-side -f cr.yaml        Deploy Cluster
kubectl get pxc                               Show Cluster Status
- DELETE:
kubectl delete -f cr.yaml 
kubectl delete pvc --all
- INFO:
kubectl get pxc
kubectl describe configmaps cluster2-pxc

- TO CONNECT:
kubectl run -it --rm percona-client --image=percona:8.0 --restart=Never -- mysql -hcluster2-pxc -uroot -p""
kubectl run -it --rm percona-client --image=percona:8.0 --restart=Never -- bash -il
  mysql -h cluster1-proxysql -uuser1 -ppassword1
  mysql> SELECT * FROM database1.table1 LIMIT 1;

while true; do mysql -uroot -hcluster2-haproxy -p'XXX' -Bse 'SELECT @@hostname;' 2>/dev/null ; sleep 1; done
SELECT ID,USER,HOST,SUBSTRING(Info, 1, 50) as Info FROM INFORMATION_SCHEMA.PROCESSLIST where user not in ('operator','event_scheduler','system user');

kubectl exec -it cluster2-pxc-0|1|2  -- bash
  mysql -uroot -p"xxx" -h127.0.0.1

kubectl patch crd/perconaxtradbclusters.pxc.percona.com -p '{"metadata":{"finalizers":[]}}' --type=merge        if sustom resources get stuck when delete
## =================================================================================================
git clone -b release-1.15.1 https://github.com/percona/percona-xtradb-cluster-operator.git

git clone -b v1.16.1 https://github.com/percona/percona-xtradb-cluster-operator       (https://docs.percona.com/percona-operator-for-mysql/pxc/backup-tutorial.html)
cd percona-xtradb-cluster-operator
## =================================================================================================


Best Practices of Running Databases on Kubernetes
https://youtu.be/Yo8E2YyiO9s?si=mflLAYp-hp6ld3Wq

## ---11----------------------------
Is it galera?
https://docs.percona.com/percona-operator-for-mysql/pxc/architecture.html
Galera cluster vs percona xtradb cluster. 

https://www.reddit.com/r/mysql/comments/iarc6t/galera_cluster_vs_percona_xtradb_cluster/

MariaDB Galera cluster or Percona XtraDB cluster? Both use Galera for synchronous replication.

Lastly you will need to either setup ProxySQL or HAProxy for sending traffic to the backends, detecting failures, etc.

I also invite you to have a look at MySQL InnoDB Cluster. The easiest HA solution for MySQL. All components are integrated and are part of MySQL Community Edition (GPL). You can specify multi-writer if needed and setup different consistency levels. In the backend, it's the native MySQL Group Replication that is used and you can orchestrate everything in 5 mins using MySQL Shell.

I try with Galera, Percona Xtradb, etc... And found that innodb is very easy to setup and use! And also is very very stable. I don't know why but i had crashes with galera and percona, but innodb cluster runs really solid. Maybe i will only change MySQL Router with ProxySQL. 

https://docs.percona.com/percona-xtradb-cluster/8.0/install-index.html#ports-required
## ---11----------------------------

Using Kubernetes Operators to Migrate From MySQL Galera to MySQL Group Replication — Marco Tusa (june 2024)
https://www.youtube.com/watch?v=Rudczyd8cvQ&t=2223s

How the Percona Operator for MySQL Works in Practice: Does it Deliver On its Promises? Fernando Laud (june 2024)
https://www.youtube.com/watch?v=HUEtbZWff7o&t=2481s
- s3 backups, pitr how to restore etc ; once off backups etc
- git clone -b release-1.12.1 https://github.com/percona/percona-xtradb-cluster-operator.git   (27:45)
- git clone -b release-1.15.1 https://github.com/percona/percona-xtradb-cluster-operator.git
- increasing resources (31:00)

Database Diagnostics and Monitoring in Kubernetes Sveta Smirnova at percona (june 2024)
https://youtu.be/8lAu6mmmgv8?si=MRnMarvcU_XJNwhe



+++++++++++++++++++++++++++++
A demo application for experimenting with databases and PMM. Test load on databases
https://forums.percona.com/t/a-demo-application-for-experimenting-with-databases-and-pmm-test-load-on-databases/35685/1

https://github.com/dbazhenov/github-stat?tab=readme-ov-file#launching-in-kubernetes
https://github.com/dbazhenov/github-stat?tab=readme-ov-file#running-locally-with-docker-compose

+++++++++++++++++++++++++++++




================================================================================
https://learn.percona.com/hubfs/Kubernetes%20Squad%20Page%20-%20Resources/PERCONA_CHEATSHEET_MySQL_web.pdf?_gl=1*bl2wg7*_gcl_au*MTY4MTg2MDQwMS4xNzM1MjA2ODE4
Percona Operator
for MySQL
C H E A T S H E E T
---
    Deploy and connect
Get DB cl endpoint to connect   kubectl create namespace <NAMESPACE_NAME>
Switch context to namespace     kubectl config set-context --current --namespace=<NAMESPACE_NAME>
Deploy Operator                 kubectl apply -f bundle.yaml
Deploy database cluster         kubectl apply -f cr.yaml
List all database clusters      kubectl get pxc
Get root user password          kubectl get secret <DB_CLUSTER_NAME>-secrets -o jsonpath='{.data.root}' | base64 --decode
Get DB cl endpoint to connect   kubectl get pxc <DB_CLUSTER_NAME> -o jsonpath='{.status.host}'
---
    Backup and restore
Create manual backup            kubectl apply -f backup.yaml
List available backups          kubectl get pxc-backup
Get backup status               kubectl get pxc-backup <BACKUP_NAME>
Restore backup                  kubectl apply -f restore.yaml
If everything is fine,
you can cleanup the job:        kubectl delete pxc-restore/restore07
Get restore status              kubectl get pxc-restore <RESTORE_NAME>
								                kubectl describe pxc-restore restore1	OR  kubectl get pxc-restore restore1 -oyaml
Delete backup                   kubectl delete pxc-backup <BACKUP_NAME>
---
    Troubleshoot
Get cluster status             kubectl get pxc <DB_CLUSTER_NAME>
Get details about cluster      kubectl get pxc <DB_CLUSTER_NAME> -o yaml
Get all the Pods of cluster    kubectl get pods -l app.kubernetes.io/instance=<DB_CLUSTER_NAME> -l app.kubernetes.io/part-of=percona-xtradb-cluster
Get Operator Pod name          kubectl get pods -l app.kubernetes.io/component=operator -l app.kubernetes.io/instance=percona-xtradb-cluster-operator -o name
Get logs of Operator           kubectl logs -f <OPERATOR_POD_NAME>
Get Service resources of DB cl kubectl get svc -l app.kubernetes.io/instance=percona-xtradb-cluster-operator -l app.kubernetes.io/instance=<DB_CLUSTER_NAME>
Delete database cluster        kubectl delete pxc <DB_CLUSTER_NAME>

================================================================================
How to restore backup to a new Kubernetes-based environment 2025-01-29
https://docs.percona.com/percona-operator-for-mysql/pxc/backups-restore-to-new-cluster.html

kubectl get pxc				<<<<<<<<<<<<<<<<<<<<
NAME       ENDPOINT                   STATUS   PXC   PROXYSQL   HAPROXY   AGE
cluster1   cluster1-haproxy.percona   ready    3                2         3h45m

kubectl get pxc-backup		<<<<<<<<<<<<<<<<<<<<
NAME                  CLUSTER    STORAGE      DESTINATION                                                            STATUS      COMPLETED   AGE
backup1-250131-1930   cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-backup/cluster1-2025-01-31-19:32:42-full   Succeeded   26s         90s

cron-cluster1-s3-eu-west-20252412022-2t92l    cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-backup-auto/cluster1-2025-02-04-12:00:22-full   Succeeded   29m         31m
cron-cluster1-s3-eu-west-202524121522-2t92l   cluster1   s3-eu-west   s3://raf-ojt-bucket/percona-backup-auto/cluster1-2025-02-04-12:15:22-full   Succeeded   15m         16m
-----------------------------
aws s3 ls s3://raf-ojt-bucket/percona-backup/
                           PRE cluster1-2025-01-31-19:32:42-full.sst_info/
                           PRE cluster1-2025-01-31-19:32:42-full/
2025-01-31 19:33:44     102698 cluster1-2025-01-31-19:32:42-full.md5
2025-01-31 19:32:53        128 cluster1-2025-01-31-19:32:42-full.sst_info.md5
- - - - - -
aws s3 ls s3://raf-ojt-bucket/percona-backup/cluster1-2025-01-31-19:32:42-full
                           PRE cluster1-2025-01-31-19:32:42-full.sst_info/
                           PRE cluster1-2025-01-31-19:32:42-full/
2025-01-31 19:33:44     102698 cluster1-2025-01-31-19:32:42-full.md5
2025-01-31 19:32:53        128 cluster1-2025-01-31-19:32:42-full.sst_info.md5


# ############################################

250130 15:09:31 xbcloud: [0] Downloading percona-backup/cluster1-2025-01-29-15:15:11-full/team_ana_dev_xevent_vts/product_xmls.ibd.00000000000000000000.
250130 15:09:31 xbcloud: [0] Download successfull percona-backup/cluster1-2025-01-29-15:15:11-full/team_ana_dev_xlocation/codes.ibd.00000000000000000001, size 10485826 
250130 15:09:31 xbcloud: S3 error message: The specified key does not exist.
250130 15:09:31 xbcloud: [0] Download failed. Cannot download percona-backup/cluster1-2025-01-29-15:15:11-full/team_ana_dev_xevent_vts/product_xmls.ibd.00000000000000000000.
250130 15:09:31 xbcloud: Download failed.
+ set +o xtrace 
vault configuration not found 
+ xtrabackup --use-memory=100MB --prepare  --rollback-prepared-trx     --xtrabackup-plugin-dir=/usr/lib64/xtrabackup/plugin --target-dir=/datadir/pxc_sst_fHXl 
2025-01-30T15:09:31.395776-00:00 0 [Note] [MY-011825] [Xtrabackup] recognized client arguments: --use-memory=100MB --prepare=1 --rollback-prepared-trx=1 --xtrabackup-plugin-dir=/usr/lib64/xtrabackup/plugin --target-dir=/datadir/pxc_sst_fHXl
xtrabackup version 8.0.35-30 based on MySQL server 8.0.35 Linux (x86_64) (revision id: 6beb4b49) 
2025-01-30T15:09:31.395931-00:00 0 [Note] [MY-011825] [Xtrabackup] cd to /datadir/pxc_sst_fHXl/
2025-01-30T15:09:31.395968-00:00 0 [ERROR] [MY-011825] [Xtrabackup] cannot open ./xtrabackup_checkpoints
2025-01-30T15:09:31.395989-00:00 0 [ERROR] [MY-011825] [Xtrabackup] failed to read metadata from './xtrabackup_checkpoints'
Stream closed EOF for percona/restore-job-restore02-cluster1-bn7rq (xtrabackup)                                                                                                                                                                                              
- - - - - - -

