$(document).ready(function () {
    var url = 'http://127.0.0.1:3000/api/mahasiswa';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var dataBody = $('#t-body');
            dataBody.empty();

            $.each(data.mahasiswa, function(i, mahasiswa) {
                let number = parseInt(i) +1;
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
});