FROM ghcr.io/puppeteer/puppeteer:21.5.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Temporarily switch to root user
USER root

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm install typescript --save-dev
RUN npx tsc

# Switch back to non-root user
USER pptruser

CMD [ "npm", "start" ]