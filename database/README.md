This example creates a new container named "myshell" using a MySQL Operator image, and immediately executes MySQL Shell:
```
kubectl run --rm -it myshell --image=container-registry.oracle.com/mysql/community-operator -- mysqlsh
\connect root@svc.ns.svc.cluster.local
# ---------------------------------------------------------------
kubectl run --rm -it myshell --image=container-registry.oracle.com/mysql/community-operator -- mysqlsh \
--sql root@mysql-server-svc.mysql-server.svc.cluster.local -pPASS
```
