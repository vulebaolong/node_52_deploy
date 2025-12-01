FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# chỉ giữ lại dependencies cần thiết cho production
# giảm được cỡ 300mb
RUN npm prune --production

FROM node:24-alpine AS done

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/src/main"]