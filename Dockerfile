FROM node:9-slim
WORKDIR /op-app
COPY . .
RUN npm install
CMD ["node", "index.js"]
EXPOSE 3000
