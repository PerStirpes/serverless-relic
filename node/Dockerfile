FROM mhart/alpine-node

WORKDIR /

ENV PATH /node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn 
RUN yarn add newrelic

COPY . ./

CMD ["yarn"]