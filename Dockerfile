FROM node:latest
EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json .

RUN [ "npm", "install" ]

COPY . .

RUN [ "mv", "session.d.ts", "node_modules/telegraf-session-local/lib/" ]
RUN [ "npm", "run", "build" ]

ENTRYPOINT [ "npm", "run", "bot" ]
