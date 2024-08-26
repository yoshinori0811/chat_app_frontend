FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# 証明書を置くためのディレクトリを作成
RUN mkdir -p /etc/nginx/certs

# envoyのデフォルト設定ファイルなどの削除 & 設定ファイルのコピー等を行う
# RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]