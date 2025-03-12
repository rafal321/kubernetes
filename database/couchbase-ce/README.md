nitializes and provisions a cluster.
https://docs.couchbase.com/server/current/rest-api/rest-initialize-cluster.html

couchbase logs:
/opt/couchbase/var/lib/couchbase/logs/
----------------------
Starting Couchbase Server -- Web UI available at http://<ip>:8091

││ and logs available in /opt/couchbase/var/lib/couchbase/logs
----------------------
apt update -y && apt install -y jq curl dnsutils vim
cbdb commands:      https://docs.couchbase.com/server/current/cli/cbcli/couchbase-cli-bucket-list.html
                    https://docs.couchbase.com/server/current/cli/cbcli/couchbase-cli-server-list.html

couchbase-cli bucket-list --cluster localhost --username Administrator --password password
couchbase-cli server-info --cluster localhost --username Administrator --password password
couchbase-cli cluster-info --cluster localhost --username Administrator --password password
couchbase-cli server-list --cluster localhost --username Administrator --password password  
couchbase-cli host-list --cluster localhost --username Administrator --password password  

couchbase-cli   <to see all commands>

-----------------------------------------------------------
1. Installing Couchbase Server on each node
2. Initializing the cluster and defining services on the first node with Couchbase-cli cluster-init
3. Adding additional nodes to the cluster with Couchbase-cli Server-add
4. Rebalancing to evenly distribute data across nodes
5. Configuring buckets, indexes, and other components like XDCR replication using additional Couchbase-cli commands

curl -X POST http://localhost:8091/clusterInit \
  -d hostname=cbdb-sts-0.cbdb-hsvc \
  -d port='SAME' \
  -u Administrator:password \
  -d clusterName=rkcbdb \
  -d 'services=kv'

  -d dataPath=<data-path>
  -d indexPath=<index-path>
  -d analyticsPath=<analytics-path>
  -d eventingPath=<eventing-path>

  -d memoryQuota=<integer>
  -d queryMemoryQuota=<integer>
  -d indexMemoryQuota=<integer>
  -d eventingMemoryQuota=<integer>
  -d ftsMemoryQuota=<integer>
  -d cbasMemoryQuota=<integer>
  -d afamily=[ 'ipv4' | 'ipv6' ]
  -d afamilyOnly=[ true | false ]
  -d nodeEncryption=[ 'on' | 'off' ]
  -d indexerStorageMode=[ 'plasma' | 'magma' ]

  -d allowedHosts=<list-of-naming-conventions>

  Community edition supports only the following combinations:
   \"data\", \"data, index, query\", \"data, index, query, full text search\""

   -d "services=kv%2Cn1ql" \

THIS WORKS - Initialize a Node with the CLI https://docs.couchbase.com/server/current/manage/manage-nodes/initialize-node.html
[1] ----
   couchbase-cli cluster-init -c localhost -u Administrator -p password --services data \
   --cluster-ramsize 256 --cluster-username rkcbdb --cluster-password password
DEPRECATED: Specifying -u/--username is deprecated
DEPRECATED: Specifying -p/--password is deprecated
SUCCESS: Cluster initialized

[2]
couchbase-cli Server-add -c <ip> -u Administrator -p <password> --server-add=<node-ip> \
 --server-add-username=<username> --server-add-password=<password>


 #### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 cli syntax
 lifecycle:
  postStart:
    exec:
      command:
        - /bin/sh
        - -c
        - |
		  sleep 15 && \
		  # Check if this is the first pod (ordinal 0)
          if [ "$(hostname)" == "cbdb-sts-0" ]; then
            # Initialize the cluster
			couchbase-cli cluster-init \
			  -c localhost:8091 \
			  --cluster-username Administrator \
			  --cluster-password password \
			  --cluster-name rkcbdb \
			  --services data,index,query \
			  --cluster-ramsize 512 \
			  --cluster-index-ramsize 256

            # Create a bucket
            couchbase-cli bucket-create \
              -c localhost:8091 \
              -u ${COUCHBASE_USERNAME} \
              -p ${COUCHBASE_PASSWORD} \
              --bucket ${COUCHBASE_BUCKET_NAME} \
              --bucket-type couchbase \
              --bucket-ramsize 100
          else
            # Join the cluster for other pods
			couchbase-cli server-add \
			  -c cbdb-st-0.cbdb-hsvc.default.svc.cluster.local:8091 \
			  -u Administrator \
			  -p password \
			  --server-add http://$(hostname -i):8091 \
			  --server-add-username Administrator \
			  --server-add-password password \
			  --services data,index,query
          fi


# ##############################################################


_____________________________________________________________
INITIALIZE:

couchbase-cli cluster-init \
  -c localhost:8091 \
  --cluster-username ${COUCHBASE_USERNAME} \
  --cluster-password ${COUCHBASE_PASSWORD} \
  --cluster-name rkcbdb \
  --services data,index,query \
  --cluster-ramsize 512 \
  --cluster-index-ramsize 256

couchbase-cli cluster-init -c localhost:8091 -u ${COUCHBASE_USERNAME} -p ${COUCHBASE_PASSWORD} -cluster-name {COUCHBASE_CLUSTER_NAME} --services data,index,query --cluster-ramsize 512 --cluster-index-ramsize 256
_____________________________________________________________
ADD:

