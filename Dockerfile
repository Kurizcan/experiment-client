FROM nginx:latest
LABEL maintainer="kurizcan"
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
RUN /bin/bash -c 'echo init success'