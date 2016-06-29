/*
�˶��� js��ܣ�
*Move(obj,json,fn):����Ϊ"Ҫ�˶��Ķ���"��json����(css����:targetֵ,css����2:targetֵ)����һ������������Ϊ�Ǳ�Ҫ�����������˶����������иú�����

*Expand(obj,pace)������Ϊ������x�ᡰ��������������������һ�������˶���������Ҫ����Move()(�����˶�ģ��)

BncMove(obj,json,fn): �����˶�Ч������������Ϊobj������; json: Ŀǰֻ�ܷ�{left:targetֵ} �� {top:targetֵ}��fn���Ǳ�Ҫ�������˶�ֹͣ��ִ�еĺ����� json�ڵ�left��topҪ�� targetĿ��ֵ��

Col_Move(paceX,paceY,speed,obj,ground): С��������ײ�������˶���ܡ� ������paceX��X�ᵥλ�ٶ� ��paceY��Y�ᵥλ�ٶ� ��speed�������ٶȣ�ѭ������ʱ�䣩 �� obj: �˶����� �� ground���Ǳ�Ҫ������obj���˶��������
�����Ƿ���Ҫ�á�ground�� ������Ҫ����ʵ�ʲ��ֿ��ǡ�

G_Move(paceX,paceY,speed,obj,ground): С����ײ���������˶���ܣ��ú�����Col_Move()�����ݱ�����PaceYһ��ʼ��Ӵ���������ϰ���ᰴ��������ֱ��0��ˮƽ�˶��ٶ�paceXҲ����٣�����˶�������ȫ��ֹ��
//������paceX��X�ᵥλ�ٶ� ��paceY��Y�ᵥλ�ٶ� ��speed�������ٶȣ�ѭ������ʱ�䣩 �� obj: �˶����� �� ground���Ǳ�Ҫ������obj���˶��������

Shot(obj,paceX,paceY)��ģ��Ͷ������������+����+����+Ħ��������G_Move(paceX,paceY,speed,obj,ground)Ч��һ��


��ק�� js��ܣ�
fake_Drag(id): ԭʼ��ק���� Drag(id): ����id Ϊ��קԪ�ص�Id

Drag(id): ������ק������ ����idΪ����ק��Ԫ�ص�Id.���ݸ��汾�����������ѡ�б������ݵ����⡣�޸����������Сֵ��Χ��ʵ�ִ�������������ע�ͣ�

marginDrag(id):������ק����ק����ʱ����һ��Ԫ�صı߿�����϶��߿��ƶ�����ק���󱣳ֲ����� ����ʱ�߿���ʧ����ק����˲���ƶ����߿����ͣ����λ�á�
����id�� ��ק�����id

DragChangeSize(ParentId,DragId)�� ��ק�ı�size����
������ParentIdΪ��Ԫ�ص�Id���ı��С��Ԫ�أ���DragIdΪ�����ק��Ԫ��Id��������õ�Ԫ�أ�

*/

//���ߺ���1��getStyle() �˶������Ҫ���õĺ�����
//getStyle()������Ϊ��ȡ�����css���ԣ��Ƕ������������ȡ��ǰ���м���ʽ�����ļ��ݰ汾��
function getStyle(obj,attr){//��������������ʽ��ȡ��ֻ����ȡ��һ��ʽ��
	if (obj.currentStyle)
	{
		return obj.currentStyle[attr]; //currentStyle��IE��ȡ������м���ʽ
	}else{
		return getComputedStyle(obj,false)[attr];//getComputedStyle��FF��ȡ������м���ʽ
	}											// �ú�������ȡ��һ��ʽ��������ʽ��background��Ч
}


