FROM ubuntu:14.04

RUN apt-get update -y && apt-get install -y openssh-server
RUN mkdir /var/run/sshd

RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

COPY banner /etc/
COPY sshd_config /etc/ssh/

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
