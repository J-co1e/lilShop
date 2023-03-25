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

 Date: 25/03/2023 20:41:14
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
  `sales` int(0) NULL DEFAULT 0 COMMENT '销量',
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '菜品描述',
  `isDelete` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`foodId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 47 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES (19, 'http://127.0.0.1:88/foods/1678108163939-炒米粉.jpeg', 12.00, '炒米粉', '主食', 0, '这是炒米粉', 0);
INSERT INTO `foods` VALUES (18, 'http://127.0.0.1:88/foods/1678108104099-炒河粉.jpeg', 12.00, '炒河粉', '主食', 0, '这是炒河粉', 0);
INSERT INTO `foods` VALUES (20, 'http://127.0.0.1:88/foods/1678108185520-豆腐串.jpg', 3.80, '烤豆腐串', '素类', 0, '这是烤豆腐串', 0);
INSERT INTO `foods` VALUES (21, 'http://127.0.0.1:88/foods/1678108226665-豆腐皮.jpeg', 2.80, '烤豆腐皮', '素类', 0, '这是烤豆腐皮', 0);
INSERT INTO `foods` VALUES (22, 'http://127.0.0.1:88/foods/1678108258130-骨肉相连.jpeg', 3.20, '烤骨肉相连', '荤类', 0, '这是烤骨肉相连', 0);
INSERT INTO `foods` VALUES (23, 'http://127.0.0.1:88/foods/1678108280913-鸡柳.jpeg', 2.80, '烤鸡柳', '荤类', 0, '这是烤鸡柳', 0);
INSERT INTO `foods` VALUES (24, 'http://127.0.0.1:88/foods/1678108319723-韭菜.jpeg', 2.00, '烤韭菜', '素类', 0, '这是烤韭菜', 0);
INSERT INTO `foods` VALUES (25, 'http://127.0.0.1:88/foods/1678108346655-烤火腿.jpg', 2.50, '烤火腿肠', '荤类', 0, '这是烤火腿肠', 0);
INSERT INTO `foods` VALUES (26, 'http://127.0.0.1:88/foods/1678108378924-烤鸡翅.jpeg', 3.80, '烤鸡翅', '荤类', 0, '这是烤鸡翅', 0);
INSERT INTO `foods` VALUES (27, 'http://127.0.0.1:88/foods/1678108432010-烤鸡腿.jpg', 7.50, '烤鸡腿', '荤类', 0, '这是烤鸡腿', 0);
INSERT INTO `foods` VALUES (28, 'http://127.0.0.1:88/foods/1678108481140-烤生蚝.png', 52.00, '蒜蓉烤生蚝(1打)', '海鲜', 0, '烤生蚝，好吃', 0);
INSERT INTO `foods` VALUES (29, 'http://127.0.0.1:88/foods/1678108578522-烤羊排.jpeg', 98.80, '烤羊排', '荤类', 0, '这是烤羊排', 0);
INSERT INTO `foods` VALUES (30, 'http://127.0.0.1:88/foods/1678108761250-烤羊腰.jpg', 8.88, '烤羊腰', '荤类', 0, '这是烤羊腰', 0);
INSERT INTO `foods` VALUES (31, 'http://127.0.0.1:88/foods/1678108787902-烤鱼.jpeg', 6.60, '烤鱼串', '荤类', 0, '这是烤鱼串', 0);
INSERT INTO `foods` VALUES (32, 'http://127.0.0.1:88/foods/1678108826402-可乐.jpg', 4.00, '可乐', '酒水', 0, '百事也能叫可乐？', 0);
INSERT INTO `foods` VALUES (33, 'http://127.0.0.1:88/foods/1678108857532-牛肉串.jpeg', 5.80, '牛肉串', '荤类', 0, '这是牛肉串', 0);
INSERT INTO `foods` VALUES (34, 'http://127.0.0.1:88/foods/1678108887415-啤酒.jpeg', 9.00, '青岛啤酒', '酒水', 0, '这是青岛啤酒', 0);
INSERT INTO `foods` VALUES (35, 'http://127.0.0.1:88/foods/1678108909995-茄子.jpeg', 8.60, '烤茄子', '素类', 0, '这是烤茄子', 0);
INSERT INTO `foods` VALUES (36, 'http://127.0.0.1:88/foods/1678108940563-热狗.jpg', 3.20, '烤热狗', '荤类', 0, '这是烤热狗', 0);
INSERT INTO `foods` VALUES (37, 'http://127.0.0.1:88/foods/1678108966190-扇贝.jpeg', 72.00, '烤蒜蓉扇贝(1打)', '海鲜', 0, '这是烤扇贝', 0);
INSERT INTO `foods` VALUES (38, 'http://127.0.0.1:88/foods/1678109021655-天地一号.jpg', 4.50, '天地一号', '酒水', 0, '这是天地一号', 0);
INSERT INTO `foods` VALUES (39, 'http://127.0.0.1:88/foods/1678109055953-土豆片.jpg', 2.80, '烤土豆片', '素类', 0, '这是烤土豆片', 0);
INSERT INTO `foods` VALUES (40, 'http://127.0.0.1:88/foods/1678109082475-王老吉.png', 4.50, '王老吉', '酒水', 0, '怕上火，喝王老吉', 0);
INSERT INTO `foods` VALUES (41, 'http://127.0.0.1:88/foods/1678109106932-五花肉.jpeg', 4.20, '烤五花肉串', '荤类', 0, '这是烤五花肉串', 0);
INSERT INTO `foods` VALUES (42, 'http://127.0.0.1:88/foods/1678109142549-扬州炒饭.jpg', 11.00, '扬州炒饭', '主食', 0, '这是扬州炒饭', 0);
INSERT INTO `foods` VALUES (43, 'http://127.0.0.1:88/foods/1678109170438-羊肉串.jpg', 5.50, '羊肉串', '荤类', 0, '永远的神', 0);
INSERT INTO `foods` VALUES (44, 'http://127.0.0.1:88/foods/1678109190916-鱿鱼.jpeg', 8.50, '烤鱿鱼串', '荤类', 0, '这是烤鱿鱼串', 0);
INSERT INTO `foods` VALUES (45, 'http://127.0.0.1:88/foods/1678109214692-猪蹄.jpeg', 21.00, '烤猪蹄', '荤类', 0, '这是烤猪蹄', 0);
INSERT INTO `foods` VALUES (46, 'http://127.0.0.1:88/foods/1678109277065-烤面筋.jpg', 3.20, '烤面筋', '素类', 0, '香香的口味', 0);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `orderId` int(0) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `tableNo` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '桌子编号',
  `orderData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜品集合',
  `orderStatus` int(0) NOT NULL DEFAULT 0 COMMENT '订单的状态',
  `applyDate` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '订单建立的时间',
  `isPayed` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`orderId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1014 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1014, '5', '[{\"times\":1,\"orders\":[{\"foodId\":22,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108258130-骨肉相连.jpeg\",\"price\":3.2,\"foodName\":\"烤骨肉相连\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤骨肉相连\",\"isDelete\":0,\"total\":5}],\"diners\":\"1\"}]', 1, '2023-03-25 12:32:21', 1);
INSERT INTO `orders` VALUES (1007, '2', '[{\"times\":1,\"orders\":[{\"foodId\":22,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108258130-骨肉相连.jpeg\",\"price\":3.2,\"foodName\":\"烤骨肉相连\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤骨肉相连\",\"isDelete\":0,\"total\":3},{\"foodId\":23,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108280913-鸡柳.jpeg\",\"price\":2.8,\"foodName\":\"烤鸡柳\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤鸡柳\",\"isDelete\":0,\"total\":2},{\"foodId\":20,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108185520-豆腐串.jpg\",\"price\":3.8,\"foodName\":\"烤豆腐串\",\"type\":\"素类\",\"sales\":0,\"description\":\"这是烤豆腐串\",\"isDelete\":0,\"total\":2}],\"diners\":\"3\"}]', 0, '2023-03-12 16:05:15', 0);
INSERT INTO `orders` VALUES (1008, '6', '[{\"times\":1,\"orders\":[{\"foodId\":22,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108258130-骨肉相连.jpeg\",\"price\":3.2,\"foodName\":\"烤骨肉相连\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤骨肉相连\",\"isDelete\":0,\"total\":2},{\"foodId\":23,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108280913-鸡柳.jpeg\",\"price\":2.8,\"foodName\":\"烤鸡柳\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤鸡柳\",\"isDelete\":0,\"total\":1},{\"foodId\":25,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108346655-烤火腿.jpg\",\"price\":2.5,\"foodName\":\"烤火腿肠\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤火腿肠\",\"isDelete\":0,\"total\":1},{\"foodId\":26,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108378924-烤鸡翅.jpeg\",\"price\":3.8,\"foodName\":\"烤鸡翅\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤鸡翅\",\"isDelete\":0,\"total\":1},{\"foodId\":20,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108185520-豆腐串.jpg\",\"price\":3.8,\"foodName\":\"烤豆腐串\",\"type\":\"素类\",\"sales\":0,\"description\":\"这是烤豆腐串\",\"isDelete\":0,\"total\":1},{\"foodId\":21,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108226665-豆腐皮.jpeg\",\"price\":2.8,\"foodName\":\"烤豆腐皮\",\"type\":\"素类\",\"sales\":0,\"description\":\"这是烤豆腐皮\",\"isDelete\":0,\"total\":1},{\"foodId\":32,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108826402-可乐.jpg\",\"price\":4,\"foodName\":\"可乐\",\"type\":\"酒水\",\"sales\":0,\"description\":\"百事也能叫可乐？\",\"isDelete\":0,\"total\":1}],\"diners\":\"3\"},{\"times\":2,\"orders\":[{\"foodId\":19,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108163939-炒米粉.jpeg\",\"price\":12,\"foodName\":\"炒米粉\",\"type\":\"主食\",\"sales\":0,\"description\":\"这是炒米粉\",\"isDelete\":0,\"total\":1}]},{\"times\":3,\"orders\":[{\"foodId\":28,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108481140-烤生蚝.png\",\"price\":52,\"foodName\":\"蒜蓉烤生蚝(1打)\",\"type\":\"海鲜\",\"sales\":0,\"description\":\"烤生蚝，好吃\",\"isDelete\":0,\"total\":1},{\"foodId\":37,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108966190-扇贝.jpeg\",\"price\":72,\"foodName\":\"烤蒜蓉扇贝(1打)\",\"type\":\"海鲜\",\"sales\":0,\"description\":\"这是烤扇贝\",\"isDelete\":0,\"total\":1}]}]', 0, '2023-03-14 21:50:58', 0);
INSERT INTO `orders` VALUES (1009, '1', '[{\"times\":1,\"orders\":[{\"foodId\":19,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108163939-炒米粉.jpeg\",\"price\":12,\"foodName\":\"炒米粉\",\"type\":\"主食\",\"sales\":0,\"description\":\"这是炒米粉\",\"isDelete\":0,\"total\":2}],\"diners\":1}]', 0, '2023-03-12 19:31:39', 0);
INSERT INTO `orders` VALUES (1010, '3', '[{\"times\":1,\"orders\":[{\"foodId\":22,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108258130-骨肉相连.jpeg\",\"price\":3.2,\"foodName\":\"烤骨肉相连\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤骨肉相连\",\"isDelete\":0,\"total\":2},{\"foodId\":23,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108280913-鸡柳.jpeg\",\"price\":2.8,\"foodName\":\"烤鸡柳\",\"type\":\"荤类\",\"sales\":0,\"description\":\"这是烤鸡柳\",\"isDelete\":0,\"total\":4},{\"foodId\":20,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108185520-豆腐串.jpg\",\"price\":3.8,\"foodName\":\"烤豆腐串\",\"type\":\"素类\",\"sales\":0,\"description\":\"这是烤豆腐串\",\"isDelete\":0,\"total\":2},{\"foodId\":28,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108481140-烤生蚝.png\",\"price\":52,\"foodName\":\"蒜蓉烤生蚝(1打)\",\"type\":\"海鲜\",\"sales\":0,\"description\":\"烤生蚝，好吃\",\"isDelete\":0,\"total\":2},{\"foodId\":32,\"imgUrl\":\"http://127.0.0.1:88/foods/1678108826402-可乐.jpg\",\"price\":4,\"foodName\":\"可乐\",\"type\":\"酒水\",\"sales\":0,\"description\":\"百事也能叫可乐？\",\"isDelete\":0,\"total\":2}],\"diners\":\"5\"}]', 0, '2023-03-19 14:24:22', 0);

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
INSERT INTO `shop` VALUES ('烧烤店', '好吃的烧烤就在这里123', 'http://127.0.0.1:88/store/1679206683079-34f729f78cf1027f55f603b6ee3d3f09.jpeg');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isDelete` int(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, '荤类', 0);
INSERT INTO `type` VALUES (2, '素类', 0);
INSERT INTO `type` VALUES (3, '海鲜', 0);
INSERT INTO `type` VALUES (4, '主食', 0);
INSERT INTO `type` VALUES (5, '测试', 1);
INSERT INTO `type` VALUES (6, '荤菜', 1);
INSERT INTO `type` VALUES (7, '测试2', 1);
INSERT INTO `type` VALUES (8, '酒水', 0);
INSERT INTO `type` VALUES (9, '测试3', 0);
INSERT INTO `type` VALUES (10, '测试4', 1);

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
