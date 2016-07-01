<?php

if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
	exit('Access Denied');
}
require_once DISCUZ_ROOT.'./source/plugin/hejin_hongbao/config.inc.php';
$model = addslashes($_GET['model']);

if(submitcheck('add_st')){
	$stdata = array();
	if($_POST['title']){
		$stdata['title'] = addslashes($_POST['title']);
	}
	if($_POST['fxllone']){
		$stdata['fxllone'] = addslashes($_POST['fxllone']);
	}
	if($_FILES['icon']['error']==0){
		$stdata['icon'] = uploads('icon','data/uploads/icon');
	}
	if($_FILES['pic']['error']==0){
		$stdata['pic'] = uploads('pic','data/uploads/pic');
	}
	if($_FILES['upnumpic']['error']==0){
		$stdata['upnumpic'] = uploads('upnumpic','data/uploads/upnumpic');
	}
	if($_POST['wxtitle']){
		$stdata['wxtitle'] = addslashes($_POST['wxtitle']);
	}
	if($_POST['wxurl']){
		$stdata['wxurl'] = addslashes($_POST['wxurl']);
	}
	if($_POST['descr']){
		$stdata['descr'] = addslashes($_POST['descr']);
	}
	if($_POST['upname']){
		$stdata['upname'] = addslashes($_POST['upname']);
	}
	if($_POST['guize']){
		$stdata['guize'] = addslashes($_POST['guize']);
	}
	if($_POST['upnumber']){
		$stdata['upnumber'] = intval($_POST['upnumber']);
	}
	if($_POST['hongbaonum']){
		$stdata['hongbaonum'] = intval($_POST['hongbaonum']);
	}
	if($_POST['allmomey']){
		$stdata['allmomey'] = intval($_POST['allmomey']);
	}
	if($_POST['sjupnub']){
		$stdata['sjupnub'] = intval($_POST['sjupnub']);
	}
	if($_POST['sjdownnub']){
		$stdata['sjdownnub'] = intval($_POST['sjdownnub']);
	}
	$stdata['add_time'] = time();
	if($_POST['start_time']){
		$start_time = addslashes($_POST['start_time']);
		$stdata['start_time'] = strtotime($start_time);
	}
	if($_POST['end_time']){
		$end_time = addslashes($_POST['end_time']);
		$stdata['end_time'] = strtotime($end_time);
	}
	if($_POST['is_qiyong']){
		$stdata['is_qiyong'] = intval($_POST['is_qiyong']);
	}
	$stadd = C::t('#hejin_hongbao#hjhb_angpows')->insert($stdata);
	if($stadd){
		$url = 'action=plugins&identifier=hejin_hongbao&pmod=hongbao';
		cpmsg(lang('plugin/hejin_hongbao', 'addstok'), $url, 'succeed');	
	}
	
}

if(submitcheck('edit_st')){
	$aid = intval($_POST['aid']);
	if($aid){
		$stdata = array();
		if($_POST['title']){
			$stdata['title'] = addslashes($_POST['title']);
		}
		if($_POST['fxllone']){
			$stdata['fxllone'] = addslashes($_POST['fxllone']);
		}
		if($_FILES['icon']['error']==0){
			$stdata['icon'] = uploads('icon','data/uploads/icon');
		}
		if($_FILES['pic']['error']==0){
			$stdata['pic'] = uploads('pic','data/uploads/pic');
		}
		if($_FILES['upnumpic']['error']==0){
			$stdata['upnumpic'] = uploads('upnumpic','data/uploads/upnumpic');
		}
		if($_POST['wxtitle']){
			$stdata['wxtitle'] = addslashes($_POST['wxtitle']);
		}
		if($_POST['wxurl']){
			$stdata['wxurl'] = addslashes($_POST['wxurl']);
		}
		if($_POST['descr']){
			$stdata['descr'] = addslashes($_POST['descr']);
		}
		if($_POST['upname']){
			$stdata['upname'] = addslashes($_POST['upname']);
		}
		$stdata['guize'] = addslashes($_POST['guize']);
		if($_POST['hongbaonum']){
			$stdata['hongbaonum'] = intval($_POST['hongbaonum']);
		}
		if($_POST['allmomey']){
			$stdata['allmomey'] = intval($_POST['allmomey']);
		}
		if($_POST['sjupnub']){
			$stdata['sjupnub'] = intval($_POST['sjupnub']);
		}
		if($_POST['sjdownnub']){
			$stdata['sjdownnub'] = intval($_POST['sjdownnub']);
		}
		if($_POST['start_time']){
			$start_time = addslashes($_POST['start_time']);
			$stdata['start_time'] = strtotime($start_time);
		}
		if($_POST['end_time']){
			$end_time = addslashes($_POST['end_time']);
			$stdata['end_time'] = strtotime($end_time);
		}
		if($_POST['is_qiyong']){
			$stdata['is_qiyong'] = intval($_POST['is_qiyong']);
		}
		$stedit = C::t('#hejin_hongbao#hjhb_angpows')->update_by_id($aid,$stdata);
		if($stedit){
			$url = 'action=plugins&identifier=hejin_hongbao&pmod=hongbao';
			cpmsg(lang('plugin/hejin_hongbao', 'addstok'), $url, 'succeed');	
		}else{
			$url = 'action=plugins&identifier=hejin_hongbao&pmod=hongbao';
			cpmsg(lang('plugin/hejin_hongbao', 'addstok'), $url, 'succeed');	
		}
	}
	
}




