FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# envoyのデフォルト設定ファイルなどの削除 & 設定ファイルのコピー等を行う

COPY --from=builder /app/build /usr/share/nginx/html

# EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]