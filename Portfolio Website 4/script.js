var closeMenuBtn = document.querySelector('#closeMenuBtn');
var navBox = document.querySelector('#navBox');
var miniNavBox = document.querySelector('#miniNavBox');
var openMenuBtn = document.querySelector('#openMenuBtn');


closeMenuBtn.addEventListener('click', function(){
     navBox.style.display = 'none';
     miniNavBox.style.display = 'block';
     openMenuBtn.style.background="#1A120B";

     // console.log("hellow");
});
openMenuBtn.addEventListener('click', function(){
     miniNavBox.style.display = 'none';
     navBox.style.display = 'block';
     // console.log("hellow");
});

var aboutClick = document.querySelector('#aboutClick');
var aboutContainer = document.querySelector('#aboutContainer');
var homeContainer = document.querySelector('#homeContainer');

aboutClick.addEventListener('click', function(){
     homeContainer.style.display = 'none';
     aboutContainer.style.display="block";
})