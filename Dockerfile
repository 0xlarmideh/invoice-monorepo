FROM ghcr.io/puppeteer/puppeteer:21.5.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

#give full access to  /usr/src/app directory
RUN chown -R 777 /usr/src/app


COPY package*.json ./
RUN npm ci

# Add TypeScript as a development dependency
COPY . .
RUN npm install typescript --save-dev
RUN npx tsc
CMD [ "npm", "start" ]