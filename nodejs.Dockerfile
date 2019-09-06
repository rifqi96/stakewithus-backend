FROM node:10.16.3-alpine

ARG NODE_ENV=${NODE_ENV}

ENV NODE_ENV ${NODE_ENV}
ENV USER www
ENV USERDIR /var/${USER}
ENV WORKDIR ${USERDIR}/html
ENV ETCDIR ./docker-etc/nodejs

# Set current workdir
WORKDIR ${WORKDIR}

# Copy the start script to the container
COPY ${ETCDIR}/start.sh ${USERDIR}/scripts/
RUN chmod +x ${USERDIR}/scripts/start.sh

# Copy the app source
ADD ./src ${WORKDIR}

# Expose nodejs ports
EXPOSE 3000 9229
# Run ci from package-lock, then run the start script
CMD ["sh", "-c", "npm ci && ${USERDIR}/scripts/start.sh"]
