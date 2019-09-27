﻿
/* 메뉴 토글 */
let menuStatus = false;
function toggleMenu(){
	if(!menuStatus){
		document.getElementById('menu').style.display = 'block';
		setTimeout(function(){
			document.getElementById('menu').style.opacity = 1;
		},10);
		menuStatus = 1;
	}else{
		document.getElementById('menu').style.opacity = 0;
		setTimeout(function(){
			document.getElementById('menu').style.display = 'none';
		},400);
		menuStatus = 0;
	}
}


/* 검색바 열기 */
function openSearchBar(){
	document.getElementById('search').style.borderBottom= '2px solid rgba(70,70,70,1)';
}


/* 메인 슬라이드 시작 */
/* change slide function */
let currentSlide = 1;
function changeSlide(nextSlide){
	const activeSlide = document.querySelector('#mainSlide .mainSlide .active');
	if(activeSlide === nextSlide){
		return;
	}
	activeSlide.style.opacity = '0';
	setTimeout(function(){
		activeSlide.style.display = 'none';
		activeSlide.setAttribute('class','');
	},500);
	nextSlide.style.display = "block";
	nextSlide.style.left = "70%";
	setTimeout(function(){
		nextSlide.style.opacity = "1";
		nextSlide.style.left = "50%";
		nextSlide.setAttribute('class','active');
	},500);
	currentSlide = getChildNumber(nextSlide);;
	changeIndex(currentSlide);
	adaptAtag(currentSlide);
}

/* 메인슬라이드 자동진행 */
let intervalSlide = 0;
function startSlide(){
	intervalSlide = setInterval(function(){
		var nextSlide = document.querySelector('#mainSlide .mainSlide .active').nextElementSibling;
		if(nextSlide == null){
			nextSlide = document.querySelector('#mainSlide .mainSlide').firstElementChild;
		}
		changeSlide(nextSlide);
	},2000);
}
startSlide();
/* 자동진행 멈춤 */
function stopSlide(){
	clearInterval(intervalSlide);
}

/* slideToggle */
let slidePlay = 1;
function toggleSlide(){
	const toggleButton = document.querySelector('#mainSlide .slideToggle');
	if (slidePlay === 1){
		stopSlide();
		toggleButton.style.backgroundImage = 'url("img/play-button.png")';
		slidePlay = 0;
	}
	else{
		startSlide();
		toggleButton.style.backgroundImage = 'url("img/pause-button.png")';
		slidePlay = 1;
	}
}
/* 인덱스 바꾸기 */
function changeIndex(next){
	/* alert(next); */
	var indexList = document.querySelector('#mainSlide .slideNav ul');
	var currentIndex = indexList.getElementsByClassName('on')[0];
	if(next - 1 < 0){
		next = 0 ;
	}
	var nextIndex = indexList.getElementsByTagName('li')[next-1];
	var leftIndex = document.querySelector('#mainContent .leftSlideIndex');
	currentIndex.getElementsByClassName('activeLine')[0].style.width = '0px';
	currentIndex.getElementsByClassName('activeLine')[0].style.left = '100px';
	nextIndex.getElementsByClassName('activeLine')[0].style.width = '0px';
	nextIndex.getElementsByClassName('activeLine')[0].style.left = '100px';
	setTimeout(function(){
		currentIndex.setAttribute('class','');
		nextIndex.setAttribute('class','on');
		nextIndex.getElementsByClassName('activeLine')[0].style.width = '100px';
		nextIndex.getElementsByClassName('activeLine')[0].style.left = '50px';
		leftIndex.innerHTML = '0' + (next);
	},480);
}
/* 오른쪽 인덱스 클릭시 슬라이드 */
function slidedByIndex(element){
	clearInterval(intervalSlide);
	const slides = document.querySelector('#mainSlide .mainSlide');
	const nextSlide = slides.getElementsByTagName('li')[getChildNumber(element) - 1];
	changeSlide(nextSlide);
	setTimeout(startSlide(),2000);
}
/* 슬라이드마다 A태그 경로&스타일 변경 */
function adaptAtag(index){
	const atag = document.querySelector('#mainSlide a');
	switch(index){
		case 1:
			atag.style.backgroundColor = 'blue';
			atag.setAttribute('href','#1');
			break;
		case 2:
			atag.style.backgroundColor = 'red';
			atag.setAttribute('href','#2');
			break;
		case 3:
			atag.style.backgroundColor = 'pink';
			atag.setAttribute('href','#3');
			break;
		case 4:
			atag.style.backgroundColor = 'coral';
			atag.setAttribute('href','#4');
			break;
		default:
			alert('adaptAtag function error!');
			break;
	}
}
/* 메인 슬라이드 끝 */

