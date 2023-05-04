FROM node:18 as dependencies

WORKDIR /app

COPY pnpm-*.yaml .
COPY package.json ./
COPY packages/@nakayoshi/maki-cameraman/package.json ./packages/@nakayoshi/maki-cameraman/
RUN npm install -g @pnpm/exe
RUN cd ./packages/@nakayoshi/maki-cameraman/ && pnpm install -r --frozen-lockfile --prod
RUN pnpm dlx playwright install --with-deps chromium
RUN apt-get update && apt-get install tini -y

FROM node:18 as builder

WORKDIR /build
COPY --from=dependencies /app/node_modules ./node_modules
COPY packages/@nakayoshi/maki-cameraman .
RUN npm install -g pnpm
RUN pnpm install 
RUN pnpm build


FROM dependencies as runtime

WORKDIR /app/packages/@nakayoshi/maki-cameraman/
COPY --from=builder /build/dist ./dist
CMD [ "tini", "node", "./dist/main.js" ]