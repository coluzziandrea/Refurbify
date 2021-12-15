# Refurbify

Web Application aimed to give used objects a new life

## How To Run On GCloud

- Init and Configure a remote Server on GCP: https://cloud.google.com/
- Create a Cluster on Remote and Enable GCloud Build
- Install GCloud SDK to connect properly to the remote instance
- Install Docker Desktop & Skaffold on local machine
- Run 'kubectl create secret generic jwt-secret --from-literal=JWT_KEY=[JWT_SECRET]'. Where JWT_SECRET is a secret string used to generate JWT
- Run 'skaffold dev' from /refurbify folder
