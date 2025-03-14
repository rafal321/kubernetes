## Pods s3 access
YT - Enhancing Security with EKS Pod Identities: Implementing the Principle of Least Privilege<br>
Source: https://youtu.be/j0gICtfAwJI?si=jpbuy6G3FpWeRmZK <br>
[1] Need pod identity agent add-on<br>
[2] Create Role and attach policy:<br>
```
aws iam create-role --role-name EKSPodS3FullAccess --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "pods.eks.amazonaws.com"
      },
      "Action": ["sts:AssumeRole","sts:TagSession"]
    }
  ]
}' --profile lab
```
```
aws iam attach-role-policy --role-name EKSPodS3FullAccess --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess --profile lab
```
[3] Create a Kubernetes service account
```
kubectl create sa s3-full-access-sa -n your-namespace
```

[4] Create a Pod Identity association:	(Command Not found on my system -> use UI console)
```
aws eks create-pod-identity-association --cluster-name dev-rkeks12-02 --namespace db-tools --service-account s3-full-access-sa --role-arn arn:aws:iam::411929112137:role/EKSPodS3FullAccess --profile lab
```
