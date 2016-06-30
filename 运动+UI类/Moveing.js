/*
运动类 js框架：
*Move(obj,json,fn):参数为"要运动的对象"，json对象集(css属性:target值,css属性2:target值)，和一个函数（函数为非必要参数）。当运动结束后，运行该函数。

*Expand(obj,pace)：参数为对象与x轴“扩大量”。从中心扩大一定量的运动函数，需要调用Move()(完美运动模块)

BncMove(obj,json,fn): 弹性运动效果函数。参数为obj：对象; json: 目前只能放{left:target值} 和 {top:target值}，fn：非必要参数，运动停止后执行的函数。 json内的left和top要跟 target目标值。

Col_Move(paceX,paceY,speed,obj,ground): 小球随意碰撞无重力运动框架。 参数：paceX：X轴单位速度 ；paceY：Y轴单位速度 ；speed：运行速度（循环运行时间） ； obj: 运动对象 ； ground：非必要参数，obj的运动区域对象
函数是否需要用“ground” 参数需要根据实际布局考虑。

G_Move(paceX,paceY,speed,obj,ground): 小球碰撞重力作用运动框架，该函数从Col_Move()函数演变来。PaceY一开始会加大，随后碰到障碍后会按比例减少直到0。水平运动速度paceX也会减少，最后运动物体完全静止。
//参数：paceX：X轴单位速度 ；paceY：Y轴单位速度 ；speed：运行速度（循环运行时间） ； obj: 运动对象 ； ground：非必要参数，obj的运动区域对象

Shot(obj,paceX,paceY)：模拟投掷函数：发射+重力+弹力+摩擦力，与G_Move(paceX,paceY,speed,obj,ground)效果一样


拖拽类 js框架：
fake_Drag(id): 原始拖拽函数 Drag(id): 参数id 为拖拽元素的Id

Drag(id): 完美拖拽函数： 参数id为被拖拽的元素的Id.兼容各版本浏览器解决鼠标选中背景内容的问题。修改两侧最大最小值范围可实现磁性吸附（见下注释）

marginDrag(id):带框拖拽：拖拽对象时出现一个元素的边框，鼠标拖动边框移动，拖拽对象保持不动。 放手时边框消失，拖拽对象瞬间移动到边框最后停留的位置。
参数id： 拖拽对象的id

DragChangeSize(ParentId,DragId)： 拖拽改变size函数
参数：ParentId为父元素的Id（改变大小的元素）；DragId为鼠标拖拽的元素Id（鼠标作用的元素）

*/

//工具函数1：getStyle() 运动框架需要调用的函数。
//getStyle()：参数为获取对象和css属性，是对所有浏览器获取当前非行间样式方法的兼容版本。
function getStyle(obj,attr){//解决兼容问题的样式提取（只能提取单一样式）
	if (obj.currentStyle)
	{
		return obj.currentStyle[attr]; //currentStyle：IE获取对象非行间样式
	}else{
		return getComputedStyle(obj,false)[attr];//getComputedStyle：FF获取对象非行间样式
	}											// 该函数仅获取单一样式，复合样式如background无效
}


//运动模块函数（可以同时执行多个任意属性改变的动作）
//Move(obj,json,fn):参数为"要运动的对象"，json对象集(css属性:target值,css属性2:target值)，和一个函数（函数为非必要参数）。当运动结束后，运行该函数。
function Move(obj, json, fn) //json内存放 attr（属性）和 该属性的目标值（target）
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//设置一个flag 为true
		//1.获取当前的值
		for(var attr in json)
		{
			var iCur=0;
			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			//2.算速度
			var pace=(json[attr]-iCur)/8;
			pace=pace>0?Math.ceil(pace):Math.floor(pace);
			
			//3.检测停止
			if(iCur!=json[attr])//当有一个属性的iCur值未到达json里面的target值时
			{
				bStop=false;  // 之前设的flag变量 变为 false
			}
			//（当bStop为false时<未到达目标值>）对象以pace的速度进行缓冲运动
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+pace)+')';
				obj.style.opacity=(iCur+pace)/100;
			}
			else
			{
				obj.style[attr]=iCur+pace+'px';
			}
		}
		
		if(bStop) //当bStop为true，证明对象的所有属性都达到target值
		{
			clearInterval(obj.timer); //停止计时器循环执行	
			if(fn)	//运动停止，判断函数是否有fn参数，该参数是个函数
			{
				fn(); //若有则运行fn参数的函数。 
			}
		}
	}, 30)
}



