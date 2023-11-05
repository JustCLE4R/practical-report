$(document).ready(function () {
  let url = 'http://127.0.0.1:3000/api/mahasiswa';
  let itemsPerPage = 15;
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
        originalData = response.mahasiswa; // Simpan data asli
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
    let dataBody = $('#t-body');
    dataBody.empty();

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageData = data.slice(start, end);

    if (pageData.length === 0) {
      dataBody.append('<tr><td class="text-center" colspan="4">Mahasiswa tidak ditemukan</td></tr>');
    } else {
      $.each(pageData, function (i, mahasiswa) {
        let number = start + i + 1;
        let row = $('<tr>');
        row.append('<td>' + number + '</td>');
        row.append('<td>' + mahasiswa.nama + '</td');
        row.append('<td>' + mahasiswa.nim + '</td>');
        row.append('<td>' + mahasiswa.stambuk + '</td');
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

 // Event handler untuk pencarian saat tombol "Enter" ditekan
$('#search-input').on('keydown', function (e) {
  if (e.keyCode === 13) { // 13 adalah kode tombol "Enter"
    search();
  }
});

// Event handler untuk pencarian saat tombol pencarian di-klik
$('#search-button').on('click', function () {
  search();
});


// Fungsi untuk melakukan pencarian
function search() {
  let keyword = $('#search-input').val().toLowerCase();
  let filteredData = originalData.filter(function (mahasiswa) {
    return mahasiswa.nama.toLowerCase().includes(keyword) ||
      mahasiswa.nim.toLowerCase().includes(keyword) ||
      mahasiswa.stambuk.toLowerCase().includes(keyword);
  });
  data = filteredData;
  totalData = data.length;
  totalPages = Math.ceil(totalData / itemsPerPage);
  currentPage = 1;
  updatePage(currentPage);
}
 // Inisialisasi
//  fetchData();



  
});
