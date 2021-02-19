FROM node:alpine
RUN apk update && apk add python make g++

#Install some dependencies
EXPOSE 3000
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

# Set up a default command
