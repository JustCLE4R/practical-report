$(document).ready(function () {
  let urlParams = new URLSearchParams(window.location.search);
  let kelasId = urlParams.get('id');

  let url = "/api/kelas/" + kelasId;
  let itemsPerPage = 4;
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
        kelasDetail = response.kelas.kelasDetail[0];
        showKelasDetail(kelasDetail);

        originalDataMhs = response.kelas.kelasMhs;
        data = originalDataMhs;
        totalData = data.length;
        totalPages = Math.ceil(totalData / itemsPerPage);
        updatePage(currentPage);
      },
      error: function () {
        alert('Kelas tidak ditemukan/Belum dibuat');
      }
    });
  }

  // Fungsi untuk membangun tampilan data berdasarkan halaman yang dipilih
  function updatePage(page) {
    let dataBody = $('#mhs');
    dataBody.empty();
  
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageData = data.slice(start, end);
  
    if (pageData.length === 0) {
      dataBody.append('<p class="text-danger text-center fs-5 fw-bold" colspan="5">Mahasiswa Tidak/Belum Ada diKelas Ini!</p>');
    } else {
      let fragment = document.createDocumentFragment();
  
      $.each(pageData, function (i, kelas) {
        let col = $('<div class="col-12 shadow bg-light border p-3 my-2">');
  
        col.append(`
          <div class="row justify-content-between text-emphasis-dark h6 mb-3">
            <div class="col-sm-10">
              <span class="p-2 px-3 rounded bg-dark-subtle">${kelas.nama}</span>
            </div>
            <div class="col-sm-2">
              <span class="p-2 px-3 rounded bg-dark-subtle">${kelas.nim}</span>
            </div>
          </div>

          <div class="col">
            <table class="table border table-hover">
              <thead>
                <tr class="text-center">
                  <th scope="col">Modul 1</th>
                  <th scope="col">Modul 2</th>
                  <th scope="col">Modul 3</th>
                  <th scope="col">Modul 4</th>
                  <th scope="col">Modul 5</th>
                  <th scope="col">Modul 6</th>
                  <th scope="col">Modul 7</th>
                  <th scope="col">Modul 8</th>
                </tr>
              </thead>
              <tbody>
                <tr id="trcontent" class="text-center">
                </tr>
              </tbody>
            </table>
          </div>
        `);
  
        let tr = $('<tr id="trcontent" class="text-center">'); // Moved outside the loop
  
        // Loop through the modulData array and generate table rows dynamically
        for (let i = 1; i <= 8; i++) {
          let buttonClass;
          let buttonIcon;
  
          switch (parseInt(kelas['modul_' + i], 10)) {
            case 0:
              buttonClass = 'btn-secondary';
              buttonIcon = 'bi-calendar';
              break;
            case 1:
              buttonClass = 'btn-warning';
              buttonIcon = 'bi-calendar-x';
              break;
            case 2:
              buttonClass = 'btn-primary';
              buttonIcon = 'bi-calendar2-check';
              break;
            case 3:
              buttonClass = 'btn-success';
              buttonIcon = 'bi-calendar2-check-fill';
              break;
            default:
              buttonClass = '';
              buttonIcon = '';
          }
  
          let buttonHtml = `
            <button class="btn fs-3 ${buttonClass}">
              <i class="bi ${buttonIcon}"></i>
            </button>
          `;
  
          let row = $('<td class="text-center">');
          row.append(buttonHtml);
          tr.append(row);
        }
  
        col.find('#trcontent').replaceWith(tr); // Replace the existing trcontent with the new tr
        fragment.appendChild(col[0]);
      });
  
      dataBody.append(fragment);
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
  let filteredData = originalDataMhs.filter(function (mhs) {
    return mhs.nama.toLowerCase().includes(keyword) ||
      mhs.nim.toLowerCase().includes(keyword);
  });
  data = filteredData;
  totalData = data.length;
  totalPages = Math.ceil(totalData / itemsPerPage);
  currentPage = 1;
  updatePage(currentPage);
}

});

function closeAlert(closeButton) {
	// Find the parent alert div and remove it
	var alertDiv = closeButton.parentElement;
	alertDiv.style.display = "none";
}

function showKelasDetail(data){
  const { nama_matkul, semester, kelas, nama_dosen, nama_laboran, nama_aslab } = data;

  $("#mata-kuliah").text(`${nama_matkul} ${semester}/${kelas}`);
  $("#dosen").text(`${nama_dosen}`);
  $("#laboran").text(`${nama_laboran}`);
  $("#aslab").text(`${nama_aslab}`);
  $("#titlepage").text(`${nama_matkul} ${semester}/${kelas}`);
}
