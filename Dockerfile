FROM node:12.17.0-alpine
WORKDIR /app
# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src


# check files list
RUN ls -a

RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /app/dist .
RUN npm install pm2 -g
EXPOSE 5000
CMD ["pm2-runtime","./server.js"]