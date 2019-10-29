/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.7.24 : Database - nodedemo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodedemo` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `nodedemo`;

/*Table structure for table `users` */

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`first_name`,`last_name`,`password`,`is_deleted`) values (1,'iamjbpv@outlook.com141','Jb1423','Villamayor14','iamjbpv',0),(2,'annacazandra@gmail.com','Anna Cazandra','undefined','123456',1),(3,'annacazandra@gmail.com','Anna Cazandra','Delos Reyes','123456',0),(17,'jebeekun@airon.io','undefined','undefined','undefined',0),(18,'iamjbpv@outlook.com','undefined','undefined','undefined',0),(19,'iamjbpv@outlook.com','undefined','undefined','undefined',0),(24,'jebeekun@pme.me','Jb','Villamayor','undefined',0),(25,'annacazandra@gmail.com','anna','cazandra','undefined',1),(26,'iamjbpv@outlook.com','Jb','Villamayor','undefined',1),(27,'iamjbpv@outlook.com','Jb','Villamayor','undefined',1),(28,'iamjbpv@outlook.com','Jb','Villamayor','undefined',1),(29,'iamjbpv1@outlook.com','Jb','Villamayor','undefined',1),(30,'iamjbpv@outlook.com','Jb','Villamayor','iamjbpv',1),(31,'iamjbpv@outlook.com1','Jb1','Villamayor1','iamjbpv',1),(32,'iamjbpv@outlook.com','Jb22','Villamayor22','undefined',0),(33,'iamjbpv@outlook.com','Jb22','Villamayor22','undefined',1),(34,'iamjbpv@outlook.com222','Jb3443','Villamayor343','undefined',1),(35,'i121amjbpv@outlook.com','Jb12','Villamayor121','undefined',1),(36,'i1amjbpv@outlook.com1','Jb22','Villamayor232','undefined',1),(37,'454','sds','sds','undefined',1),(38,'11','11','11','undefined',1),(39,'11','11','11','undefined',0),(40,'hey','hey','hey','undefined',1),(41,'xx','xx','xx','undefined',1),(42,'zzz','zz','zzz','undefined',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
