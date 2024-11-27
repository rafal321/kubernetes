FROM alpine:3.20
RUN apk add --update --no-cache mysql-client mariadb-connector-c
RUN apk add aws-cli zip tar
WORKDIR /work
COPY db_bkp.sh .
RUN chmod +x db_bkp.sh