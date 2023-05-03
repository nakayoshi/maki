FROM node:18 as base

WORKDIR /app

COPY pnpm-*.yaml .
COPY package.json ./
COPY packages/@nakayoshi/maki-cameraman/package.json ./packages/@nakayoshi/maki-cameraman/
RUN npm install -g @pnpm/exe
RUN cd ./packages/@nakayoshi/maki-cameraman/ && pnpm install -r --frozen-lockfile --prod
RUN pnpm dlx playwright install --with-deps chromium
RUN apt-get update && apt-get install tini -y

FROM base as builder

WORKDIR /app/packages/@nakayoshi/maki-cameraman/
RUN npm install -g tsc
COPY packages/@nakayoshi/maki-cameraman .
COPY --from=base /app/node_modules ./node_modules
RUN pnpm build

FROM builder as runtime

ENV THEATER_URL https://maki-sandy.vercel.app
WORKDIR /app/packages/@nakayoshi/maki-cameraman/
COPY --from=builder /app/packages/@nakayoshi/maki-cameraman/dist ./dist
CMD [ "tini", "node", "./dist/main.js" ]