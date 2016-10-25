FROM daocloud.io/library/node:latest
RUN mkdir /code
WORKDIR /code
RUN apt-get update && apt-get install -y ruby
RUN gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
RUN gem install sass
CMD npm install