//Expand(obj,pace)：按比例中心扩大函数。 参数为对象与x轴"扩大量" (pace)。从中心扩大一定量的运动函数，需要调用Move()(完美运动模块)
function Expand(obj,pace){
		var x=parseInt(getStyle(obj, "width"));
		var y=parseInt(getStyle(obj, "height"));
		var d=parseFloat(x/y);
		var pace=pace;
		var x_2=x+pace; var y_2=Math.ceil((x_2)/d); var gT=Math.floor(-0.5*(y_2-y) ); var gL=Math.floor(-0.5*pace);
		Move(obj,{width:x_2,height:y_2,marginLeft:gL,marginTop:gT});
}


//BncMove(obj,json,fn): 弹性运动效果函数。
//参数为obj：对象; json: 目前只能放{left:target值} 和 {top:target值}，fn：非必要参数，运动停止后执行的函数。 json内的left和top要跟 target目标值。
function BncMove(obj,json,fn){
//弹性运动框架与缓冲运动框架的区别：需要在循环的函数外创建两个变量用于储存不断变化中的速度与距离
	var pace=0;//创建一个变量，用于保存速度值
	var distant=0;//创建一个变量，用于保存距离值
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for(var attr in json)
		{//循环json判断运动对象要进行横向还是纵向的运动（弹性无非就是横或竖）
			var iCur=0;
			if(attr=='left')
			{//若纵向运动，json的attr为top，iCur值就是offsetTop
				iCur=obj.offsetLeft;
			}
			else if(attr=="top")
			{//若横向运动，json的attr为left，iCur值就是offsetLeft
				iCur=obj.offsetTop;
			}
			pace+=(json[attr]-iCur)/8; //（运动的速度为目标值-当前值）/8，因为iCur：offsetLeft/Top是不断变大的，因此pace"+="的值（加速度）不断变小
			pace*=0.8; //除了加速度变小外，速度也同时变小（乘以小数）使其不断向0靠拢
			//弹性框架无需在此处为速度取整
			if(attr=='left')
			{
				distant=obj.offsetLeft; //将不断变大的obj.offsetLeft/Top 存入 运动距离的变量
			}
			else if(attr=="top")
			{
				distant=obj.offsetTop;
			}
			
			distant+=pace;
			if (Math.abs(pace)<1&& Math.abs(json[attr]-iCur)<1)
			{
				clearInterval(obj.timer);
				if(fn){	fn() }	//运动停止，判断函数是否有fn参数，该参数是个函数,若有则运行fn参数的函数	 
			}else{
				obj.style[attr]=distant+"px";//在运动过程中，加“px”可以对变动的distant自动取整
			}
		}
	},30)
}

//Col_Move(paceX,paceY,speed,obj,ground): 小球随意碰撞无重力运动框架
//参数：paceX：X轴单位速度 ；paceY：Y轴单位速度 ；speed：运行速度（循环运行时间） ； obj: 运动对象 ； ground：非必要参数，obj的运动区域对象
//函数是否需要用“ground” 参数需要根据实际布局考虑。
function Col_Move(paceX,paceY,speed,obj,ground){
//注意：该函数使用前请确定运动对象的布局问题，判断运动对象的定位是否absolute，以及运动对象的父级对象的定位。
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var l=obj.offsetLeft+paceX;
		var t=obj.offsetTop+paceY;
		if (!ground) //如果没有运动对象外面ground对象，则以document作为其运动的ground
		{
			if (t>=document.documentElement.clientHeight-obj.offsetHeight)
			{
				paceY*=-1;
				t=document.documentElement.clientHeight-obj.offsetHeight;
			}else if (t<=0)
			{
				paceY*=-1;
			}

			if (l>=document.documentElement.clientWidth-obj.offsetWidth)
			{
				paceX*=-1;
				l=document.documentElement.clientWidth-obj.offsetWidth;
			}else if (l<0)
			{
				paceX*=-1;
			}
		}else //如果有ground对象，则去ground的offsetWidth 和offsetHeight 为范围。
		{
			if (t>=ground.offsetHeight-obj.offsetHeight)
			{
				paceY*=-1;
				t=ground.offsetHeight-obj.offsetHeight;
			}else if (t<=0)
			{
				paceY*=-1;
				t=0;
			}

			if (l>=ground.offsetWidth-obj.offsetWidth)
			{
				paceX*=-1;
				l=ground.offsetWidth-obj.offsetWidth;
			}else if (l<0)
			{
				paceX*=-1;
				l=0;
			}
		}
		obj.style.left=l+"px";
		obj.style.top=t+"px";
	},speed)
}


