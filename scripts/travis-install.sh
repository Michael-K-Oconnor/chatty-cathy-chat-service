#!/bin/sh
 
# Install kubernetes and set config
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
 
mkdir ${HOME}/.kube
cp scripts/k8-config.yml ${HOME}/.kube/config
 
# Fill out missing params in kubectl config file
kubectl config set clusters.ChattyCathyMain.certificate-authority-data "$CERTIFICATE-AUTHORITY-DATA"
kubectl config set clusters.ChattyCathyMain.server "$CLUSTER-SERVER"
kubectl config set users.kubernetes-kube-group-e1ea0b-admin.client-certificate-data "$CLIENT-CERTIFICATE-DATA"
kubectl config set users.kubernetes-kube-group-e1ea0b-admin.client-key-data "$CLIENT-KEY-DATA"

cat ${HOME}/.kube/config