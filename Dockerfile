FROM node:14-alpine
EXPOSE 9832/tcp
COPY build/ /app/build/
RUN npm install -g serve
ENTRYPOINT ["serve", "-s",  "/app/build", "-l",  "9832"]