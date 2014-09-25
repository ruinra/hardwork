/**
 * 
 */
var xhr=null;
var quizNum=0;
var count=0;
var quizList=null;

function createXHR(){
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
		//alert("2-1");
	}else if(window.ActiveXObject){
		xhr=new ActiveXObject("Msxml2.XMLHTTP");
		//alert("2-2");
	}
}

function startExam(){
	//alert("1");
	createXHR();
	xhr.open("GET", "exam.xml", "true");
	xhr.send(null);
	xhr.onreadystatechange=resultProcess;
}

function resultProcess(){
	//alert("!");
	if(xhr.readyState==4){
		if(xhr.status==200){
			//alert(xhr.responseText);
			processXML();
		}
	}
}

function processXML(){
	count=0;
	quizNum=0;
	var xmlDoc=xhr.responseXML;
	//alert(xhr.responseText);
	quizList=xmlDoc.getElementsByTagName("quiz");
	//alert(quizList.length);
	showQuiz();
//	for(var i=0;i<quizList.length;i++){
//		var quiz=quizList[i];
//		var subElement=quiz.childNodes;
//			//var su1=quiz.firstChild.nodeValue;
//			//var buho=quiz.nextSibling.nodeValue;
//			//var su2=quiz.nextSibling.nextSibling.nodeValue;
//			//alert(su1);
//		//alert(subElement.length);
//		
//			
//	}
}

function showQuiz(){
	
	if(quizNum >= 10){
		showResult();
		return;
	}
		
	var quiz=quizList[quizNum];
	var subElement=quiz.childNodes;
	var arr=new Array();
	for(var j=0;j<subElement.length;j++){
		if(subElement[j].nodeType==1){
			//document.getElementById("su1").value=subElement[j].firstChild.nodeValue;
			//alert(subElement[j].firstChild.nodeValue);
			arr.push(subElement[j].firstChild.nodeValue);
		}
	}
	document.getElementById("su1").value=arr[0];
	document.getElementById("buho").value=arr[1];
	document.getElementById("su2").value=arr[2];
	document.getElementById("result").value="";
}

function resultExam(){
	var inputResult=document.getElementById("result");
	//alert(inputResult);
	var su1=parseInt(document.getElementById("su1").value);
	var buho=document.getElementById("buho").value;
	var su2=parseInt(document.getElementById("su2").value);
	var result=document.getElementById("result").value;
	var examResult=0;
	
	if(buho=="+"){
		examResult=su1 + su2;
	}else if(buho=="-"){
		examResult=su1 - su2;
	}else if(buho=="/"){
		examResult=su1 / su2;
	}else if(buho=="*"){
		examResult=su1 * su2;
	}
	
	
	if(examResult == result){
		count++
	}
	//alert(count);
	quizNum++;
	showQuiz();
}

function showResult(){
	document.getElementById("showResult").innerHTML="맞추신 정답은" + count + "개 입니다.";
}






