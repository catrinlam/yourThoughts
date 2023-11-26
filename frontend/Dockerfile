FROM node:18.13.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

#COPY package.json package-lock.json ./
#RUN npm install
#
#RUN npm ci --only=production
#COPY . .
#
#EXPOSE 3000
#CMD [ "npm", "start" ]