//活动列表
if(empty($model)){
	include_once ("page.class.php");
	$page=$_GET['page'];
	$stlist = C::t('#hejin_hongbao#hjhb_angpows')->fetch_all();
	$totail = count($stlist);
	$number = 20;
	$url = $SELF.'?action=plugins&identifier=hejin_hongbao&pmod=hongbao&page={page}';
	$my_page=new PageClass($totail,$number,$page,$url);//参数设定：总记录，每页显示的条数，当前页，连接的地址
	$startnum = $my_page->page_limit;
	$count = $my_page->myde_size;


	$stlists = C::t('#hejin_hongbao#hjhb_angpows')->fetch_limit($startnum,$count);

	$page_string = $my_page->myde_write();

	include template('hejin_hongbao:admin/angpowlist');
}
//添加红包活动
elseif($model == 'addangpow'){
	include template('hejin_hongbao:admin/addangpow');
}

//编辑红包活动
elseif($model == 'edit'){
	$aid = intval($_GET['aid']);
	if($aid){
		$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
		include template('hejin_hongbao:admin/editangpow');
	}
}






//删除红包活动
elseif($model == 'del'){
	if($_GET['formhash']==formhash()){
		$aid = intval($_GET['aid']);
		if($_GET['page']){
			$page =  intval($_GET['page']);
		}else{
			$page =  1;
		}
		if($aid){
			$tjdel =  C::t('#hejin_hongbao#hjhb_angpows')->delete_by_id($aid);
			if($tjdel){
				$url = 'action=plugins&identifier=hejin_hongbao&pmod=hongbao&page='.$page;
				cpmsg(lang('plugin/hejin_hongbao', 'delcg'), $url, 'succeed');	
			}
		}
	}
}


//分享记录管理
elseif($model == 'shareuser'){
	$aid = intval($_GET['aid']);
	if($aid){
		$stnr =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);

		include_once ("page.class.php");
		$page=$_GET['page'];
		$stlist = C::t('#hejin_hongbao#hjhb_shares')->fetch_all_aid($aid);
		$totail = count($stlist);
		$number = 20;
		$url = $SELF.'?action=plugins&identifier=hejin_hongbao&pmod=hongbao&model=shareuser&aid='.$aid.'&page={page}';
		$my_page=new PageClass($totail,$number,$page,$url);//参数设定：总记录，每页显示的条数，当前页，连接的地址
		$startnum = $my_page->page_limit;
		$count = $my_page->myde_size;


		$shareues = C::t('#hejin_hongbao#hjhb_shares')->fetch_limit_aid($aid,$startnum,$count);

		$page_string = $my_page->myde_write();

		include template('hejin_hongbao:admin/userlist');
	}
}







//兑换记录列表
elseif($model == 'duihuan'){
	$aid = intval($_GET['aid']);
	if($aid){
		$stnr =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
		$shareues = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_aid($aid);
		$havecash = count($shareues);
		$alllqje = $havecash*$stnr['upnumber'];
		include template('hejin_hongbao:admin/dhlist');
	}
}


//标记为已使用状态
elseif($model == 'bjsy'){
	if($_GET['formhash']==formhash()){
		$cid = intval($_GET['cid']);
		$aid = intval($_GET['aid']);
		if($cid){
			$fxinfo =  C::t('#hejin_hongbao#hjhb_cashes')->fetch_by_id($cid);	
			if($fxinfo['is_sy']==0){
				$fxupdata = array(
					'is_sy' => 1,
				);
				$fxup =  C::t('#hejin_hongbao#hjhb_cashes')->update_by_id($cid,$fxupdata);	
				if($fxup){
					$url = 'action=plugins&identifier=hejin_hongbao&pmod=hongbao&model=duihuan&aid='.$aid;
					cpmsg(lang('plugin/hejin_hongbao', 'bjlqok'), $url, 'succeed');	
				}
			}else{
				$url = 'action=plugins&identifier=hejin_hongbao&pmod=hongbao&model=duihuan&aid='.$aid;
				cpmsg(lang('plugin/hejin_hongbao', 'bjlqno'), $url, 'error');	
			}	
		}
	}
}


//领取红包用户
elseif($model == 'hbuser'){
	$aid = intval($_GET['aid']);
	if($aid){
		$stnr =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
		$useres =  C::t('#hejin_hongbao#hejin_users')->fetch_all();
		$lquseres = array();
		foreach($useres as $key=>$user){
			$gotes =  C::t('#hejin_hongbao#hjhb_gotes')->fetch_all_uaid(intval($user['id']),$aid);
			if(count($gotes)){
				$lquseres[$key]['uid'] = $user['id'];
				$lquseres[$key]['telphone'] = $user['telphone'];
					$lqjiner=0;
					foreach($gotes as $lqes){
						$lqjiner=$lqjiner+$lqes['momey'];
					}
				$lquseres[$key]['momey'] = sprintf("%.2f",$lqjiner/100);
			}
		}
		
		include template('hejin_hongbao:admin/lqlist');
	}
}




 function uploads($postname,$dir){
	$tempFile = $_FILES[$postname]['tmp_name'];
    $fileTypes = array('jpg','jpeg','gif','png');
 	$fileParts = pathinfo($_FILES[$postname]['name']);
	$extension = strtolower($fileParts['extension']);
	$name   = date('mdHis').'-'.rand(100,999).'.'.$extension;
    $targetFolder = HEJIN_ROOT.'/'.$dir;
 if(!is_dir($targetFolder)){mkdir($targetFolder,0777,TRUE);}
	@chmod($targetFolder,0777); 
	$loca   = $targetFolder.'/'.$name;
 	if (in_array($extension,$fileTypes)) {
		if(copy($tempFile,$loca)){
		   return $dir.'/'.$name;
		   }
	   }else{
		showmessage(lang('plugin/hejin_hongbao', 'picgsbd'),'');
			   
			   }
 }

?>