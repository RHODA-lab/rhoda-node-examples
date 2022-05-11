FROM registry.access.redhat.com/ubi8/nodejs-14 AS BUILD_IMAGE

ENV NODE_ENV production

# Just copy the package.json...
WORKDIR /opt/app-root/src/app
COPY . .

USER 0

# so we can cache this layer:
RUN npm install

FROM registry.access.redhat.com/ubi8/nodejs-14-minimal

COPY --from=BUILD_IMAGE /opt/app-root/src/app/node_modules /app/node_modules
COPY --from=BUILD_IMAGE /opt/app-root/src/app/app.js /app/app.js

WORKDIR /app
USER 65532

# command to run on container start
CMD [ "node", "app.js" ]
