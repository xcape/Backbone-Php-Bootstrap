DROP DATABASE IF EXISTS `bb_example`;
CREATE DATABASE `bb_example` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bb_example`;

DROP TABLE IF EXISTS `libros`;
CREATE TABLE `libros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(25) NOT NULL,
  `autor` varchar(25) NOT NULL,
  `categoria` varchar(25) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `libros` (`id`, `titulo`, `autor`, `categoria`) VALUES
(1,	'Los perros hambrientos',	'Ciro Alegria',	'Literatura'),
(2,	'Developing Backbone.js Ap',	'Addy Osmani',	'Tecnologia'),
(3,	'La meta',	'Eliyahu Goldratt',	'Negocios'),
(4,	'Los heraldos negros',	'Cesar Vallejo',	'Poesia');
