FROM node:24-slim AS builder
WORKDIR /app
COPY package*.json ./
# A deploy that has to build from source installs over the network at the
# worst moment, and npm's two default retries are spent in under twenty
# seconds.
ENV NPM_CONFIG_FETCH_RETRIES=5 NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build-only

FROM joseluisq/static-web-server:2-debian
# The build is served as it was written; the entrypoint copies it to /public
# only when it has an analytics snippet to inject into every page.
COPY --from=builder /app/dist /public-src
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ENV SERVER_ROOT=/public-src
# No fallback page: the build writes a real index.html for every address the
# site answers, each with its own title and canonical link.
ENV SERVER_REDIRECT_TRAILING_SLASH=false
ENV SERVER_HEALTH=true
ENV SERVER_PORT=80
COPY sws.toml /etc/sws.toml
ENV SERVER_CONFIG_FILE=/etc/sws.toml
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["static-web-server"]
