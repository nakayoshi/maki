FROM node:18 as dependencies
ENV HOME="/home"
WORKDIR /app

# 依存のインストール

COPY . .
RUN npm install -g @pnpm/exe@^8.4.0
RUN pnpm install -r --frozen-lockfile --prod
RUN apt-get update && apt-get install tini -y

# ビルド
RUN pnpm run -F @nakayoshi/maki-api... build

EXPOSE ${PORT}

CMD tini -- pnpm -F @nakayoshi/maki-api start