//G_Move(paceX,paceY,speed,obj,ground): 小球碰撞重力作用运动框架，该函数从Col_Move()函数演变来。PaceY一开始会加大，随后碰到障碍后会按比例减少直到0。水平运动速度paceX也会减少，最后运动物体完全静止。
//参数：paceX：X轴单位速度 ；paceY：Y轴单位速度 ；speed：运行速度（循环运行时间） ； obj: 运动对象 ； ground：非必要参数，obj的运动区域对象
//函数是否需要用“ground” 参数需要根据实际布局考虑。
function G_Move(paceX,paceY,speed,obj,ground){
//注意：同理于Col_Move函数，该函数使用前请确定运动对象的布局问题，判断运动对象的定位是否absolute，以及运动对象的父级对象的定位。
	clearInterval(obj.timer); 
	obj.timer=setInterval(function(){
		paceY+=3; //Y轴的速度，影响运动对象朝下运动的自定义属性，重力的效果可以通过改变paceY来完成
		//l和t分别为运动中div的“左边距”和“顶边距”
		var l=obj.offsetLeft+paceX;
		var t=obj.offsetTop+paceY;
		if (!ground) //如果没有运动对象外面ground对象，则以document作为其运动的ground
		{
			if (t>=document.documentElement.clientHeight-obj.offsetHeight)
			{
				paceY*=-0.8;//重力下的反弹效果：接触到底部后Y轴速度为 反方向并减速（乘-0.8）
				paceX*=0.8; // 底部摩擦力效果：接触底部后x轴速度下降，但方向不变
				t=document.documentElement.clientHeight-obj.offsetHeight;
				 //避免运动物体有到达最尽头时出现的一瞬间出界行为。
			}else if (t<=0)
			{
				paceY*=-1;
				paceX*=0.8;// 顶部摩擦力效果：运动对象碰到顶部时，x轴运动速度也会减少（方向不变）
				t=0;
			}

			if (l>=document.documentElement.clientWidth-obj.offsetWidth)
			{
				paceX*=-0.8; //侧面摩擦力效果：接触到侧边框后速度减慢，方向改变
				l=document.documentElement.clientWidth-obj.offsetWidth; //同上理，避免短暂的出界现象。
			}else if (l<0)
			{
				paceX*=-0.8;  //侧面摩擦力效果：接触到侧边框后速度减慢，方向改变
				l=0;
			}
		}else //如果有ground对象参数，则去ground的offsetWidth 和offsetHeight 为范围。
		{
			if (t>=ground.offsetHeight-obj.offsetHeight)
			{
				paceY*=-0.8;
				paceX*=0.8;
				t=ground.offsetHeight-obj.offsetHeight;
			}else if (t<=0)
			{
				paceY*=-1;
				paceX*=0.8;
				t=0;
			}

			if (l>=ground.offsetWidth-obj.offsetWidth)
			{
				paceX*=-0.8;
				l=ground.offsetWidth-obj.offsetWidth;
			}else if (l<0)
			{
				paceX*=-0.8;
				l=0;
			}
		}
		//由于速度paceX,Y最后有可能成为大于-1的负数，若转化为实际px像素时会出现误差
		if (Math.abs(paceX)<1){	paceX=0; }
		if (Math.abs(paceY)<1){	paceY=0; }//使用绝对值将速度在足够小时（绝对值小于1）直接等于0，避免误差
		obj.style.left=l+"px";
		obj.style.top=t+"px";
	},speed)
}

