# node-hello-world-mongodb

To run:

    npm install
    SERVICE_BINDING_ROOT=~/bindings npm start

## Put it in a container

Build a Docker image:

    docker build -t node-hello-world-mongodb .

## Put it in OpenShift

```bash
oc new-app https://github.com/tchughesiv/rhoda-node-examples --context-dir=node-hello-world-mongodb --name=node-hello-world-mongodb --strategy=docker
```