//�˶�ģ�麯��������ͬʱִ�ж���������Ըı�Ķ�����
//Move(obj,json,fn):����Ϊ"Ҫ�˶��Ķ���"��json����(css����:targetֵ,css����2:targetֵ)����һ������������Ϊ�Ǳ�Ҫ�����������˶����������иú�����
function Move(obj, json, fn) //json�ڴ�� attr�����ԣ��� �����Ե�Ŀ��ֵ��target��
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//����һ��flag Ϊtrue
		//1.��ȡ��ǰ��ֵ
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
			
			//2.���ٶ�
			var pace=(json[attr]-iCur)/8;
			pace=pace>0?Math.ceil(pace):Math.floor(pace);
			
			//3.���ֹͣ
			if(iCur!=json[attr])//����һ�����Ե�iCurֵδ����json�����targetֵʱ
			{
				bStop=false;  // ֮ǰ���flag���� ��Ϊ false
			}
			//����bStopΪfalseʱ<δ����Ŀ��ֵ>��������pace���ٶȽ��л����˶�
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
		
		if(bStop) //��bStopΪtrue��֤��������������Զ��ﵽtargetֵ
		{
			clearInterval(obj.timer); //ֹͣ��ʱ��ѭ��ִ��	
			if(fn)	//�˶�ֹͣ���жϺ����Ƿ���fn�������ò����Ǹ�����
			{
				fn(); //����������fn�����ĺ����� 
			}
		}
	}, 30)
}



//Expand(obj,pace)�������������������� ����Ϊ������x��"������" (pace)������������һ�������˶���������Ҫ����Move()(�����˶�ģ��)
function Expand(obj,pace){
		var x=parseInt(getStyle(obj, "width"));
		var y=parseInt(getStyle(obj, "height"));
		var d=parseFloat(x/y);
		var pace=pace;
		var x_2=x+pace; var y_2=Math.ceil((x_2)/d); var gT=Math.floor(-0.5*(y_2-y) ); var gL=Math.floor(-0.5*pace);
		Move(obj,{width:x_2,height:y_2,marginLeft:gL,marginTop:gT});
}


//BncMove(obj,json,fn): �����˶�Ч��������
//����Ϊobj������; json: Ŀǰֻ�ܷ�{left:targetֵ} �� {top:targetֵ}��fn���Ǳ�Ҫ�������˶�ֹͣ��ִ�еĺ����� json�ڵ�left��topҪ�� targetĿ��ֵ��
function BncMove(obj,json,fn){
//�����˶�����뻺���˶���ܵ�������Ҫ��ѭ���ĺ����ⴴ�������������ڴ��治�ϱ仯�е��ٶ������
	var pace=0;//����һ�����������ڱ����ٶ�ֵ
	var distant=0;//����һ�����������ڱ������ֵ
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for(var attr in json)
		{//ѭ��json�ж��˶�����Ҫ���к�����������˶��������޷Ǿ��Ǻ������
			var iCur=0;
			if(attr=='left')
			{//�������˶���json��attrΪtop��iCurֵ����offsetTop
				iCur=obj.offsetLeft;
			}
			else if(attr=="top")
			{//�������˶���json��attrΪleft��iCurֵ����offsetLeft
				iCur=obj.offsetTop;
			}
			pace+=(json[attr]-iCur)/8; //���˶����ٶ�ΪĿ��ֵ-��ǰֵ��/8����ΪiCur��offsetLeft/Top�ǲ��ϱ��ģ����pace"+="��ֵ�����ٶȣ����ϱ�С
			pace*=0.8; //���˼��ٶȱ�С�⣬�ٶ�Ҳͬʱ��С������С����ʹ�䲻����0��£
			//���Կ�������ڴ˴�Ϊ�ٶ�ȡ��
			if(attr=='left')
			{
				distant=obj.offsetLeft; //�����ϱ���obj.offsetLeft/Top ���� �˶�����ı���
			}
			else if(attr=="top")
			{
				distant=obj.offsetTop;
			}
			
			distant+=pace;
			if (Math.abs(pace)<1&& Math.abs(json[attr]-iCur)<1)
			{
				clearInterval(obj.timer);
				if(fn){	fn() }	//�˶�ֹͣ���жϺ����Ƿ���fn�������ò����Ǹ�����,����������fn�����ĺ���	 
			}else{
				obj.style[attr]=distant+"px";//���˶������У��ӡ�px�����ԶԱ䶯��distant�Զ�ȡ��
			}
		}
	},30)
}

