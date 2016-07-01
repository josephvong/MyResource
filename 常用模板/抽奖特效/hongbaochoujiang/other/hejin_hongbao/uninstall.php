<?php

if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
	exit('Access Denied');
}

DB::query("DROP TABLE IF EXISTS ".DB::table('hjhb_angpows')."");
DB::query("DROP TABLE IF EXISTS ".DB::table('hjhb_cashes')."");
DB::query("DROP TABLE IF EXISTS ".DB::table('hjhb_gotes')."");
DB::query("DROP TABLE IF EXISTS ".DB::table('hjhb_shares')."");

$finish = TRUE;
?>