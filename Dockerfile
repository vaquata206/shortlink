FROM node:lts-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate dev --name init

RUN npm run build

EXPOSE 3000

CMD ["npm", "start", "."]