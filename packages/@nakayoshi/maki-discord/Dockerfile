FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g @pnpm/exe@^8.4.0

RUN pnpm install -r --frozen-lockfile --prod

RUN apt-get update \
 && apt-get install -y tini

RUN pnpm run -F @nakayoshi/maki-cameraman-spec -F @nakayoshi/maki-discord build

CMD ["tini", "--", "pnpm", "-F", "@nakayoshi/maki-discord", "start"]