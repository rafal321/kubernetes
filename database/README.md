This example creates a new container named "myshell" using a MySQL Operator image, and immediately executes MySQL Shell:
```
# [1]---------------------------------------
kubectl run --rm -it myshell --image=container-registry.oracle.com/mysql/community-operator -- mysqlsh
    \connect root@svc.ns.svc.cluster.local
# [2]---------------------------------------
kubectl run --rm -it myshell --image=container-registry.oracle.com/mysql/community-operator -- mysqlsh \
--sql root@mysql-server-svc.mysql-server.svc.cluster.local -pPASS
# [3]--------------------------------------
kubectl run --rm -it mysql8 --image=mysql:8 -- mysql -uroot -hmysql-server-svc.mysql-server.svc.cluster.local -pPASS
# [4]--------------------------------------
mysql -uroot -hmysql-server-svc.mysql-server.svc.cluster.local -pP@ssword123 -Bse 'show databases;' 2> /dev/null | grep -v "performance_schema\|information_schema"
```
A MySQL backup and recovery tutorial on K8s using the MySQL Operator for Kubernetes
https://severalnines.com/blog/mysql-backup-recovery-k8s/

