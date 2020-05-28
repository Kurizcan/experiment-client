# experiment-clinet

## 1. Project setup
```
npm install
```
if run failed, please use this command.
```
npm install -g --unsafe-perm
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## 2. Run in docker

#### Edit the default.conf

you should make sure the default.conf proxy_pass which is backend server's ip address of right.
```
location /api/ {
    proxy_pass http://xxx.xxx.xxx.xxx;
}
```

#### Build image
```
docker build -t vue_container .
```

#### Run container
```
docker run -p 8888:80 -d --name experiment_client vue_container
```
if successed, the vue client will be deployed in port 8888.