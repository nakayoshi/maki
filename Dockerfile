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

<<<<<<< HEAD
=======
WORKDIR /build
COPY --from=dependencies /app/node_modules ./node_modules
COPY packages/@nakayoshi/maki-cameraman .
RUN npm install -g @pnpm/exe@^8.4.0
RUN pnpm install 
RUN pnpm build

FROM dependencies as runtime

WORKDIR /app/packages/@nakayoshi/maki-cameraman/
COPY --from=builder /build/dist ./dist
RUN apt-get update && apt-get install ffmpeg -y
>>>>>>> fdf6a72 (ffmpeg)
EXPOSE ${PORT}

CMD [ "tini", "--", "pnpm", "-F", "@nakayoshi/maki-cameraman", "start" ]