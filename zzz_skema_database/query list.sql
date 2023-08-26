==============================12:50 AM 9/08/2023==============================
SELECT mahasiswa.*, nama_mk, semester, kelas, dosen.nama AS nama_dosen, laboran.nama AS nama_laboran, aslab.nama AS nama_aslab, modul_1, modul_2, modul_3, modul_4, modul_5, modul_6, modul_7, modul_8
FROM mahasiswa, mata_kuliah, dosen, laboran, aslab, mhs_mk_stts 
WHERE (mhs_mk_stts.nim = mahasiswa.nim) 
AND (dosen.id = mata_kuliah.id_dosen) 
AND (mata_kuliah.id = mhs_mk_stts.id_mk) 
AND (laboran.id = mata_kuliah.id_laboran) 
AND (aslab.id = mata_kuliah.id_aslab);

SELECT mhs.*, mk.nama nama_matkul, semester, kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab, modul_1, modul_2, modul_3, modul_4, modul_5, modul_6, modul_7, modul_8
FROM mahasiswa mhs 
INNER JOIN mhs_mk_stts sts ON mhs.nim = sts.nim
INNER JOIN mata_kuliah mk ON sts.id_mk = mk.id
INNER JOIN dosen ON mk.id_dosen = dosen.id
INNER JOIN laboran ON mk.id_laboran = laboran.id
INNER JOIN aslab ON mk.id_aslab = aslab.id
WHERE mhs.nim = 0701256123
AND laboran.id = 1
ORDER BY semester DESC;

==============================10:20 PM 20/08/2023==============================
SELECT * FROM (
	SELECT id, 'aslab' AS role, nama, username, password
	FROM aslab 
	UNION
	SELECT id, 'laboran', nama, username, password
	FROM laboran
	UNION
	SELECT id, 'dosen', nama, username, password
	FROM dosen
) user
WHERE user.username = 'sabirin';

==============================4:17 PM 24/08/2023==============================
 SELECT * FROM (
	SELECT 'Mahasiswa' role, COUNT(nim) jumlah
	FROM mahasiswa
	UNION
	SELECT 'Aslab', COUNT(id)
	FROM aslab
	UNION
	SELECT 'Laboran', COUNT(id)
	FROM laboran
	UNION
	SELECT 'Dosen', COUNT(id)
	FROM dosen
) jumlah;

==============================12:48 AM 25/08/2023==============================
ALTER TABLE laboran AUTO_INCREMENT=1;
ALTER TABLE aslab AUTO_INCREMENT=101;
ALTER TABLE dosen AUTO_INCREMENT=501;
ALTER TABLE mahasiswa AUTO_INCREMENT=1;
ALTER TABLE mata_kuliah AUTO_INCREMENT=1;
ALTER TABLE mhs_mk_stts AUTO_INCREMENT=1;