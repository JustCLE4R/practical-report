$(document).ready(function () {
  let url = '/api/kelas';
  let itemsPerPage = 6;
  let totalData;
  let totalPages;
  let currentPage = 1;
  let data; // Menyimpan seluruh data dari server

  // Fungsi untuk mengambil data dari server
  function fetchData() {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        originalData = response.kelas; // Simpan data asli
        data = originalData; // Inisialisasi data dengan data asli
        totalData = data.length;
        totalPages = Math.ceil(totalData / itemsPerPage);
        updatePage(currentPage);
      },
      error: function () {
        alert('Terjadi kesalahan saat mengambil data.');
      }
    });
  }

  // Fungsi untuk membangun tampilan data berdasarkan halaman yang dipilih
  function updatePage(page) {
    let dataBody = $('#container');
    dataBody.empty();

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageData = data.slice(start, end);

    if (pageData.length === 0) {
      dataBody.append('<span class="text-danger text-center fs-5 fw-bold" colspan="5">Kelas tidak ditemukan!</span>');
    } else {
      $.each(pageData, function (i, kelas) {
        let number = start + i + 1;
        let namaGambar = encodeURI(kelas.nama); // Mengonversi spasi menjadi representasi URL
        let row = $('<div  class="col-md-5 shadow bg-light border p-3 my-2 " >');

        row.append(`
        <div class="row justify-content-between my-1 ">
          <div class="col-md-10 my-1">
            <button class="btn btn-primary text-start" >${kelas.nama} | ${kelas.semester}/${kelas.kelas}</button>
          </div>
          <div class="col-md-2 my-1">
          <a href="/kelas/result?id=${kelas.id}" class="btn btn-primary">Lihat</a>
          </div>
        </div>
        <div class="row row justify-content-center m-1 mt-2">
          <div class="col-md-4 border" style="width: 20vh; height: 20vh; background-image: url(\'/images/mata-kuliah/${kelas.nama}.jpg\'); background-repeat: no-repeat; background-size: contain; background-position: center center; display: flex; align-items: center; justify-content: center;">
          </div>
          <div class="col-md-8">
            <span class="h6">Dosen : ${kelas.nama_dosen}</span> <br>
            <span class="h6">Laboran : ${kelas.nama_laboran}</span> <br>
            <span class="h6">Aslab : ${kelas.nama_aslab}</span>
          </div>
        </div>`);


        dataBody.append(row);
      });
    }

    buildPaginationLinks();
  }

  // Fungsi untuk membangun tombol-tombol halaman paginasi
  function buildPaginationLinks() {
    let pagination = $('#pagination');
    pagination.empty();

    // Tombol "Previous" selalu muncul (di-disable jika di halaman pertama)
    if (currentPage > 1) {
      pagination.append('<li class="page-item" id="prevPage"><button class="page-link" href="#">Prev</button></li>');
    } else {
      pagination.append('<li class="page-item disabled"><button class="page-link" href="#">Prev</button></li>');
    }

    // Tombol Halaman
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      let activeClass = i === currentPage ? 'active' : '';
      pagination.append('<li class="page-item ' + activeClass + '"><button class="page-link" href="#">' + i + '</button></li>');
    }

    // Tombol "Next" selalu muncul (di-disable jika di halaman terakhir)
    if (currentPage < totalPages) {
      pagination.append('<li class="page-item" id="nextPage"><button class="page-link" href="#">Next</button></li>');
    } else {
      pagination.append('<li class="page-item disabled"><button class="page-link" href="#">Next</button></li>');
    }
  }

  // Inisialisasi
  fetchData();

  // Event handler untuk mengganti halaman
  $('#pagination').on('click', '.page-link', function () {
    let pageText = $(this).text();

    if (pageText === 'Prev' && currentPage > 1) {
      currentPage--;
    } else if (pageText === 'Next' && currentPage < totalPages) {
      currentPage++;
    } else {
      currentPage = parseInt(pageText);
    }

    updatePage(currentPage);
  });


$('#search-input').on('input', function () {
  search();
});

// Fungsi untuk melakukan pencarian
function search() {
  let keyword = $('#search-input').val().toLowerCase();
  let filteredData = originalData.filter(function (kelas) {
    return kelas.nama.toLowerCase().includes(keyword) ||
      kelas.nama_aslab.toLowerCase().includes(keyword) ||
      kelas.nama_dosen.toLowerCase().includes(keyword) ||
      kelas.nama_laboran.toLowerCase().includes(keyword);
  });
  data = filteredData;
  totalData = data.length;
  totalPages = Math.ceil(totalData / itemsPerPage);
  currentPage = 1;
  updatePage(currentPage);
}




});
// notif
function closeAlert(closeButton) {
	// Find the parent alert div and remove it
	var alertDiv = closeButton.parentElement;
	alertDiv.style.display = "none";
}
  
