<?php
if (!defined('IN_DISCUZ')) {
    exit('Aecsse Denied');
}
class table_hejin_users extends discuz_table{
    public function __construct() {
        $this->_table = 'hejin_users';
        $this->_pk = 'id';
        parent::__construct();
    }


    public function fetch_all(){
         return DB::fetch_all('select * from %t order by add_time asc',array($this->_table));
    }
	
    public function fetch_by_id($id){
         return DB::fetch_first('select * from %t where id=%d',array($this->_table,$id));
    }
    public function fetch_by_tel($tel){
         return DB::fetch_first('select * from %t where telphone=%s',array($this->_table,$tel));
    }
    public function fetch_by_tel_pass($tel,$pass){
         return DB::fetch_first('select * from %t where telphone=%s and password=%s',array($this->_table,$tel,$pass));
    }
    public function update_by_id($id,$data){
         return DB::update($this->_table,$data,'id='.$id);	 
    }

    public function delete_by_id($id){
         return DB::delete($this->_table,'id='.$id);
    }
    public function insert($data){
         return DB::insert($this->_table,$data,true);
    }



}
?>