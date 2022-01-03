# DEVELOPMENT
FROM node:14 AS development

WORKDIR /inzynierka/frontend/src/app

COPY . .

RUN npm install
RUN npm install -g @angular/cli@12.2.1

RUN npm run build

EXPOSE 4200

