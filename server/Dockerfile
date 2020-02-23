FROM node:alpine

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install

ENV APP_SECRET GraphQL-is-aw3some

EXPOSE 4000

# Run below after building
CMD [ "npm", "run", "prod-start" ]