couchbase-cli server-add \
  -c cbdb-sts-0.cbdb-hsvc.default.svc.cluster.local:8091 \
  -u ${COUCHBASE_USERNAME} \
  -p ${COUCHBASE_PASSWORD} \
  --server-add http://$(hostname -i):8091 \
  --server-add-username ${COUCHBASE_USERNAME} \
  --server-add-password ${COUCHBASE_PASSWORD} \
  --services data,index,query

ADD, AFTER POD RESTART:
	  <new pod ip>
echo "10.244.3.40" > /opt/couchbase/var/lib/couchbase/ip_start		and then: couchbase-cli server-add

couchbase-cli server-add -c cbdb-sts-0.cbdb-hsvc:8091 -u ${COUCHBASE_USERNAME} -p ${COUCHBASE_PASSWORD} --server-add http://$(hostname -i):8091 --server-add-username ${COUCHBASE_USERNAME} --server-add-password ${COUCHBASE_PASSWORD} --services data,index,query



_____________________________________________________________
REBALANCE:					THIS does not work:

couchbase-cli rebalance -c http://$(hostname -i) -u ${COUCHBASE_USERNAME}   -p ${COUCHBASE_PASSWORD} --no-ssl-verify

couchbase-cli rebalance -c cbdb-sts-0.cbdb-hsvc:8091 --username Administrator --password password

couchbase-cli rebalance -c cbdb-sts-0.cbdb-hsvc:8091 -u ${COUCHBASE_USERNAME} -p ${COUCHBASE_PASSWORD} --server-add  http://$(hostname -i) --server-add-username ${COUCHBASE_USERNAME} --server-add-password password --services data,index,query




It sounds like the IP address the node was originally configured for has changed. If you don't specify a hostname as the node's name when you first configured the node, Couchbase will attempt to auto-detect the node's public IP address and use that. However if that IP address changes then it runs into problems.

Take a look at the Install guide, specifically the section on Using hostnames for how to change a node's name.

 
_____________________________________________________________
CONNECT:

root@cbdb-sts-0:/# cbq --user Administrator
cbq> SELECT name FROM `beer-sample` WHERE brewery_id="mishawaka_brewing";
_____________________________________________________________
  
 			<po>	<svc>	<ns>
nslookup cbdb-sts-0.cbdb-hsvc
kubectl port-forward cbdb-sts-0 8091:8091 



$0.662/Hour   x 3 x 24 x 30 = $1425.6	cbdb
$0.127/Hour	  x 3 x 24 x 30				instance
# ############################# 7.6.2 build 3721
Issues error errors
Rebalancing from command line
https://www.couchbase.com/forums/t/rebalancing-from-command-line/38909
https://jira.issues.couchbase.com/browse/MB-62844?_gl=1%2A8oe8ef%2A_gcl_au%2AMTA3NzMwNDEzNS4xNzQwMzg5ODkx

couchbase-cli rebalance -c $(hostname -i):8091 --username Administrator --password password
ERROR: Unable to get the HTTPS port of the 10.244.1.4:8091 node

/opt/couchbase/bin/couchbase-cli rebalance -c http://localhost -u Administrator -p password --server-remove=172.23.121.239:8091

Rebalancing        
couchbase-cli rebalance -c http://$(hostname -i):8091 -u Administrator -p password --no-ssl-verify --no-progress-bar





cat <<\EOF >> aa-script.sh
#!/bin/sh
if [ "${HOSTNAME}" == "cbdb-sts-0" ]; then
echo x1 > xxx1.txt
echo ${HOSTNAME} >> xxx1.txt
echo ${COUCHBASE_USERNAME} >> xxx1.txt
echo ${COUCHBASE_PASSWORD} >> xxx1.txt
else
  # Join the cluster for other pods
echo x2 > xxx2.txt
echo ${HOSTNAME} >> xxx2.txt
echo ${COUCHBASE_USERNAME} >> xxx2.txt
echo ${COUCHBASE_PASSWORD} >> xxx2.txt
fi
EOF

## ############################################################################
## is port forward safe?	kubectl port-forward cbdb-sts-0 8091:8091

Yes, the connection established using kubectl port-forward is encrypted and generally considered safe. When you run the command kubectl port-forward cbdb-sts-0 8091:8091, it creates a secure tunnel between your local machine and the Kubernetes cluster. This tunnel uses TLS (Transport Layer Security) encryption to protect the data in transit.

The connection works as follows:
    kubectl connects to one of the master nodes in your EKS cluster using an encrypted connection.
    The Kubernetes API server then establishes a connection to the specified pod (cbdb-sts-0 in your case).
    All traffic between your local machine and the pod is routed through this encrypted tunnel.
This setup provides several security benefits:
    Encryption: The entire communication path is encrypted using TLS.
    Authentication: Kubernetes checks if you have the necessary permissions to perform the port-forwarding operation.
    Limited exposure: The forwarded port is only accessible on your local machine by default, reducing the attack surface.

However, it's important to note that while kubectl port-forward is secure, it's primarily intended for temporary access, debugging, and development purposes. For production environments or long-term access, it's generally recommended to use more robust solutions like properly configured Services, Ingresses, or API gateways.
## ############################################################################