FROM node:18-bullseye

WORKDIR /api/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

