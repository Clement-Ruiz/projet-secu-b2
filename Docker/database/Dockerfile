FROM mysql:5.7

COPY add_mysql_user.sql /etc/mysql/add_mysql_user.sql

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE=web-app
ARG MYSQL_USER=web
ARG MYSQL_PASSWORD=webpass
ARG MYSQL_ROOT_PASSWORD=B0uLucB0u=)

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD

RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /etc/mysql/add_mysql_user.sql && \
    sed -i 's/MYSQL_USER/'$MYSQL_USER'/g' /etc/mysql/add_mysql_user.sql && \
    sed -i 's/MYSQL_PASSWORD/'$MYSQL_PASSWORD'/g' /etc/mysql/add_mysql_user.sql

ADD my.cnf /etc/mysql/conf.d/my.cnf

USER mysql

CMD ["mysqld", "--init-file=/etc/mysql/add_mysql_user.sql"]

EXPOSE 3306
