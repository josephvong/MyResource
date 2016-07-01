<?php

if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
	exit('Access Denied');
}



$sql = <<<EOF
CREATE TABLE IF NOT EXISTS `cdb_hejin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `telphone` varchar(100) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `jifen` int(11) NOT NULL DEFAULT '0',
  `token` varchar(1000) DEFAULT NULL,
  `wecha_id` varchar(1000) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `yuliua` varchar(1000) DEFAULT NULL,
  `yuliub` varchar(1000) DEFAULT NULL,
  `yuliuc` varchar(1000) DEFAULT NULL,
  `yuliud` varchar(1000) DEFAULT NULL,
  `yuliue` int(11) DEFAULT NULL,
  `yuliuf` int(11) DEFAULT NULL,
  `yuliug` int(11) DEFAULT NULL,
  `yuliuh` int(11) DEFAULT NULL,
  `add_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;
EOF;
runquery($sql);

$sql = <<<EOF
CREATE TABLE IF NOT EXISTS `cdb_hjhb_angpows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `wxtitle` varchar(1000) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `descr` varchar(1000) DEFAULT NULL,
  `guize` varchar(2000) DEFAULT NULL,
  `wxurl` varchar(2000) DEFAULT NULL,
  `upnumber` int(11) NOT NULL DEFAULT '0',
  `upname` varchar(255) NOT NULL,
  `upnumpic` varchar(255) DEFAULT NULL,
  `duihuan` varchar(1000) DEFAULT NULL,
  `hongbaonum` int(11) NOT NULL DEFAULT '0',
  `sjupnub` int(11) NOT NULL DEFAULT '0',
  `sjdownnub` int(11) NOT NULL DEFAULT '0',
  `allmomey` int(11) NOT NULL DEFAULT '0',
  `fxllone` varchar(255) DEFAULT NULL,
  `start_time` int(11) NOT NULL,
  `end_time` int(11) NOT NULL,
  `add_time` int(11) NOT NULL,
  `is_qiyong` tinyint(4) NOT NULL DEFAULT '1',
  `yuliua` int(11) DEFAULT NULL,
  `yuliub` int(11) DEFAULT NULL,
  `yuliuc` varchar(1000) DEFAULT NULL,
  `yuliud` varchar(1000) DEFAULT NULL,
  `yuliue` varchar(1000) DEFAULT NULL,
  `yuliuf` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;
EOF;
runquery($sql);


$sql = <<<EOF
CREATE TABLE IF NOT EXISTS `cdb_hjhb_cashes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `momey` int(11) NOT NULL,
  `add_time` int(11) NOT NULL,
  `is_sy` tinyint(4) NOT NULL DEFAULT '0',
  `yuliua` int(11) DEFAULT NULL,
  `yuliub` int(11) DEFAULT NULL,
  `yuliuc` varchar(1000) DEFAULT NULL,
  `yuliud` varchar(1000) DEFAULT NULL,
  `yuliue` varchar(1000) DEFAULT NULL,
  `yuliuf` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;
EOF;
runquery($sql);


$sql = <<<EOF
CREATE TABLE IF NOT EXISTS `cdb_hjhb_gotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `dataid` int(11) NOT NULL,
  `momey` int(11) NOT NULL,
  `is_stat` tinyint(1) NOT NULL DEFAULT '0',
  `add_time` int(11) NOT NULL,
  `yuliua` int(11) DEFAULT NULL,
  `yuliub` int(11) DEFAULT NULL,
  `yuliuc` int(11) DEFAULT NULL,
  `yuliud` varchar(1000) DEFAULT NULL,
  `yuliue` varchar(1000) DEFAULT NULL,
  `yuliuf` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;
EOF;
runquery($sql);



$sql = <<<EOF
CREATE TABLE IF NOT EXISTS `cdb_hjhb_shares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `is_ok` tinyint(1) NOT NULL DEFAULT '0',
  `add_time` int(11) NOT NULL,
  `click` int(11) NOT NULL DEFAULT '0',
  `yuliua` int(11) DEFAULT NULL,
  `yuliub` int(11) DEFAULT NULL,
  `yuliuc` int(11) DEFAULT NULL,
  `yuliud` varchar(1000) DEFAULT NULL,
  `yuliue` varchar(1000) DEFAULT NULL,
  `yuliuf` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 ;
EOF;
runquery($sql);




$finish = TRUE;
?>