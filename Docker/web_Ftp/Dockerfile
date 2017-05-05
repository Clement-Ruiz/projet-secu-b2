FROM debian:wheezy

MAINTAINER EryoGreg


#apt-get
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y apache2 php5 mysql-server apache2-utils openssh-server -y
RUN useradd user2 -p docker


ENV MYSQL_ROOT_USER=
ENV MYSQL_ROOT_PASSWORD=

COPY ./run.sh /root/


#Ouvre le port 80
Expose 80

#Commande cmd
CMD ["/bin/bash","/root/run.sh"]