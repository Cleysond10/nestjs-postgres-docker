FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .
COPY ./.env.prd ./.env

RUN npm run build

CMD ["npm", "run", "start:dev"]
