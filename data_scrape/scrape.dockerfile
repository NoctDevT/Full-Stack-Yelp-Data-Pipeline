FROM node:20-bookworm

WORKDIR /app/dataScrape
COPY package*.json ./
RUN npm install\
    && npm install typescript -g \
    && npx playwright@1.41.0 install --with-deps
COPY . .

CMD ["npm", "run", "all"]

