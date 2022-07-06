# syntax=docker/dockerfile:1

FROM node:17.3.0

RUN mkdir -p /auth
WORKDIR /auth

COPY ["Makefile","package.json", "package-lock.json", "./"]

RUN npm install
RUN npx -p typescript tsc --init

COPY . .

CMD ["make", "generate"]
CMD ["npm", "run","prestart"]
CMD ["npm", "run","start"]