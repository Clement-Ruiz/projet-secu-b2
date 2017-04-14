#!/bin/bash
/etc/init.d/mysql start
/usr/sbin/apache2 -D FOREGROUND
