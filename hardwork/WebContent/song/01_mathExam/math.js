/**
 * 
 */

var xhr=null;
var examList;
var examNum=0;
var correctCount=0;

function showQuestion() {
	if(examNum >= examList.length){
		showResult();
		return;
	}
		
	var q=examList[examNum];
	var subElement=q.childNodes;
	var question = new Array();
	for(var i=0;i<subElement.length;i++){
		if(subElement[i].nodeType==1){
			//alert(subElement[i].firstChild.nodeValue);
			question.push(subElement[i].firstChild.nodeValue);
		}
	}	
	var num1=parseInt(question[0]);	
	var num2=parseInt(question[1]);
	var oper=question[2];
	//alert(num1+oper+num2);
	document.getElementById("num1").value=num1;
	document.getElementById("num2").value=num2;
	document.getElementById("oper").value=oper;
	document.getElementById("result").value="";
	
}
function clickOK(){	
	var num1=parseInt(document.getElementById("num1").value);
	var num2=parseInt(document.getElementById("num2").value);
	var oper=document.getElementById("oper").value;
	var result=document.getElementById("result").value;
	checkCorrect(num1,num2,oper,result);
	examNum++;
	showQuestion();
	//alert(examNum);	
}

function showResult(){
	document.getElementById("resultCount").innerHTML=correctCount + "문제 맞추셨습니다.";
}
function checkCorrect(num1, num2, oper, result){
	var correctResult
	switch(oper){
	case "+":
		correctResult = num1 + num2;
		break;
	case "-":
		correctResult = num1 - num2;
		break;
	case "*":
		correctResult = num1 * num2;
		break;
	case "/":
		correctResult = num1 / num2;
		break;
	}
	if(correctResult==result) correctCount++;
}
function examLoad(){
	createXHR();
	examNum=0;
	correctCount=0;
	
	xhr.open("GET", "exam.xml",true);
	xhr.send(null);
	xhr.onreadystatechange=resultProcess;
}

function createXHR(){
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
		//alert("BB");
	}else if(window.ActiveXObject){
		xhr=new ActiveXObject("Msxml2.XMLHTTP");
	}
}

function resultProcess(){
	if(xhr.readyState==4){
		if(xhr.status==200){
			//alert(xhr.responseText);
			alert("문제풀이를 시작하세요!");
			processXML();
		}
	}
}

function processXML(){
	var xmlDoc=xhr.responseXML;
	examList=xmlDoc.getElementsByTagName("q");
	//alert(examList.length);
	
	showQuestion();
}