// Shot(obj,paceX,paceY)：模拟投掷函数：发射+重力+弹力+摩擦力，与G_Move(paceX,paceY,speed,obj,ground)效果一样
function Shot(obj,paceX,paceY){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			paceY+=3; //重力效果，运行过程中Y轴速度（paceY）不断加大
			var l=obj.offsetLeft+paceX; var t=obj.offsetTop+paceY; //l和t分别为运动中div的“左边距”和“顶边距”
			if (t>=document.documentElement.clientHeight-obj.offsetHeight)
			{
				paceY*=-0.8; //重力下的反弹效果：接触到底部后Y轴速度为 反方向并减速（乘-0.8）
				paceX*=0.8 // 底部摩擦力效果：接触底部后x轴速度下降，但方向不变
				t=document.documentElement.clientHeight-obj.offsetHeight; //避免运动物体有到达最尽头时出现的一瞬间出界行为。
			}else if (t<=0)
			{
				paceY*=-1;
				paceX*=0.8 // 顶部摩擦力效果：运动对象碰到顶部时，x轴运动速度也会减少（方向不变）
				t=0;
			}
			
			if (l>=document.documentElement.clientWidth-obj.offsetWidth)
			{
				paceX*=-0.8; //侧面摩擦力效果：接触到侧边框后速度减慢，方向改变
				l=document.documentElement.clientWidth-obj.offsetWidth;//同上理，避免短暂的出界现象。
			}else if (l<=0) 
			{
				paceX*=-0.8; //侧面摩擦力效果：接触到侧边框后速度减慢，方向改变
				l=0;
			}
			//由于速度paceX,Y最后有可能成为大于-1的负数，若转化为实际px像素时会出现误差
			if (Math.abs(paceX)<1){	paceX=0; }
			if (Math.abs(paceY)<1){	paceY=0; } //使用绝对值将速度在足够小时（绝对值小于1）直接等于0，避免误差

			obj.style.left=l+"px";
			obj.style.top=t+"px";
		},30)
		//window.alert("b");
	}

//----------------------------------------
//原始拖拽函数 Drag(id): 参数id 为拖拽元素的Id
function Fake_Drag(id){
	var oDiv=document.getElementById(id);
	oDiv.onmousedown=function(e){
		oEvent=e||event;
		var insideX=oEvent.clientX-oDiv.offsetLeft;
		var insideY=oEvent.clientY-oDiv.offsetTop;
		
		document.onmousemove=function(e){
			oEvent=e||event;
			var MaxL=document.documentElement.clientWidth-oDiv.offsetWidth;
			var MaxT=document.documentElement.clientHeight-oDiv.offsetHeight;
			var l=oEvent.clientX-insideX;
			var t=oEvent.clientY-insideY;
			
			if (l<0){l=0}else if (l>=MaxL-0){l=MaxL}
			if (t<0){t=0}else if (t>=MaxT){t=MaxT}
			
			oDiv.style.left=l+"px";
			oDiv.style.top=t+"px";
		}

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
		return false;
	}
}


