FROM node:alpine
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN npm i -g sequelize-cli
COPY ./controllers ./controllers
COPY ./database ./database
COPY ./middlewares ./middlewares
COPY ./models ./models
COPY ./node_modules ./node_modules
COPY ./routes ./routes
COPY ./uploads ./uploads
COPY ./validators ./validators
COPY ./.env ./.env
COPY ./app.js ./app.js
COPY ./README.md ./README.md
CMD ["npm", "start"]