FROM node:13-slim as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci --cache .npm --prefer-offline

COPY . .

ARG BACKEND_ROUTE

RUN echo VUE_APP_BACKEND_ENV=${BACKEND_ROUTE} > .env

RUN npm run build

FROM nginx:1.17.10 as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
