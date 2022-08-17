#!/bin/bash
set -e
# https://xie.infoq.cn/article/a3c8ffbd34d818de010f2b0f6
#查看mysql服务的状态，方便调试，这条语句可以删除
echo $(service mysql status)

echo '1.启动mysql...'
#启动mysql
# service mysql stop
# service mysql restart
service mysql start

# sleep 3
echo '2.创建数据库...'
mysql </mysql/create_db.sql
sleep 3
echo '2.创建数据库完毕...'

echo '3.开始导入数据...'
mysql </mysql/initial_data.sql
echo '3.导入数据完毕...'

sleep 3
echo $(service mysql status)
echo 'mysql容器启动完毕,且数据导入成功'

echo '4.修改mysql权限...'
mysql </mysql/privileges.sql
sleep 3
echo '4.权限修改完毕...'

# 防止container启动后退出
# http://www.mayanpeng.cn/archives/121.html
tail -f /dev/null