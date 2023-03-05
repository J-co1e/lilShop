/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : order

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 05/03/2023 22:20:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for foods
-- ----------------------------
DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods`  (
  `foodId` int(0) NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜品图片地址',
  `price` decimal(10, 2) NOT NULL COMMENT '售价',
  `foodName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜品名称',
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜品类型',
  `sales` int(0) NOT NULL COMMENT '销量',
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜品描述',
  `attr` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '属性',
  `isDelete` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`foodId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES (1, 'http://localhost:8082/public/imgs/doujiao.jpg', 19.00, '煸豆', 'hot', 111, '紫菜煸豆，极富营养价值的一道时令家常菜', '蔬菜', 0);
INSERT INTO `foods` VALUES (2, 'http://localhost:8082/public/imgs/duojiao.jpg', 15.00, '剁椒芋仔', 'hot', 180, '剁椒芋仔，美味而富有营养，芋仔富含丰富的矿物质与维生素', '蔬菜', 0);
INSERT INTO `foods` VALUES (3, 'http://localhost:8082/public/imgs/fish.jpg', 22.00, '金枪鱼刺身', 'seafood', 200, '海鲜刺身，人间美味', '海鲜', 0);
INSERT INTO `foods` VALUES (9, 'http://localhost:8082/public/imgs/mue.jpg', 18.00, '土豆丝', 'hot', 1800, '这是土豆丝', '蔬菜', 0);
INSERT INTO `foods` VALUES (5, 'http://localhost:8082/public/imgs/la.jpg', 10.00, '果粒橙', 'drink', 1100, '这是果粒橙', '蔬菜', 0);
INSERT INTO `foods` VALUES (6, 'http://localhost:8082/public/imgs/kui.jpg', 10.00, '凉拌黄瓜', 'jardiniere', 100, '这是一份凉拌黄瓜', '蔬菜', 0);
INSERT INTO `foods` VALUES (7, 'http://localhost:8082/public/imgs/rou.jpg', 18.00, '紫菜鸡蛋汤', 'soup', 1890, '这是一份紫菜鸡蛋汤', '蔬菜', 0);
INSERT INTO `foods` VALUES (8, 'http://localhost:8082/public/imgs/youyu.jpg', 188.00, '豪华套餐1', 'combo', 100, '这是豪华套餐', '蔬菜', 0);
INSERT INTO `foods` VALUES (10, 'http://localhost:8082/public/imgs/duojiao.jpg', 58.00, '炒鸡蛋', 'hot', 300, '这是一盘炒鸡蛋', '蔬菜', 0);
INSERT INTO `foods` VALUES (11, 'http://localhost:8082/public/imgs/kui.jpg', 288.00, '豪华套餐2', 'combo', 20, '6人豪华套餐', '海鲜', 0);
INSERT INTO `foods` VALUES (12, 'http://localhost:8082/public/imgs/xcr.jpg', 388.00, '豪华套餐3', 'combo', 210, '8人豪华套餐', '海鲜', 0);
INSERT INTO `foods` VALUES (13, 'http://localhost:8082/public/imgs/xcr.jpg', 6.00, '蒸饺', 'seafood', 210, '经典蒸饺', '海鲜', 0);
INSERT INTO `foods` VALUES (14, 'http://localhost:8082/public/imgs/kui.jpg', 1234.00, '1234', 'soup', 123, '', '蔬菜', 0);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `orderId` int(0) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `tableNo` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '桌子编号',
  `orderData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜品集合',
  `orderStatus` int(0) NOT NULL COMMENT '订单的状态',
  `applyDate` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '订单建立的时间',
  PRIMARY KEY (`orderId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1006 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1001, '3', '{\"name\"=\"zd\",\"age\"=\"18\"}', 0, '2020-10-01');
INSERT INTO `orders` VALUES (1002, '2', '[{\"name\"=\"xd\",\"age\"= 18}]', 1, '2020-10-01');
INSERT INTO `orders` VALUES (1003, '1', '[{\"name\"=\"xd\",\"age\"= 18},{\"name\":\"dd\",\"age\":20}]', 0, '2023-03-02');
INSERT INTO `orders` VALUES (1004, '4', '[{name=dd,age=20}]', 1, '2023-03-01');
INSERT INTO `orders` VALUES (1005, '5', '[{\'name\':\'zss\',\'age\':18}]', 1, '2020-11-11');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `shopName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `shopDetail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `shopPic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Redundant;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('沙县大酒店', '沙县大酒店，懂得来', 'http://127.0.0.1:88/store/1678009387109-logo.png');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isDelete` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, '荤菜', 0);
INSERT INTO `type` VALUES (2, '素菜', 0);
INSERT INTO `type` VALUES (3, '主食', 0);
INSERT INTO `type` VALUES (4, '酒水', 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userId` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '密码',
  `status` int(0) NOT NULL COMMENT '权限',
  `imgUrl` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `isDelete` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 34 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (7, 'admin', '666666', 1, 'http://127.0.0.1:88/users/1677936517255-1.jpg', 0);
INSERT INTO `users` VALUES (28, '999', '45645644', 0, 'http://127.0.0.1:88/1677824022092-dot2.png', 1);
INSERT INTO `users` VALUES (30, '333', '999999', 0, 'http://127.0.0.1:88/users/1677936361710-19125021022-1-项目资料.png', 0);
INSERT INTO `users` VALUES (29, '777', '134622', 0, 'http://127.0.0.1:88/1677824022092-dot2.png', 1);
INSERT INTO `users` VALUES (25, '111', '111111', 0, NULL, 1);
INSERT INTO `users` VALUES (31, '666', '666666', 0, 'http://127.0.0.1:88/users/1677833622114-board.png', 0);
INSERT INTO `users` VALUES (32, '攻壳', '123321', 0, 'http://127.0.0.1:88/users/1677925091625-1.jpg', 0);
INSERT INTO `users` VALUES (33, '996', '996996', 0, 'http://127.0.0.1:88/users/1677934710659-Vincent-van-Gogh-Starry-Night_1920x1200.jpg', 0);

SET FOREIGN_KEY_CHECKS = 1;
