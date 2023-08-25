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
