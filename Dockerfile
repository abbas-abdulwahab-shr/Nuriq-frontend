FROM node:22.19.0-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_FRONTEND_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
ENV VITE_FRONTEND_URL=${VITE_FRONTEND_URL}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22.19.0-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]