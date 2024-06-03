FROM node:lts-alpine AS prod-builder

WORKDIR /app

RUN npm install -g vite serve

COPY . .

RUN npm install --force

EXPOSE 5173

RUN npm run build

CMD ["serve", "-p", "5173",  "-S", "dist"]