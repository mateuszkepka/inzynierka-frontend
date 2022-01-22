# DEVELOPMENT
FROM node:14 AS development

WORKDIR /inzynierka/frontend/src/app

COPY . .

RUN npm install
RUN npm install -g @angular/cli@12.2.1

RUN npx ng build --configuration production

CMD ["npm", "run", "start"]