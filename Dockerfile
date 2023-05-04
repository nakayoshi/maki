FROM node:18 as dependencies
ENV HOME="/home"
WORKDIR /app

# 依存のインストール

COPY . .
RUN npm install -g @pnpm/exe@^8.4.0
RUN cd ./packages/@nakayoshi/maki-cameraman/ && pnpm install -r --frozen-lockfile --prod
RUN pnpm dlx playwright install --with-deps chromium
RUN apt-get update && apt-get install tini -y

# ビルド
RUN pnpm run -F @nakayoshi/maki-cameraman-spec -F @nakayoshi/maki-cameraman build

EXPOSE ${PORT}

CMD [ "tini", "node", "./dist/main.js" ]