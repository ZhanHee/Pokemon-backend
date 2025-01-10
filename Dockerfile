
FROM node:alpine


WORKDIR /usr/src/app


COPY package*.json ./
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
RUN npm install


COPY . .


EXPOSE 3000


CMD ["node", "app.js"]
