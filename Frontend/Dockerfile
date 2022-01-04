
FROM node:13.12.0-alpine
RUN apk add g++ make python
EXPOSE 3000
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]