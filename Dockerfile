FROM node:alpine

ENV PORT 80

RUN apk add --no-cache bash zsh curl wget git

RUN mkdir -p /home/ras
WORKDIR /home/ras

RUN git config --global user.name "SPO Web Team"
RUN git config --global user.email "pas@iitk.ac.in"

RUN git clone --depth 1 https://github.com/spo-iitk/ras-frontend.git .

EXPOSE 80

# Run script
CMD [ "/home/ras/scripts/production.sh" ]
