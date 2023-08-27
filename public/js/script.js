const body = document.querySelector("body"),
  modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});


//set tenggat hari
var countDownDate = new Date("Jan 7, 2024 23:59:59").getTime();

//update countdown setiap 1 detik
var x = setInterval(function() {

  //Ambil hari sekarang
  var now = new Date().getTime();

  //mencari jarak dari hari sekarang dengan tenggat
  var distance = countDownDate - now;

  //here comes the shit
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //kalo hari lebih dari 10 tampilin hari saja
  if (days >= 10) {
    document.getElementById("countdown").innerHTML = days + " Hari";
  }
  else{
    document.getElementById("countdown").innerHTML = days + "d " + hours + ":" + minutes + ":" + seconds;
  }

  //kalo dah lewat dari tenggat ya TUTUP!
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "TUTUP!";
  }
}, 1000);

// clock
let section = document.querySelector("#section"),
icons = document.querySelector(".icons");

icons.onclick = ()=>{
  section.classList.toggle("dark");
}

// creating a function and calling it in every seconds
setInterval(()=>{

  let date = new Date(),
  hour = date.getHours(),
  min = date.getMinutes(),
  sec = date.getSeconds();

  let d;
  d = hour < 12 ? "AM" : "PM"; //if hour is smaller than 12, than its value will be AM else its value will be pm
  hour = hour > 12 ? hour - 12 : hour; //if hour value is greater than 12 than 12 will subtracted ( by doing this we will get value till 12 not 13,14 or 24 )
  hour = hour == 0 ? hour = 12 : hour; // if hour value is  0 than it value will be 12

  // adding 0 to the front of all the value if they will less than 10
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  document.querySelector(".hour_num").innerText = hour;
  document.querySelector(".min_num").innerText = min;
  document.querySelector(".sec_num").innerText = sec;
  document.querySelector(".am_pm").innerText = d;

}, 1000); // 1000 milliseconds = 1s

// welcome
const dynamicText = document.querySelector("h1 span");
const words = ["Hallo Semuanya..", "Selamat Datang di Website Laboratorium Komputer UINSU", "Visi & Misi Kita Adalah Melayani Dengan Senyum", "Jangan Lupa Untuk Tersenyum :)"];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();