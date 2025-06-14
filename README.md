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
