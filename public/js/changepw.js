function validateForm() {
  // Reset pesan kesalahan
  document.getElementById("message1").innerHTML = "";
  document.getElementById("message2").innerHTML = "";

  var pw1 = document.getElementById("passwordBaru1").value;
  var pw2 = document.getElementById("passwordBaru2").value;

  if (pw1 === "") {
    document.getElementById("message1").innerHTML = "**Isi password, tolong!";
    return false;
  }

  if (pw2 === "") {
    document.getElementById("message2").innerHTML = "**Masukkan password, tolong!";
    return false;
  }

  if (pw1.length < 8) {
    document.getElementById("message1").innerHTML = "**Panjang password harus setidaknya 8 karakter";
    return false;
  }

  if (pw1.length > 15) {
    document.getElementById("message1").innerHTML = "**Panjang password tidak boleh lebih dari 15 karakter";
    return false;
  }

  if (pw1 !== pw2) {
    document.getElementById("message2").innerHTML = "**Password tidak sama";
    return false;
  }


  return true;
}
