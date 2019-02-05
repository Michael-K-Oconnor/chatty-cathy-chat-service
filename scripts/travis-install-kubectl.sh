#!/bin/bash
 
# Install kubernetes and set config
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl


git clone https://michael-k-oconnor:$GH_PASS@github.com/michael-k-oconnor/chatty-cathy-k8-config.git
mkdir ${HOME}/.kube
mv ./chatty-cathy-k8-config/* ${HOME}/.kube
