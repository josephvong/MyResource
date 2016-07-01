<?php
if (!defined('IN_DISCUZ')) {
    exit('Aecsse Denied');
}
class table_hjhb_angpows extends discuz_table{
    public function __construct() {
        $this->_table = 'hjhb_angpows';
        $this->_pk = 'id';
        parent::__construct();
    }

	
    public function fetch_all(){
         return DB::fetch_all('select * from %t order by add_time desc',array($this->_table));
    }
    public function fetch_limit($start,$count){
         return DB::fetch_all('select * from %t order by add_time desc limit %d,%d',array($this->_table,$start,$count));
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