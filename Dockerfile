FROM mhart/alpine-node:latest

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /src/app && cp -a /tmp/node_modules /src/app
WORKDIR /src/app

ADD . /src/app

EXPOSE 5000

CMD [ "npm", "start" ]


