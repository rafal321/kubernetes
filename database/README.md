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
A MySQL backup and recovery tutorial on K8s using the MySQL Operator for Kubernetes <br>
https://severalnines.com/blog/mysql-backup-recovery-k8s/

# ---------------------------------<br>
Sample DB <br>
wget https://downloads.mysql.com/docs/sakila-db.tar.gz <br>
wget https://downloads.mysql.com/docs/world-db.tar.gz <br>
wget https://downloads.mysql.com/docs/airport-db.tar.gz <br>

```
SHOW GLOBAL VARIABLES LIKE 'local_infile';
SET GLOBAL local_infile = 'ON';
SHOW GLOBAL VARIABLES LIKE 'local_infile';
util.loadDump("airport-db", {threads: 2, deferTableIndexes: "all", ignoreVersion: true});
[client]
local_infile=1
```
