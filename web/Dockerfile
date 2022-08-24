FROM alpine:latest AS base
ENV NODE_ENV=production \
  APP_PATH=/app
WORKDIR $APP_PATH
# 使用apk命令安装 nodejs 和 yarn
RUN apk add --no-cache --update nodejs=17.9.0-r0 yarn

FROM base AS install
COPY package.json yarn.lock $APP_PATH/
RUN yarn install

FROM base AS build
# 拷贝上面生成的 node_modules 文件夹复制到最终的工作目录下
COPY --from=install $APP_PATH/node_modules $APP_PATH/node_modules
# 拷贝当前目录的文件到工作目录(除了.dockerignore中忽略的)
COPY . $APP_PATH/
RUN yarn run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/dist
# 添加自己的配置 default.conf 在下面
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist .
EXPOSE 80