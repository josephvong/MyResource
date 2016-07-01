<?php

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}
require_once DISCUZ_ROOT.'./source/plugin/hejin_hongbao/config.inc.php';
$sitename = $_G['setting']['bbname'];	
$model = addslashes($_GET['model']);

//红包活动详情页
if($model == 'angpow'){
	$aid = intval($_GET['aid']);
	if(intval($_GET['new'])){
		$new = intval($_GET['new']);
	}else{
		$new = 'null';
	}
	
	if($aid){
		$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
		$ishave = count($angpow);
		//红包活动存在
		if($ishave){
			//红包活动是否开启
			if($angpow['is_qiyong']==1 && $angpow['end_time']>time() && $angpow['start_time']<time()){
				$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_aid($aid);
				$havecash = count($cashlist);
				$alllqje = $havecash*$angpow['upnumber'];
				$shenyuje = $angpow['allmomey']-$alllqje;
				//此次活动总金额是否用完
				if($shenyuje >= $angpow['upnumber']){
					
					$cooname = 'num'.$angpow['id'];
					//随机红包金额
					if(isset($_COOKIE[$cooname])){
						$newNum = $_COOKIE[$cooname];
						$momey = $newNum*100;
					}else{
						$num= rand($angpow['sjupnub'],$angpow['sjdownnub'])/100;
						$newNum  = sprintf("%.2f",$num);
						$momey = $newNum*100;
						$todayd = strtotime(date('Y-m-d',time()))+86400;
						$sysj = $todayd-time();
						setcookie($cooname, $newNum, time()+$sysj);
					}
					session_start();
					//用户是否登陆
					if($_SESSION['hj_uid']>0){
						$islogin = 'true';
						$uid = intval($_SESSION['hj_uid']);
						$today = date('Y-m-d',time());
						$dataid = strtotime($today);
						$islq = C::t('#hejin_hongbao#hjhb_gotes')->fetch_by_uadid($uid,$aid,$dataid);
						$islqcon = count($islq);
						//用户今日是否已经领取
						if($islqcon){
							$islingqu = 'true';
						}else{
							$islingqu = 'null';
						}
					
					}else{
						$islogin = 'null';
						$islingqu = 'null';
					}
					$over = 'null';
				}else{
					$over = 'true';	
					$islingqu = 'null';
					$islogin = 'null';
				}
			}else{
				$over = 'true';	
				$islingqu = 'null';
				$islogin = 'null';
			}
			include template('hejin_hongbao:index/index');
		}
	}
}



//跳转关注页面
if($model == 'weixin'){
	$aid = intval($_GET['aid']);
	if($aid){
		$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
		$ishave = count($angpow);
		//红包活动存在
		if($ishave){
			//红包活动是否开启
			if($angpow['is_qiyong']==1 && $angpow['end_time']>time() && $angpow['start_time']<time()){
				$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_aid($aid);
				$havecash = count($cashlist);
				$alllqje = $havecash*$angpow['upnumber'];
				$shenyuje = $angpow['allmomey']-$alllqje;
				//此次活动总金额是否用完
				if($shenyuje >= $angpow['upnumber']){
					
					$cooname = 'num'.$angpow['id'];
					//随机红包金额
					if(isset($_COOKIE[$cooname])){
						$newNum = $_COOKIE[$cooname];
						$momey = $newNum*100;
					}else{
						$num= rand($angpow['sjupnub'],$angpow['sjdownnub'])/100;
						$newNum  = sprintf("%.2f",$num);
						$momey = $newNum*100;
						$todayd = strtotime(date('Y-m-d',time()))+86400;
						$sysj = $todayd-time();
						setcookie($cooname, $newNum, time()+$sysj);
					}
					$over = 'null';
				}else{
					$over = 'true';	
				}
			}else{
				$over = 'true';	
			}
			include template('hejin_hongbao:index/weixin');
		}
	}
}




