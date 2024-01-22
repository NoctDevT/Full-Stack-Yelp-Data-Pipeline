FROM node:20-bullseye

WORKDIR /app/dataScrape
COPY package*.json ./
RUN npm install
RUN npx playwright install --with-deps
COPY . .

CMD ["npm", "run", "all"]