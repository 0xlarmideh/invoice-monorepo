FROM ghcr.io/puppeteer/puppeteer:21.7.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# set working directory
WORKDIR /app

# Temporarily switch to root user
USER root

COPY package*.json /app/

RUN npm install 

# add app
COPY ./ /app/


EXPOSE 5000

RUN npm run build

RUN npm run copy-files

# Switch back to non-root user
USER pptruser

CMD [ "npm", "start" ]