//登陆或者注册
elseif($model == 'login'){
	$tel = addslashes($_GET['tel']);
	$aid = intval($_GET['aid']);
	if($_GET['formhash']==formhash()){
		if($tel){
			$user = C::t('#hejin_hongbao#hejin_users')->fetch_by_tel($tel);
			$uhave = count($user);
			session_start();
			if($uhave){
				$_SESSION['hj_uid']=$user['id'];
				$_SESSION['telphone']=$user['telphone'];
			}else{
				$userinfo =array();
				$userinfo['telphone']=$tel;
				$userinfo['password']=md5('password');
				$userinfo['add_time']=time();
				$adduser = C::t('#hejin_hongbao#hejin_users')->insert($userinfo);
				if($adduser){
					$_SESSION['hj_uid']=$adduser;
					$_SESSION['telphone']=$tel;
				}
			}
			if($_SESSION['hj_uid']>0){
				echo $_SESSION['hj_uid'];
			}else{
				echo 0;
			}
		}
	}
}


//领取红包
elseif($model == 'linqu'){
	session_start();
	$uid = intval($_GET['uid']);
	$aid = intval($_GET['aid']);
	$momey = intval($_GET['momey']);
	if($uid==$_SESSION['hj_uid']){
		if($aid){
			$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
			$ishave = count($angpow);
			if($ishave){
				if($angpow['is_qiyong']==1 && $angpow['end_time']>time() && $angpow['start_time']<time()){
				$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_aid($aid);
				$havecash = count($cashlist);
				$alllqje = $havecash*$angpow['upnumber'];
				$shenyuje = $angpow['allmomey']-$alllqje;
				//此次活动总金额是否用完
				if($shenyuje >= $angpow['upnumber']){
				//此次活动总金额是否用完
					if($angpow['sjdownnub']>=$momey){
						if($_GET['formhash']==formhash()){
							$today = date('Y-m-d',time());
							$dataid = strtotime($today);
							$islq = C::t('#hejin_hongbao#hjhb_gotes')->fetch_by_uadid($uid,$aid,$dataid);
							$islqcon = count($islq);
							if(!$islqcon){
								$lqdata = array();
								$lqdata['uid'] = $uid;
								$lqdata['aid'] = $aid;
								$lqdata['momey'] = $momey;
								$lqdata['dataid'] = $dataid;
								$lqdata['add_time'] = time();
								$lqjl = C::t('#hejin_hongbao#hjhb_gotes')->insert($lqdata);
								if($lqjl){
									echo 1;
								}
							}else{
								echo 0;
							}

						}
					}
				}
				}
			}
		}
	}
}

//抢到的红包
elseif($model == 'gotangpow'){
	session_start();
	$aid = intval($_GET['aid']);
	if($_SESSION['hj_uid']>0){
		$uid = intval($_SESSION['hj_uid']);
		if($aid){
			$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
			$ishave = count($angpow);
			if($ishave){
				$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_uaid($uid,$aid);
				$havecash = count($cashlist);
				$dhje = $angpow['upnumber']*100;
				$alldh = $dhje*$havecash;
				$lqlist = C::t('#hejin_hongbao#hjhb_gotes')->fetch_all_uaid($uid,$aid);
				$lqcishu = count($lqlist);
				if($lqcishu){
					$lqjiner=0;
					foreach($lqlist as $lqes){
						$lqjiner=$lqjiner+$lqes['momey'];
					}
					
				}else{
					$lqjiner = 0;
				}
				$allje = $lqjiner - $alldh;
				$lqje = sprintf("%.2f",$allje/100);
				include template('hejin_hongbao:index/gotangpow');
			}
		}
	}else{
		header("Location: ".HEJIN_URL."&model=userlogin&aid=".$aid."");
	}
}



