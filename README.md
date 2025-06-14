## handy charts
helm install metrics-server metrics-server/metrics-server --namespace kube-system --set "args={--kubelet-insecure-tls}"

### Sample app
kubectl apply -f https://github.com/aws-containers/retail-store-sample-app/releases/latest/download/kubernetes.yaml
