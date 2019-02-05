#!/bin/bash
 
# Install kubernetes and set config
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

curl -o config https://$GITHUB_ACCESS_TOKEN@raw.githubusercontent.com/michael-k-oconnor/chatty-cathy-k8-config/master/
mkdir ${HOME}/.kube
cp config ${HOME}/.kube/config
#cp scripts/k8-config.yml ${HOME}/.kube/config
ls ${HOME}/.kube/config
# Fill out missing params in kubectl config file
# kubectl config set clusters.ChattyCathyMain.certificate-authority-data "$CERTIFICATE_AUTHORITY_DATA"
# kubectl config set clusters.ChattyCathyMain.server "$CLUSTER_SERVER"
# kubectl config set users.kubernetes-kube-group-e1ea0b-admin.client-certificate-data "$CLIENT_CERTIFICATE_DATA"
# kubectl config set users.kubernetes-kube-group-e1ea0b-admin.client-key-data "$CLIENT_KEY_DATA"