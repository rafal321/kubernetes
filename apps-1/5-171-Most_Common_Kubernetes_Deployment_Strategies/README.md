Playlist: https://youtube.com/playlist?list=PLiMWaCMwGJXnHmccp2xlBENZ1xr4FpjXF&si=Ld6qHSqKqljG-HqX

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
Good in development with limited resources<br>
when volumes are attached with accessModes: ReadWriteOnce 
## --- Blue/Green -------------
Using native kubernetes, we need to use labels<br>
Even if you use Ingress it will nicely update your traffic<br>
With Istio, setup is complicated. Since you need Istio, Prometheus, Graphana Flagger, etc.
```
kubectl run curl --image=alpine/curl:8.2.1 -n kube-system -i --tty --rm -- sh
while true; do curl -s myapp.default:8181 | grep -e "--"; sleep 1; done
```
## --- Canary -------------
just update spec.replica: X 
## --- Argo: cd, rollouts -------------
[PL] YT - ARGO CD by DevOps Hobbies<br>
 https://youtube.com/playlist?list=PLYrn63eEqAzYttcyB6On1oH35O5rxgDt4&si=kEv7ay_gOq9SqEFo <br>
 https://hub.docker.com/r/argoproj/rollouts-demo/tags <br>
 https://argoproj.github.io/argo-rollouts/features/bluegreen/ <br>

docker pull argoproj/rollouts-demo:blue<br>
docker pull argoproj/rollouts-demo:bad-blue<br>
docker pull argoproj/rollouts-demo:slow-blue<br>