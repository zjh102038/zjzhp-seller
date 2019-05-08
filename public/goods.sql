DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `goods_id` varchar(255) NOT NULL DEFAULT '',
  `store_id` varchar(255) NOT NULL,
  `goods_name` varchar(255) DEFAULT NULL,
  `cat` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `price` int(255) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `cart_image` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `sku` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `sku_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sku_cat` (
  `cat_code` INT UNSIGNED AUTO_INCREMENT,
  `cat_id` varchar(255) DEFAULT NULL,
  `cat_name` varchar(255) NOT NULL DEFAULT '',
  `sku_json_tpl` varchar(255) DEFAULT NULL,
  `store_id` varchar(255) NOT NULL DEFAULT '',
  `create_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
