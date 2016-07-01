/*
使用方法
setPage(document.getElementsByTagName("div")[0],12,7,function(all,now){
	alert("总页数为："+all+"，当前页为："+now);
});*/

function setPage(container,count,pageindex,fn){
	var container=container;
	var count=count;
	var pageindex=pageindex;
	var a=[];

	if (pageindex==1)
	{
		a[a.length]="<a href='#' class='prev unclick'>prev</a>";
	}else{
		a[a.length]="<a href='#' class='prev'>prev</a>";
	}

	function setPageList(){
		if (pageindex==i)
		{
			a[a.length]="<a href='#' class='on'>"+i+"</a>";
		}else{
			a[a.length]="<a href='#' >"+i+"</a>";
		}
	}

	if (count<=10)
	{
		for (var i=1;i<=count ;i++ )
		{
			setPageList()
		}
	}else {
		if (pageindex<=4)
		{
			for (var i=1;i<=5 ;i++ )
			{
				setPageList();
			}
			a[a.length]="...<a href='#' >"+count+"</a>";
		}else if (pageindex>=count-3)
		{
			a[a.length]="<a href='#' >1</a>...";
			for (var i=count-4;i<=count ;i++ )
			{
				setPageList();
			}
		}else{
			a[a.length]="<a href='#' >1</a>...";
			for (var i=pageindex-2;i<=pageindex+2 ;i++ )
			{
				setPageList();
			}
			a[a.length]="...<a href='#' >"+count+"</a>";
		}
	}

	if (pageindex==count)
	{
		a[a.length]="<a href='#' class='next unclick'>next</a>";
	}else{
		a[a.length]="<a href='#' class='next'>next</a>";
	}
	container.innerHTML=a.join("");

	if (fn)
	{
		fn(count,pageindex);
	}
	
	var pageClick=function(){
		var oAlink=container.getElementsByTagName("a");
		var inx=pageindex;

		oAlink[0].onclick=function(){
			if (inx==1)
			{
				return false;
			}
			inx--;
			setPage(container,count,inx,fn);
			return false;
		}

		for (var i=1;i<oAlink.length ;i++ )
		{
			oAlink[i].onclick=function(){
				inx=parseInt(this.innerHTML);
				setPage(container,count,inx,fn);
				return false;
			}
		}

		oAlink[oAlink.length-1].onclick=function(){
			if (inx==count)
			{
				return false;
			}
			inx++;
			setPage(container,count,inx,fn);
			return false;
		}
	}()

}

