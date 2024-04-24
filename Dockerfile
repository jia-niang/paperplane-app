FROM node:14.21.3

WORKDIR /home/node/app

COPY package.json /home/node/app/
COPY yarn.lock /home/node/app/
RUN yarn

COPY . /home/node/app/
