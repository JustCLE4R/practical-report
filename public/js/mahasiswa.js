$(document).ready(function () {
    var url = 'http://127.0.0.1:3000/api/mahasiswa';
    var currentPage = 1;
    var itemsPerPage = 15;
    var totalData; // Jumlah total data yang akan diambil dari server
    var totalPages;

    // Fungsi untuk mengambil data dari server dan meng-update tampilan
    function fetchData(page) {
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {
          page: page,
          perPage: itemsPerPage
        },
        success: function (data) {
          var dataBody = $('#t-body');
          dataBody.empty();

          $.each(data.mahasiswa, function (i, mahasiswa) {
            let number = (page - 1) * itemsPerPage + i + 1;
            var row = $('<tr>');
            row.append('<td>' + number + '</td>');
            row.append('<td>' + mahasiswa.nama + '</td>');
            row.append('<td>' + mahasiswa.nim + '</td>');
            row.append('<td>' + mahasiswa.stambuk + '</td>');
            dataBody.append(row);
          });
        },
        error: function () {
          alert('Terjadi kesalahan saat mengambil data.');
        }
      });
    }

    // Fungsi untuk menghitung total halaman
    function calculateTotalPages() {
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
          totalData = data.mahasiswa.length;
          totalPages = Math.ceil(totalData / itemsPerPage);
        }
      });
    }

    // Fungsi untuk membangun tombol-tombol halaman paginasi
    function buildPaginationLinks() {
      var pagination = $('#pagination');
      pagination.empty();

      var maxPageLinks = 3; // Batasi jumlah tombol angka yang ditampilkan
      var startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
      var endPage = Math.min(totalPages, startPage + maxPageLinks - 1);

      // Tombol "Previous"
      if (currentPage > 1) {
        pagination.append('<li class="page-item" id="prevPage"><a class="page-link" href="#">Previous</a></li>');
      }

      // Tombol Halaman
      for (var i = startPage; i <= endPage; i++) {
        var activeClass = i === currentPage ? 'active' : '';
        pagination.append('<li class="page-item ' + activeClass + '"><a class="page-link" href="#">' + i + '</a></li>');
      }

      // Tombol "Next"
      if (currentPage < totalPages) {
        pagination.append('<li class="page-item" id="nextPage"><a class="page-link" href="#">Next</a></li>');
      }
    }

    // Fungsi untuk mengambil data dengan kata kunci tertentu
    function fetchDataWithSearch(keyword) {
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {
          page: currentPage,
          perPage: itemsPerPage
        },
        success: function (data) {
          var dataBody = $('#t-body');
          dataBody.empty();

          var filteredData = data.mahasiswa.filter(function (mahasiswa) {
            // Menggunakan toLowerCase() untuk membuat pencarian case-insensitive
            return mahasiswa.nama.toLowerCase().includes(keyword) ||
              mahasiswa.nim.toLowerCase().includes(keyword) ||
              mahasiswa.stambuk.toLowerCase().includes(keyword);
          });

          $.each(filteredData, function (i, mahasiswa) {
            let number = i + 1;
            var row = $('<tr>');
            row.append('<td>' + number + '</td>');
            row.append('<td>' + mahasiswa.nama + '</td>');
            row.append('<td>' + mahasiswa.nim + '</td>');
            row.append('<td>' + mahasiswa.stambuk + '</td');
            dataBody.append(row);
          });
        },
        error: function () {
          alert('Terjadi kesalahan saat mengambil data.');
        }
      });
    }

    // Inisialisasi
    calculateTotalPages();
    buildPaginationLinks();

    // Panggil fetchData dengan currentPage saat halaman dimuat pertama kali
    fetchData(currentPage);
    buildPaginationLinks();


    // Event handler untuk mengganti halaman
    $('#pagination').on('click', '.page-link', function () {
      var pageText = $(this).text();

      if (pageText === 'Previous' && currentPage > 1) {
        currentPage--;
      } else if (pageText === 'Next' && currentPage < totalPages) {
        currentPage++;
      } else {
        currentPage = parseInt(pageText);
      }

      // Periksa apakah halaman yang diminta ada dan panggil fetchData hanya jika halaman tersedia
      if (currentPage >= 1 && currentPage <= totalPages) {
        fetchData(currentPage); // Perbarui data saat ini sesuai dengan halaman yang dipilih
        buildPaginationLinks();
      }
    });

  
  
    
    // Event handler untuk pencarian
    $('#search-button').on('click', function () {
      var keyword = $('#search-input').val().toLowerCase();
      fetchDataWithSearch(keyword);
    });
  });