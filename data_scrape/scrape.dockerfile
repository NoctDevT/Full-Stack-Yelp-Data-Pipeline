FROM node:20-bullseye

WORKDIR /app/dataScrape
COPY package*.json ./
RUN npm install
RUN npx playwright install --with-deps
COPY . .

RUN chown -R node:node /app
USER node

CMD ["npm", "run", "all"]