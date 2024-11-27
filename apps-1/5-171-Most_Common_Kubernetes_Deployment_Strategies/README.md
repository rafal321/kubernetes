[5]	Most Common Kubernetes Deployment Strategies (Examples & Code)<br>
https://youtu.be/lxc4EXZOOvE?si=rSrCbBn81bbpU-9C

## --- RollingUpdate -------------
To test:
```
kubectl run curl --image=alpine/curl:8.2.1 -n kube-system -i --tty --rm -- sh
for i in `seq 1 1000`; do curl myapp.default:8181/version; echo ""; sleep 1; done
```
kubectl rollout --help<br>
kubectl rollout pause deployment myapp<br>
kubectl rollout resume deployment myapp<br>
kubectl rollout restart deployment myapp<br>
etc..

On prod wo would do a commit and let argocd to take care of roll-back
## --- Recreate -------------
Good in development with limited resources