//Col_Move(paceX,paceY,speed,obj,ground): С��������ײ�������˶����
//������paceX��X�ᵥλ�ٶ� ��paceY��Y�ᵥλ�ٶ� ��speed�������ٶȣ�ѭ������ʱ�䣩 �� obj: �˶����� �� ground���Ǳ�Ҫ������obj���˶��������
//�����Ƿ���Ҫ�á�ground�� ������Ҫ����ʵ�ʲ��ֿ��ǡ�
function Col_Move(paceX,paceY,speed,obj,ground){
//ע�⣺�ú���ʹ��ǰ��ȷ���˶�����Ĳ������⣬�ж��˶�����Ķ�λ�Ƿ�absolute���Լ��˶�����ĸ�������Ķ�λ��
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var l=obj.offsetLeft+paceX;
		var t=obj.offsetTop+paceY;
		if (!ground) //���û���˶���������ground��������document��Ϊ���˶���ground
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
		}else //�����ground������ȥground��offsetWidth ��offsetHeight Ϊ��Χ��
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


//G_Move(paceX,paceY,speed,obj,ground): С����ײ���������˶���ܣ��ú�����Col_Move()�����ݱ�����PaceYһ��ʼ��Ӵ���������ϰ���ᰴ��������ֱ��0��ˮƽ�˶��ٶ�paceXҲ����٣�����˶�������ȫ��ֹ��
//������paceX��X�ᵥλ�ٶ� ��paceY��Y�ᵥλ�ٶ� ��speed�������ٶȣ�ѭ������ʱ�䣩 �� obj: �˶����� �� ground���Ǳ�Ҫ������obj���˶��������
//�����Ƿ���Ҫ�á�ground�� ������Ҫ����ʵ�ʲ��ֿ��ǡ�
function G_Move(paceX,paceY,speed,obj,ground){
//ע�⣺ͬ����Col_Move�������ú���ʹ��ǰ��ȷ���˶�����Ĳ������⣬�ж��˶�����Ķ�λ�Ƿ�absolute���Լ��˶�����ĸ�������Ķ�λ��
	clearInterval(obj.timer); 
	obj.timer=setInterval(function(){
		paceY+=3; //Y����ٶȣ�Ӱ���˶��������˶����Զ������ԣ�������Ч������ͨ���ı�paceY�����
		//l��t�ֱ�Ϊ�˶���div�ġ���߾ࡱ�͡����߾ࡱ
		var l=obj.offsetLeft+paceX;
		var t=obj.offsetTop+paceY;
		if (!ground) //���û���˶���������ground��������document��Ϊ���˶���ground
		{
			if (t>=document.documentElement.clientHeight-obj.offsetHeight)
			{
				paceY*=-0.8;//�����µķ���Ч�����Ӵ����ײ���Y���ٶ�Ϊ �����򲢼��٣���-0.8��
				paceX*=0.8; // �ײ�Ħ����Ч�����Ӵ��ײ���x���ٶ��½��������򲻱�
				t=document.documentElement.clientHeight-obj.offsetHeight;
				 //�����˶������е����ͷʱ���ֵ�һ˲�������Ϊ��
			}else if (t<=0)
			{
				paceY*=-1;
				paceX*=0.8;// ����Ħ����Ч�����˶�������������ʱ��x���˶��ٶ�Ҳ����٣����򲻱䣩
				t=0;
			}

			if (l>=document.documentElement.clientWidth-obj.offsetWidth)
			{
				paceX*=-0.8; //����Ħ����Ч�����Ӵ�����߿���ٶȼ���������ı�
				l=document.documentElement.clientWidth-obj.offsetWidth; //ͬ����������ݵĳ�������
			}else if (l<0)
			{
				paceX*=-0.8;  //����Ħ����Ч�����Ӵ�����߿���ٶȼ���������ı�
				l=0;
			}
		}else //�����ground�����������ȥground��offsetWidth ��offsetHeight Ϊ��Χ��
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
		//�����ٶ�paceX,Y����п��ܳ�Ϊ����-1�ĸ�������ת��Ϊʵ��px����ʱ��������
		if (Math.abs(paceX)<1){	paceX=0; }
		if (Math.abs(paceY)<1){	paceY=0; }//ʹ�þ���ֵ���ٶ����㹻Сʱ������ֵС��1��ֱ�ӵ���0���������
		obj.style.left=l+"px";
		obj.style.top=t+"px";
	},speed)
}

