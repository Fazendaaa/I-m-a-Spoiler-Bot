FROM node:latest
EXPOSE 8080

WORKDIR /usr/src/app

COPY . .

RUN [ "npm", "install" ]
ENTRYPOINT [ "npm", "run", "docker" ]
