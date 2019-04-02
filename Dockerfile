FROM node:10.15.3
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json .

RUN npm install

COPY . .

#ENV PORT 3000
EXPOSE 3000


# start app
CMD ["npm", "start"]