// Shot(obj,paceX,paceY)��ģ��Ͷ������������+����+����+Ħ��������G_Move(paceX,paceY,speed,obj,ground)Ч��һ��
function Shot(obj,paceX,paceY){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			paceY+=3; //����Ч�������й�����Y���ٶȣ�paceY�����ϼӴ�
			var l=obj.offsetLeft+paceX; var t=obj.offsetTop+paceY; //l��t�ֱ�Ϊ�˶���div�ġ���߾ࡱ�͡����߾ࡱ
			if (t>=document.documentElement.clientHeight-obj.offsetHeight)
			{
				paceY*=-0.8; //�����µķ���Ч�����Ӵ����ײ���Y���ٶ�Ϊ �����򲢼��٣���-0.8��
				paceX*=0.8 // �ײ�Ħ����Ч�����Ӵ��ײ���x���ٶ��½��������򲻱�
				t=document.documentElement.clientHeight-obj.offsetHeight; //�����˶������е����ͷʱ���ֵ�һ˲�������Ϊ��
			}else if (t<=0)
			{
				paceY*=-1;
				paceX*=0.8 // ����Ħ����Ч�����˶�������������ʱ��x���˶��ٶ�Ҳ����٣����򲻱䣩
				t=0;
			}
			
			if (l>=document.documentElement.clientWidth-obj.offsetWidth)
			{
				paceX*=-0.8; //����Ħ����Ч�����Ӵ�����߿���ٶȼ���������ı�
				l=document.documentElement.clientWidth-obj.offsetWidth;//ͬ����������ݵĳ�������
			}else if (l<=0) 
			{
				paceX*=-0.8; //����Ħ����Ч�����Ӵ�����߿���ٶȼ���������ı�
				l=0;
			}
			//�����ٶ�paceX,Y����п��ܳ�Ϊ����-1�ĸ�������ת��Ϊʵ��px����ʱ��������
			if (Math.abs(paceX)<1){	paceX=0; }
			if (Math.abs(paceY)<1){	paceY=0; } //ʹ�þ���ֵ���ٶ����㹻Сʱ������ֵС��1��ֱ�ӵ���0���������

			obj.style.left=l+"px";
			obj.style.top=t+"px";
		},30)
		//window.alert("b");
	}

//----------------------------------------
//ԭʼ��ק���� Drag(id): ����id Ϊ��קԪ�ص�Id
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


//Drag(id):������ק������ ����idΪ����ק��Ԫ�ص�Id. ���Լ��������˶��ٶȣ�Ȼ��ѡ�����Ͷ������Shot()
//���ݸ��汾�����������ѡ�б������ݵ����⡣�޸����������Сֵ��Χ��ʵ�ִ�������������ע�ͣ�
function Drag(id){
	var oDiv=document.getElementById(id);
	oDiv.timer=null; //���϶��������һ��timer ���ԣ����ڴ�Ŷ�ʱ����
	oDiv.onmousedown=function(e){
		oEvent=e||event;
		var insideX=oEvent.clientX-oDiv.offsetLeft;
		var insideY=oEvent.clientY-oDiv.offsetTop;

		var lastX=0;	var lastY=0;  //�ò���Ϊ����˶�������קʱ�ٷſ�ǰ������ɼ�������˶�����
		var iSpeedX=0;  var iSpeedY=0; // ���ڴ�ż���ó������ſ�ʱ�˶�������ٶ�

		clearInterval(oDiv.timer);

		if (oDiv.setCapture) //���setCapture()������Ч
		{
			oDiv.onmousemove=fnMove;//��oDiv��mousemove�¼�ִ��fnMove()��������ק�˶���
			oDiv.onmouseup=fnUp; //��oDiv��mouseup�¼�ִ��fnUp()���������ſ���
			oDiv.setCapture();
		}else{ //���setCapture()������Ч
			document.onmousemove=fnMove;//��document��mousemove�¼�ִ��fnMove()��������ק�˶���
			document.onmouseup=fnUp //��document��mouseup�¼�ִ��fnUp()���������ſ���
		}
		function fnMove(e){
			oEvent=e||event;
			var MaxL=document.documentElement.clientWidth-oDiv.offsetWidth;
			var MaxT=document.documentElement.clientHeight-oDiv.offsetHeight;
			var l=oEvent.clientX-insideX;
			var t=oEvent.clientY-insideY;
			if (l<0){l=0}else if (l>=MaxL-0){l=MaxL} // �޸�(l<0+x) �� (l>MaxL-x) xΪ���������ķ�Χ ����ʵ�ִ�������Ч��
			if (t<0){t=0}else if (t>=MaxT){t=MaxT}
			oDiv.style.left=l+"px";
			oDiv.style.top=t+"px";
			
			//������ק�ڼ��϶�������˶��ٶ�
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
			//�ſ�����ѡ���Կ�������������Ħ�������˶�����
			//Shot(oDiv,iSpeedX,iSpeedY);       ������������һ����ok   
			//G_Move(iSpeedX,iSpeedY,30,oDiv);
		}
		return false;
	}
}

