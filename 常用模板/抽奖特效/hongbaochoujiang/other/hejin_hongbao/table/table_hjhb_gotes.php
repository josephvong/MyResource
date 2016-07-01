<?php
if (!defined('IN_DISCUZ')) {
    exit('Aecsse Denied');
}
class table_hjhb_gotes extends discuz_table{
    public function __construct() {
        $this->_table = 'hjhb_gotes';
        $this->_pk = 'id';
        parent::__construct();
    }


    public function fetch_all_sid($sid){
         return DB::fetch_all('select * from %t where sid=%d order by is_ok desc, add_time desc',array($this->_table,$sid));
    }
    public function fetch_limit_sid($sid,$start,$count){
         return DB::fetch_all('select * from %t where sid=%d order by is_ok desc, add_time desc limit %d,%d',array($this->_table,$sid,$start,$count));
    }
    public function fetch_all_zj($sid){
         return DB::fetch_all('select * from %t where sid=%d and is_zj=1 order by is_ok desc, add_time desc',array($this->_table,$sid));
    }

    public function fetch_all_wzj($sid){
         return DB::fetch_all('select * from %t where sid=%d and is_zj=0 order by is_ok desc, add_time desc',array($this->_table,$sid));
    }

	
    public function fetch_by_uadid($uid,$aid,$did){
         return DB::fetch_first('select * from %t where uid=%d and aid=%d and dataid=%d',array($this->_table,$uid,$aid,$did));
    }
    public function fetch_all_uaid($uid,$aid){
         return DB::fetch_all('select * from %t where uid=%d and aid=%d order by add_time desc',array($this->_table,$uid,$aid));
    }
    public function fetch_by_id($id){
         return DB::fetch_first('select * from %t where id=%d',array($this->_table,$id));
    }
    public function update_by_id($id,$data){
         return DB::update($this->_table,$data,'id='.$id);	 
    }

    public function delete_by_id($id){
         return DB::delete($this->_table,'id='.$id);
    }
    public function insert($data){
         return DB::insert($this->_table,$data);
    }



}
?>