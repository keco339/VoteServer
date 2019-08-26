FROM node:10.13.0-slim

# Create app directory
RUN mkdir -p /home/node/VoteServer
WORKDIR /home/node/VoteServer

# Bundle app source
COPY . /home/node/VoteServer
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install \
    && /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' >/etc/timezone

EXPOSE 6000
CMD [ "node", "server.js" ]
