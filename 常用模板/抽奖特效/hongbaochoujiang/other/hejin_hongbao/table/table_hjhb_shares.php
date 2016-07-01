<?php
if (!defined('IN_DISCUZ')) {
    exit('Aecsse Denied');
}
class table_hjhb_shares extends discuz_table{
    public function __construct() {
        $this->_table = 'hjhb_shares';
        $this->_pk = 'id';
        parent::__construct();
    }

    public function fetch_all_uaid($uid,$aid){
         return DB::fetch_all('select * from %t where uid=%d and aid=%d order by add_time desc',array($this->_table,$uid,$aid));
    }
    public function fetch_phb_aid($aid,$count){
         return DB::fetch_all('select * from %t where aid=%d order by click desc, add_time desc limit 0,%d',array($this->_table,$aid,$count));
    }
    public function fetch_all_aid($aid){
         return DB::fetch_all('select * from %t where aid=%d order by click desc, add_time desc',array($this->_table,$aid));
    }
    public function fetch_limit_aid($aid,$start,$count){
         return DB::fetch_all('select * from %t where aid=%d order by click desc, add_time desc limit %d,%d',array($this->_table,$aid,$start,$count));
    }
    public function fetch_by_id($id){
         return DB::fetch_first('select * from %t where id=%d',array($this->_table,$id));
    }
    public function fetch_by_auid($aid,$uid){
         return DB::fetch_first('select * from %t where aid=%d and uid=%d',array($this->_table,$aid,$uid));
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