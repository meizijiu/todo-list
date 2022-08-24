FROM alpine:latest AS base

ENV NODE_ENV=production \
  APP_PATH=/www/node-server

WORKDIR $APP_PATH

# 使用apk命令安装 nodejs 
RUN echo "http://mirrors.aliyun.com/alpine/edge/main/" > /etc/apk/repositories \
  && echo "http://mirrors.aliyun.com/alpine/edge/community/" >> /etc/apk/repositories \
  && apk update \
  && apk add --no-cache --update nodejs-current npm \
  && node -v && npm -v \
  && npm config set registry https://registry.npm.taobao.org

# 基于基础镜像安装项目依赖
FROM base AS install

# 将当前目录的package.json 拷贝到工作目录下
COPY package.json package-lock.json $APP_PATH/

RUN npm install

# 基于基础镜像进行最终构建
FROM base

# 拷贝 上面生成的 node_modules 文件夹复制到最终的工作目录下
# COPY命令复制文件夹的时候，不是直接复制该文件夹，而是将文件夹中的内容复制到目标路径
COPY --from=install $APP_PATH/node_modules $APP_PATH/node_modules
# 拷贝当前目录的文件到工作目录(除了.dockerignore中忽略的)
COPY . $APP_PATH/

EXPOSE 4000

CMD ["npm", "run", "server"]