//Drag(id):完美拖拽函数： 参数id为被拖拽的元素的Id. 可以计算物体运动速度，然后选择调用投掷函数Shot()
//兼容各版本浏览器解决鼠标选中背景内容的问题。修改两侧最大最小值范围可实现磁性吸附（见下注释）
function Drag(id){
	var oDiv=document.getElementById(id);
	oDiv.timer=null; //给拖动对象添加一个timer 属性（用于存放定时器）
	oDiv.onmousedown=function(e){
		oEvent=e||event;
		var insideX=oEvent.clientX-oDiv.offsetLeft;
		var insideY=oEvent.clientY-oDiv.offsetTop;

		var lastX=0;	var lastY=0;  //该参数为存放运动对象拖拽时临放开前计算机可检测的最后运动距离
		var iSpeedX=0;  var iSpeedY=0; // 用于存放计算得出的鼠标放开时运动物体的速度

		clearInterval(oDiv.timer);

		if (oDiv.setCapture) //如果setCapture()函数有效
		{
			oDiv.onmousemove=fnMove;//则oDiv的mousemove事件执行fnMove()函数（拖拽运动）
			oDiv.onmouseup=fnUp; //则oDiv的mouseup事件执行fnUp()函数（鼠标放开）
			oDiv.setCapture();
		}else{ //如果setCapture()函数无效
			document.onmousemove=fnMove;//则document的mousemove事件执行fnMove()函数（拖拽运动）
			document.onmouseup=fnUp //则document的mouseup事件执行fnUp()函数（鼠标放开）
		}
		function fnMove(e){
			oEvent=e||event;
			var MaxL=document.documentElement.clientWidth-oDiv.offsetWidth;
			var MaxT=document.documentElement.clientHeight-oDiv.offsetHeight;
			var l=oEvent.clientX-insideX;
			var t=oEvent.clientY-insideY;
			if (l<0){l=0}else if (l>=MaxL-0){l=MaxL} // 修改(l<0+x) 和 (l>MaxL-x) x为磁性吸附的范围 可以实现磁性吸附效果
			if (t<0){t=0}else if (t>=MaxT){t=MaxT}
			oDiv.style.left=l+"px";
			oDiv.style.top=t+"px";
			
			//计算拖拽期间拖动对象的运动速度
			iSpeedX=l-lastX;
		    iSpeedY=t-lastY;
			lastX=l;
			lastY=t;
		}

		function fnUp(){
			this.onmousemove=null;
			this.onmouseup=null;
			if (this.releaseCapture)
			{
				this.releaseCapture();
			}
			//放开鼠标后，选择性开启的重力弹力摩擦力的运动函数
			//Shot(oDiv,iSpeedX,iSpeedY);       两个函数任意一个都ok   
			//G_Move(iSpeedX,iSpeedY,30,oDiv);
		}
		return false;
	}
}

//带框拖拽：拖拽对象时出现一个元素的边框，鼠标拖动边框移动，拖拽对象保持不动。 放手时边框消失，拖拽对象瞬间移动到边框最后停留的位置。
//参数id： 拖拽对象的id， 使用该函数前先创建box类：.box {position:absolute; border:1px dashed black;}
function marginDrag(){
	var oDiv=document.getElementById("div1");
	oDiv.onmousedown=function(e){
		oEvent=e||event;
		var insideX=oEvent.clientX-oDiv.offsetLeft;
		var insideY=oEvent.clientY-oDiv.offsetTop;
		
		var oNew=document.createElement("div");
		oNew.className="box"; //需要创建一个box类：.box {position:absolute; border:1px dashed black;}
		oNew.style.width=oDiv.offsetWidth-1+"px";
		oNew.style.height=oDiv.offsetHeight-1+"px";
		oNew.style.left=oDiv.offsetLeft+"px";
		oNew.style.top=oDiv.offsetTop+"px";
		document.body.appendChild(oNew);
		
		if (oDiv.setCapture)
		{
			oDiv.onmousemove=fnMove;
			oDiv.onmouseup=fnUp;
			oDiv.setCapture();
		}else{
			document.onmousemove=fnMove;
			document.onmouseup=fnUp;
		}

		function fnMove(e){
			oEvent=e||event;
			var MaxL=document.documentElement.clientWidth-oDiv.offsetWidth;
			var MaxT=document.documentElement.clientHeight-oDiv.offsetHeight;
			var l=oEvent.clientX-insideX;
			var t=oEvent.clientY-insideY;
			
			if (l<0){l=0}else if (l>=MaxL-0){l=MaxL}
			if (t<0){t=0}else if (t>=MaxT){t=MaxT}
			
			oNew.style.left=l+"px";
			oNew.style.top=t+"px";
		}

		function fnUp(){
			document.onmousemove=null;
			document.onmouseup=null;
			if (this.releaseCapture)
			{
				this.releaseCapture();
			}
			oDiv.style.left=oNew.offsetLeft+"px";
			oDiv.style.top=oNew.offsetTop+"px";
			document.body.removeChild(oNew);
		}
		return false;
	}
}

