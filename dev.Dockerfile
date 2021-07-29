FROM node:fermium

WORKDIR /app

COPY package.json .
COPY .eslintrc .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "watch"]
