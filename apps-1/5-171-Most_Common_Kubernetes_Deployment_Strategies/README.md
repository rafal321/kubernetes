[5]	Most Common Kubernetes Deployment Strategies (Examples & Code)<br>
https://youtu.be/lxc4EXZOOvE?si=rSrCbBn81bbpU-9C

## --- RollingUpdate -------------
To test:
```
kubectl run curl --image=alpine/curl:8.2.1 -n kube-system -i --tty --rm -- sh
for i in `seq 1 1000`; do curl myapp.default:8181/version; echo ""; sleep 1; done
```
kubectl rollout --help<br>
Available Commands:<br>
  history       View rollout history
  pause         Mark the provided resource as paused
  restart       Restart a resource
  resume        Resume a paused resource
  status        Show the status of the rollout
  undo          Undo a previous rollout