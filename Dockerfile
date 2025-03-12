FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t frontned-lkapp .
# docker run -d -p 80:3000 frontned-lkapp
