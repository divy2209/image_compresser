FROM node:21.1.0-alpine

#Create app directory
WORKDIR /app

#Install app dependencies
COPY package*.json ./

#Run npm install
RUN npm install

#Bundle app source
COPY . .

EXPOSE 3001

CMD [ "npm", "start"]