//DragChangeSize(ParentId,DragId)： 拖拽改变size函数
//参数：ParentId为父元素的Id（改变大小的元素）；DragId为鼠标拖拽的元素Id（鼠标作用的元素）：例：DragChangeSize("div1","div2");
function DragChangeSize(ParentId,DragId){
	var cSize=document.getElementById(ParentId);
	var oDiv=document.getElementById(DragId);
	oDiv.onmousedown=function(e){
		oEvent=e||event;
		var insideX=oEvent.clientX-oDiv.offsetLeft;
		var insideY=oEvent.clientY-oDiv.offsetTop;
		
		document.onmousemove=function(e){
			oEvent=e||event;
			var MaxL=document.documentElement.clientWidth-oDiv.offsetWidth;
			var MaxT=document.documentElement.clientHeight-oDiv.offsetHeight;
			var l=oEvent.clientX-insideX;
			var t=oEvent.clientY-insideY;
			//若不想cSize对象被拖拽变小为0，可以对l和t设定当小于某个值时，设定为固定值
			if (l<0){l=0}else if (l>=MaxL-0){l=MaxL}
			if (t<0){t=0}else if (t>=MaxT){t=MaxT}
			//让cSiz的width 和 height 等于 l 和 t
			cSize.style.width=l+oDiv.offsetWidth+"px";
			cSize.style.height=t+oDiv.offsetHeight+"px";
		}

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
		return false;
	}
}

//计算速度的拖拽运动框架，非正式可调用的函数框架,供参考用。可用于计算拖拽时最后放开鼠标时的运动对象的运动速度
/*oDiv.onmousedown=function(e){
		var oEvent=e||event;
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		var lastX=0;		//该参数用于计算物体拖拽时的运动速度
		var lastY=0;
		document.onmousemove=function(e){
			var oEvent=e||event;
			var l=oEvent.clientX-disX;
			var t=oEvent.clientY-disY;
			var MaxLeft=document.documentElement.clientWidth-oDiv.offsetWidth;
			var MaxTop=document.documentElement.clientHeight-oDiv.offsetHeight;
			if (l<=0){l=0;}
			if (l>=MaxLeft){l=MaxLeft;}
			if (t<=0){t=0;}
			if (t>=MaxTop){t=MaxTop;}
			
			oDiv.style.left=l+"px";
			oDiv.style.top=t+"px";
			
			
            paceX=l-lastX;
			paceY=t-lastY;			*这段代码是用于计算物体在
			lastX=l;				  拖拽时的运动速度*
			lastY=t;
			document.title="paceX:"+paceX+"||paceY:"+paceY;
		}

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			//function(){}; //放开鼠标时执行函数 （使用重力运动函数）
		}
		return false; //取消点击默认事件，可以用来解决ff浏览器的兼容问题。
		//clearInterval(obj.timer); //当点击对象时 同时清除定时器。该动作在使用重力运动函数时可以停止对象下跌。
	}
*/
//----------------------------------------
//鼠标滚轮事件运动模块，非正式可调用的函数框架,供参考用。
//使用时需要使用自定义函数：myAddEvent(oPar,"mousewheel",onMousewheel)进行事件绑定。（高版本浏览器可以直接使用“obj.addEventListener(sEvent,fn,false)”）
/*function onMousewheel(e){
		var oEvent=e||event;
		var bDown=true;
		bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		if (bDown)
		{
			oBar.style.left=oBar.offsetLeft+10+"px";
			if (oBar.offsetLeft>oPar.offsetWidth-oBar.offsetWidth-3){
				oBar.style.left=oPar.offsetWidth-oBar.offsetWidth+"px";
				}
			ConMove(oBar.offsetLeft);
		}else{
			oBar.style.left=oBar.offsetLeft-10+"px";
			if (oBar.offsetLeft<3){oBar.style.left=0+"px";}
			ConMove(oBar.offsetLeft);
		}

		if (oEvent.preventDefault)
		{
			oEvent.preventDefault();
		}
		return false
	}
	myAddEvent(oPar,"mousewheel",onMousewheel);
	myAddEvent(oPar,"DOMMouseScroll",onMousewheel);*/

