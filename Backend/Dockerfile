# Use official node image as the base image
FROM node:21-alpine

# #add build args

ENV PORT=5555

# set working directory
WORKDIR /app

# copy dependacies only
COPY package*.json /app/

# Install all the dependencies
RUN npm install

# add app
COPY ./ /app/

EXPOSE 5555

RUN npm run build

RUN npm run copy-files

CMD ["npm","run","start"]
