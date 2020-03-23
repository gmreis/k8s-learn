#!/bin/bash

if grep -q "\bwww\.exemplo\.com\.br\(\b\*\)\?" /etc/hosts; then
  echo "The /etc/hosts already configured"
elif [ $EUID != 0 ]; then
  echo "The /etc/hosts NOT configured."
  echo "To this script configure the /etc/hosts, you may run it with sudo permission or"
  echo "you can run this command: 'sudo echo \"127.0.0.1    www.exemplo.com.br\" >> /etc/hosts'"
else
  echo "Adding config in /etc/hosts."
  echo "127.0.0.1    www.exemplo.com.br" >> /etc/hosts
  echo "Config added with success"
fi
