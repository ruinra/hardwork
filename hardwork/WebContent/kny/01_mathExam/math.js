var xhr=null;

function createXHR(){
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else if(window.ActiveXObejct){
		xhr=new ActivXObejct("Msxml2.XMLHTTP");
	}
}

function startRequest(){
	createXHR();
	xhr.open("GET", "math.xml", "true");
	xhr.send(null);
	xhr.onreadystatechange=resultProcess;
}

function resultProcess(){
	if(xhr.readyState==4){
		if(xhr.status==200){
			processXML();
		}
	}
}
var Qcount=1;
var questionList;

function processXML(){
	var xmlDoc=xhr.responseXML;
	questionList=xmlDoc.getElementsByTagName("Question");
	//alert(questionList.length);
	Qcount=1;
	var span=document.getElementById("count");
	span.innerHTML=Qcount + "/10";
	showQuestion();
}

function showQuestion(){
	var i=Qcount-1;
	var question=questionList[i];		//questionList[0]
	var subElement=question.childNodes;
	
	var divNode=document.createElement("div");

	var num1Node=subElement[1].firstChild.nodeValue + "";
	document.getElementById("num1").value=num1Node;

	var booNode=subElement[3].firstChild.nodeValue + "";
	document.getElementById("boo").value=booNode;
	
	var num2Node=subElement[5].firstChild.nodeValue + "";
	document.getElementById("num2").value=num2Node;
	
	document.getElementById("result").appendChild(divNode);
	
	document.getElementById("input").value="";
}

var OKcount=0;

Younsan=function(num1, num2, boo, input){
	this.num1=parseInt(num1);
	this.num2=parseInt(num2);
	this.boo=boo;
	this.input=parseInt(input);
	this.output=0;
};

Younsan.prototype={
	calculation:function(){
		if(this.boo=="+"){
			this.output=this.num1+this.num2;
		}else if(this.boo=="-"){
			this.output=this.num1-this.num2;
		}else if(this.boo=="*"){
			this.output=this.num1*this.num2;
		}else if(this.boo=="/"){
			this.output=this.num1/this.num2;
		}
		
		if(this.output==this.input){
			OKcount++;
		}
	},
	
	disp:function(){
		Qcount++;
		var span=document.getElementById("count");
		span.innerHTML=Qcount + "/10";
		if(Qcount==10){
			
			var span=document.getElementById("result");
			span.innerHTML="Á¤´ä : " + OKcount + "/10";
		}
		showQuestion();
	}
};