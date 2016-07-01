<?php

if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
	exit('Access Denied');
}
require_once DISCUZ_ROOT.'./source/plugin/hejin_hongbao/config.inc.php';
$model = addslashes($_GET['model']);






if(empty($model)){

	include template('hejin_hongbao:admin/zhushou');
}

?>