//兑换现金券
elseif($model == 'duihuan'){
	session_start();
	$uid = intval($_SESSION['hj_uid']);
	$aid = intval($_GET['aid']);
	if($uid){
		if($aid){
			$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_uaid($uid,$aid);
			$havecash = count($cashlist);
			if(!$havecash){
				$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
				$ishave = count($angpow);
				if($ishave){
					if($angpow['is_qiyong']==1 && $angpow['end_time']>time() && $angpow['start_time']<time()){
					$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_aid($aid);
					$havecash = count($cashlist);
					$alllqje = $havecash*$angpow['upnumber'];
					$shengyuje = $angpow['allmomey'] - $alllqje;
					//此次活动总金额是否用完
					if($shengyuje >= $angpow['upnumber']){
						if($_GET['formhash']==formhash()){
							$dhdata = array();
							$dhdata['momey'] = $angpow['upnumber'];
							$dhdata['uid'] = $uid;
							$dhdata['aid'] = $aid;
							$dhdata['add_time'] = time();
							$cashdh = C::t('#hejin_hongbao#hjhb_cashes')->insert($dhdata);
							if($cashdh){
								echo 'ok';
							}
						}
					}else{
						echo lang('plugin/hejin_hongbao', 'over');
					}
					
					}else{
						echo lang('plugin/hejin_hongbao', 'over');
					}
				}
			}else{
				echo lang('plugin/hejin_hongbao', 'yiduihuan');
			}
		}
	}
}


//我的现金券
elseif($model == 'mycash'){
	session_start();
	$aid = intval($_GET['aid']);
	if($_SESSION['hj_uid']>0){
		$uid = intval($_SESSION['hj_uid']);
		if($aid){
			$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
			$ishave = count($angpow);
			if($ishave){
				$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_uaid($uid,$aid);
				$havecash = count($cashlist);
				include template('hejin_hongbao:index/mycash');
			}
		}
	}else{
		header("Location: ".HEJIN_URL."&model=userlogin&aid=".$aid."");
	}
}

//发出的红包
elseif($model == 'sendangpow'){
	session_start();
	$aid = intval($_GET['aid']);
	if($_SESSION['hj_uid']>0){
		$uid = intval($_SESSION['hj_uid']);
		if($aid){
			$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
			$ishave = count($angpow);
			if($ishave){
				$sharees =  C::t('#hejin_hongbao#hjhb_shares')->fetch_by_auid($aid,$uid);
				$phbnub = intval($jyyhinfo['hjhb_sharephbnub']);
				$sharephb = C::t('#hejin_hongbao#hjhb_shares')->fetch_phb_aid($aid,$phbnub);
				include template('hejin_hongbao:index/sendangpow');
			}
		}
	}else{
		header("Location: ".HEJIN_URL."&model=userlogin&aid=".$aid."");
	}
}

//分享保存
elseif($model == 'share'){
	session_start();
	if($_SESSION['hj_uid']>0){
		if($_GET['formhash']==formhash()){
			$uid = intval($_SESSION['hj_uid']);
			$aid = intval($_GET['aid']);
			$sharees =  C::t('#hejin_hongbao#hjhb_shares')->fetch_by_auid($aid,$uid);
			if(!$sharees){
				$ssdata=array();
				$ssdata['uid']=$uid;
				$ssdata['aid']=$aid;
				$ssdata['add_time']=time();
				$ssaveadd = C::t('#hejin_hongbao#hjhb_shares')->insert($ssdata);
				if($ssaveadd){
					echo 'ok';
				}else{
					echo 'no';
				}

			}else{
				echo 'no';
			}
		
		}
	}
}







//分享出去的链接
elseif($model == 'shareok'){
	$uid = intval($_GET['uid']);
	$aid = intval($_GET['aid']);
	session_start();
	if($_SESSION['hj_uid']>0){
		header("Location: ".HEJIN_URL."&model=angpow&aid=".$aid);
	}else{
		if($aid){
			$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
			$sharees =  C::t('#hejin_hongbao#hjhb_shares')->fetch_by_auid($aid,$uid);
			include template('hejin_hongbao:index/shareok');
		}
	}
}

