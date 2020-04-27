FROM node:13.10.1-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm ci --only production
EXPOSE 3000
CMD [ "npm", "production"]