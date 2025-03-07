The Best Service Mesh: Linkerd vs Kuma vs Istio vs Consul Connect comparison + Cilium and OSM on top<br>
https://youtu.be/TAlpaC_NSUw?si=wP7MqtsMmIb4fMx4

Sample App:
https://github.com/instana/robot-shop

Deploy an E Commerce Three Tier application on AWS EKS | 8 Services and 2 Databases<br>
https://youtu.be/8T0UnSgywzY?si=LBCMa3xiTB64N0u7


https://ramitsurana.github.io/awesome-kubernetes/applications/applications/

## -------------------
created ns before app deployment
cd robot-shop/K8s/helm
helm install robot-shop --namespace robot-shop .helm install robot-shop --namespace robot-shop .

To render yaml:
helm install --dry-run --debug robot-shop --namespace robot-shop . > rk-yaml-ver1.yaml

to rerun helm deployment:
helm upgrade

Modified robot-shop/K8s/helm/templates/web-service.yaml     for ClusterIp
