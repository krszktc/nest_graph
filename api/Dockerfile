FROM node:18-alpine

WORKDIR /app

COPY ./api/ ./

RUN npm install --silient

CMD ./docker.start.check.sh
    