//增加分享浏览
elseif($model == 'upclick'){
	if($_GET['formhash']==formhash()){
		$sid = intval($_GET['sid']);
		if($sid){
			$sharees =  C::t('#hejin_hongbao#hjhb_shares')->fetch_by_id($sid);
			$haveshare = count($sharees);
			if($haveshare){
				$ushareda = array();
				if($sharees['is_ok']==0){
					$ushareda['is_ok'] = 1;
					
					$aid= intval($sharees['aid']);
					$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
					$fxdata = array();
					$fxdata['uid'] = intval($sharees['uid']);
					$fxdata['aid'] = $aid;
					$fxdata['momey'] = intval($angpow['hongbaonum'])*100;
					$fxdata['dataid'] = 12345;
					$fxdata['is_stat'] = 1;
					$fxdata['add_time'] = time();
					$lqjl = C::t('#hejin_hongbao#hjhb_gotes')->insert($fxdata);
				}
				$ushareda['click'] =$sharees['click']+1;
				$ushare = C::t('#hejin_hongbao#hjhb_shares')->update_by_id($sid,$ushareda);
				if($ushare){
					echo 'ok';
				}else{
					echo 'no';	
				}
			}
		}
	} 
}





//用户登录
elseif($model == 'userlogin'){
	$aid = intval($_GET['aid']);
	if(intval($_GET['new'])){
		$new = intval($_GET['new']);
	}else{
		$new = 'null';
	}
	
	if($aid){
		$angpow =  C::t('#hejin_hongbao#hjhb_angpows')->fetch_by_id($aid);
		$ishave = count($angpow);
		//红包活动存在
		if($ishave){
			//红包活动是否开启
			if($angpow['is_qiyong']==1 && $angpow['end_time']>time() && $angpow['start_time']<time()){
				$cashlist = C::t('#hejin_hongbao#hjhb_cashes')->fetch_all_aid($aid);
				$havecash = count($cashlist);
				$alllqje = $havecash*$angpow['upnumber'];
				$shenyuje = $angpow['allmomey']-$alllqje;
				//此次活动总金额是否用完
				if($shenyuje >= $angpow['upnumber']){
					
					$cooname = 'num'.$angpow['id'];
					//随机红包金额
					if(isset($_COOKIE[$cooname])){
						$newNum = $_COOKIE[$cooname];
						$momey = $newNum*100;
					}else{
						$num= rand($angpow['sjupnub'],$angpow['sjdownnub'])/100;
						$newNum  = sprintf("%.2f",$num);
						$momey = $newNum*100;
						$todayd = strtotime(date('Y-m-d',time()))+86400;
						$sysj = $todayd-time();
						setcookie($cooname, $newNum, time()+$sysj);
					}
					session_start();
					//用户是否登陆
					if($_SESSION['hj_uid']>0){
						$islogin = 'true';
						$uid = intval($_SESSION['hj_uid']);
						$today = date('Y-m-d',time());
						$dataid = strtotime($today);
						$islq = C::t('#hejin_hongbao#hjhb_gotes')->fetch_by_uadid($uid,$aid,$dataid);
						$islqcon = count($islq);
						//用户今日是否已经领取
						if($islqcon){
							$islingqu = 'true';
						}else{
							$islingqu = 'null';
						}
					
					}else{
						$islogin = 'null';
						$islingqu = 'null';
					}
					$over = 'null';
				}else{
					$over = 'true';	
					$islingqu = 'null';
					$islogin = 'null';
				}
			}else{
				$over = 'true';	
				$islingqu = 'null';
				$islogin = 'null';
			}
			include template('hejin_hongbao:index/userlogin');
		}
	}
}



//退出
elseif($model == 'logout'){
	if($_GET['formhash']==formhash()){

		session_start(); 
		//  这种方法是将原来注册的某个变量销毁
		unset($_SESSION['hj_uid']); 
		unset($_SESSION['telphone']); 
		header("Location: ".HEJIN_URL."");
	} 
}

?>