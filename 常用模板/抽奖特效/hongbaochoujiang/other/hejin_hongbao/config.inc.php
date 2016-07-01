<?php

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

//插件目录常量
define('HEJIN_PATH', $_G['siteurl'].'source/plugin/hejin_hongbao/');
define('HEJIN_ROOT', dirname(__FILE__));
define('HEJIN_URL', $_G['siteurl'].'plugin.php?id=hejin_hongbao');
define('SITE_URL', $_G['siteurl']);
$SELF = $_SERVER["PHP_SELF"];
$jyyhinfo = $_G['cache']['plugin']['hejin_hongbao'];



$uid = intval($_G['uid']);
$formhash = $_G['formhash'];

if($uid != 0){
	$uname =  $_G['username'];
	$ulogo = $_G['setting']['ucenterurl'].'/avatar.php?uid='.$uid.'&size=small';
	$ugroupid = $_G['groupid'];
}

if($_G['charset']=='gbk'){
	$charset = 'gb2312';
}
elseif($_G['charset']=='utf-8'){
	$charset = 'UTF-8';
}
elseif($_G['charset']=='big5'){
	$charset = 'big5';
}



?>