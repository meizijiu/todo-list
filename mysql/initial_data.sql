-- 使用todolist库
USE todolist;

-- 创建todolist表
CREATE TABLE IF NOT EXISTS todolist(id VARCHAR(50) PRIMARY KEY, create_time DATETIME UNIQUE, is_finished ENUM('0', '1') DEFAULT '0', msg VARCHAR(100) DEFAULT '--') COMMENT='todolist表' ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 打印数据库
SHOW TABLES;

-- 打印表结构
DESC todolist;

-- 插入1条默认数据
INSERT INTO todolist(id, create_time, is_finished, msg) VALUES(1, NOW(), '0', 'hello world');