//������ק����ק����ʱ����һ��Ԫ�صı߿�����϶��߿��ƶ�����ק���󱣳ֲ����� ����ʱ�߿���ʧ����ק����˲���ƶ����߿����ͣ����λ�á�
//����id�� ��ק�����id�� ʹ�øú���ǰ�ȴ���box�ࣺ.box {position:absolute; border:1px dashed black;}
function marginDrag(){
	var oDiv=document.getElementById("div1");
	oDiv.onmousedown=function(e){
		oEvent=e||event;
		var insideX=oEvent.clientX-oDiv.offsetLeft;
		var insideY=oEvent.clientY-oDiv.offsetTop;
		
		var oNew=document.createElement("div");
		oNew.className="box"; //��Ҫ����һ��box�ࣺ.box {position:absolute; border:1px dashed black;}
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

//DragChangeSize(ParentId,DragId)�� ��ק�ı�size����
//������ParentIdΪ��Ԫ�ص�Id���ı��С��Ԫ�أ���DragIdΪ�����ק��Ԫ��Id��������õ�Ԫ�أ�������DragChangeSize("div1","div2");
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
			//������cSize������ק��СΪ0�����Զ�l��t�趨��С��ĳ��ֵʱ���趨Ϊ�̶�ֵ
			if (l<0){l=0}else if (l>=MaxL-0){l=MaxL}
			if (t<0){t=0}else if (t>=MaxT){t=MaxT}
			//��cSiz��width �� height ���� l �� t
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

//�����ٶȵ���ק�˶���ܣ�����ʽ�ɵ��õĺ������,���ο��á������ڼ�����קʱ���ſ����ʱ���˶�������˶��ٶ�
/*oDiv.onmousedown=function(e){
		var oEvent=e||event;
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		var lastX=0;		//�ò������ڼ���������קʱ���˶��ٶ�
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
			paceY=t-lastY;			*��δ��������ڼ���������
			lastX=l;				  ��קʱ���˶��ٶ�*
			lastY=t;
			document.title="paceX:"+paceX+"||paceY:"+paceY;
		}

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			//function(){}; //�ſ����ʱִ�к��� ��ʹ�������˶�������
		}
		return false; //ȡ�����Ĭ���¼��������������ff������ļ������⡣
		//clearInterval(obj.timer); //���������ʱ ͬʱ�����ʱ�����ö�����ʹ�������˶�����ʱ����ֹͣ�����µ���
	}
*/
//----------------------------------------
//�������¼��˶�ģ�飬����ʽ�ɵ��õĺ������,���ο��á�
//ʹ��ʱ��Ҫʹ���Զ��庯����myAddEvent(oPar,"mousewheel",onMousewheel)�����¼��󶨡����߰汾���������ֱ��ʹ�á�obj.addEventListener(sEvent,fn,false)����
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