/* 스크롤 시 header 변경 */
function styleHeader(){
	const header = document.querySelector('header');
	const sct = window.scrollY;
	if(sct > 150){
		header.style.backgroundColor = 'rgba(255,255,255,0.5)';
	}else{
		header.style.backgroundColor = 'rgba(255,255,255,0)';
	}
}

/* 탭 그리드 메뉴 */
/* XML 파일 가져오기 */
let currentTab = 0;
var person = new Array();
let currentArray = 0;

function regPerson(name, img){
	this.name = name;
	this.img = img;
}

function loadMore(){
	loadData(currentTab, false);
}

function changeType(element){
	if(currentTab === getChildNumber(element.parentNode) - 1){
		loadData(currentTab, false);
	}else if(currentTab != getChildNumber(element.parentNode) - 1){
		currentArray = 0;
		currentTab = getChildNumber(element.parentNode) - 1;
		document.querySelector('#tabGrid .activeLine').style.marginLeft = (500 + ((getChildNumber(element.parentNode) - 1) * 150)) + 'px';
		loadData(currentTab, true);
	}
}
function loadData(index, firstload){
	if(firstload){
		document.querySelector('#tabGrid .modelListBox .modelList').innerHTML = '';
		/* document.querySelector('#tabGrid .modelListBox .modelList').style.height = '0px'; */
	}
	document.querySelector('#tabGrid .modelListBox>img').style.display = 'none';
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.querySelector('#tabGrid .modelListBox>img').style.display = 'none';
			listData(this);
		}else{
			document.querySelector('#tabGrid .modelListBox>img').style.display = 'block';
		}
	}
	switch(index){
		case 0:
			xhr.open("get", "/I-TALENTED/data/manList.xml", true);
			xhr.send();
			alert(xhr);
			return;
		case 1:
			xhr.open("get", "/I-TALENTED/data/womanList.xml", true);
			xhr.send();
			alert(xhr);
			return;
		case 2:
			xhr.open("get", "/I-TALENTED/data/childList.xml", true);
			xhr.send();
			alert(xhr);
			return;
		case 3:
			xhr.open("get", "/I-TALENTED/data/seniorList.xml", true);
			xhr.send();
			alert(xhr);
			return;
		default:
			console.log('error! check on function loadData');
			document.querySelector('#tabGrid .modelListBox>img').style.display = 'block';
			return;
	}
}
loadData(currentTab, true);

function listData(paramm){
	let i = 0;
	let name = 0;
	let img = 0;
	let dataInsert = 0;
	let xmlDoc = paramm.responseXML;
	alert(paramm);
	alert(xmlDoc);
	const modelData = document.querySelector('#tabGrid .modelListBox .modelList');
	let listHeight = modelData.offsetHeight;
	/* modelData.style.height = (listHeight + 700) + 'px'; */
	
	for (i = 0; i <= xmlDoc.getElementsByTagName('person').length; i++){
		if(i === 10 || i + currentArray >= xmlDoc.getElementsByTagName('person').length) break;
		name = xmlDoc.getElementsByTagName("person")[i + currentArray].getElementsByTagName('name')[0].innerHTML;
		img = xmlDoc.getElementsByTagName("person")[i + currentArray].getElementsByTagName('image')[0].innerHTML;
		person[i + currentArray] = new regPerson(name, img);
		console.log(person[i + currentArray].name, person[i + currentArray].img);
		dataInsert = '<li><a href="#">' + person[i + currentArray].img + '<div><img src="img/arrow-top-right.png" alt="click this model!"/><h3>' + person[i + currentArray].name + '</h3></div></a></li>';
		modelData.insertAdjacentHTML( 'beforeend', dataInsert );	
	}
	currentArray = i + currentArray;
	document.querySelector('#tabGrid .modelListBox>img').style.display = 'none';
	console.log(currentArray);
}

/* 유틸성 함수 */
/* index 구하기 */
function getChildNumber(node){
  return Math.ceil(Array.prototype.indexOf.call(node.parentNode.childNodes, node)/2);
}

/* 유틸성 함수 끝 */


























