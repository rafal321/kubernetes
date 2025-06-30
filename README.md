## handy charts
```
helm install metrics-server metrics-server/metrics-server --namespace kube-system --set "args={--kubelet-insecure-tls}"
helm install metrics-server metrics-server/metrics-server --namespace kube-system --set "args={--kubelet-insecure-tls}" \
--set "nodeSelector.karpenter\.sh/nodepool=rk1-node-pool-spot"

helm install metrics-server metrics-server/metrics-server --namespace kube-system --set "args={--kubelet-insecure-tls}" \
  --set "nodeSelector.karpenter\.sh/nodepool=system" \
  --set 'tolerations[0].key=CriticalAddonsOnly' \
  --set 'tolerations[0].operator=Exists'

helm uninstall metrics-server --namespace kube-system
```

### Sample app
```
kubectl apply -f https://github.com/aws-containers/retail-store-sample-app/releases/latest/download/kubernetes.yaml
```
### prometheus, grafana
```bash
echo -n 'adminuser' > ./admin-user # change your username
echo -n 'p@ssword!' > ./admin-password # change your password
kubectl create secret generic grafana-admin-credentials --from-file=./admin-user --from-file=admin-password -n monitoring
kubectl get secret -n monitoring grafana-admin-credentials -o jsonpath="{.data.admin-user}" | base64 --decode
kubectl get secret -n monitoring grafana-admin-credentials -o jsonpath="{.data.admin-password}" | base64 --decode
vi values.yaml
# - - - -
helm install -n monitoring prometheus prometheus-community/kube-prometheus-stack -f values.yaml
kubectl port-forward services/grafana 8080:80
kubectl port-forward services/prometheus-prometheus 8081:9090

# if you need to update
helm upgrade -n monitoring prometheus prometheus-community/kube-prometheus-stack -f values.yaml

# to see values
helm show values prometheus-community/kube-prometheus-stack > default_values.yaml
```
[Beautiful Dashboards with Grafana and Prometheus...](https://technotim.live/posts/kube-grafana-prometheus/)
[Kubernetes Monitoring Made Easy with Prometheus | KodeKloud](https://www.youtube.com/watch?v=6xmWr7p5TE0&t=613s)
