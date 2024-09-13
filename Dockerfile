FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /home/static

# Install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/
RUN yarn install --immutable

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /home/static

COPY --from=deps /home/static/node_modules ./node_modules
COPY --from=deps /home/static/.yarn /.yarn
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn run build

# Production image, copy all the files and run next
FROM busybox AS runner

RUN adduser -D static
USER static

WORKDIR /home/static

COPY --from=builder /home/static/dist ./

EXPOSE 3000

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
