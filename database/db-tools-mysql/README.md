Source:<br>
https://youtu.be/j0gICtfAwJI?si=jpbuy6G3FpWeRmZK <br>
[1] Need pod identity agent add-on<br>
[2] Create Role and attach policy:
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

aws iam attach-role-policy --role-name EKSPodS3FullAccess --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess --profile lab
```
[3] Create a Kubernetes service account
```
kubectl create sa s3-full-access-sa -n your-namespace
```

[4] Create a Pod Identity association:	(Command Not fountd on my system -> use console)
```
aws eks create-pod-identity-association --cluster-name <CL_NAME> --namespace <NS_NAME> --service-account s3-full-access-sa --role-arn arn:aws:iam::<ACC_NO>:role/EKSPodS3FullAccess --profile lab
```
To Undo:
```
aws iam detach-role-policy --role-name EKSPodS3FullAccess --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess --profile lab
aws iam delete-role --role-name EKSPodS3FullAccess --profile lab
```