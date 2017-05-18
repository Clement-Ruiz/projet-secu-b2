FROM ubuntu:14.04

RUN apt-get update -y && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN mkdir /home/user
RUN useradd -s /bin/bash -d /home/user user

RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

COPY banner /etc/
COPY sshd_config /etc/ssh/

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
