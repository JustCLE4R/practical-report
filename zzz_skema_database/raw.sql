-- --------------------------------------------------------
-- Host:                         192.168.69.1
-- Server version:               8.0.33 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for aslabanjing_testing
CREATE DATABASE IF NOT EXISTS `aslabanjing_testing` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aslabanjing_testing`;

-- Dumping structure for table aslabanjing_testing.aslab
CREATE TABLE IF NOT EXISTS `aslab` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Meyimpan data asisten lab';

-- Dumping data for table aslabanjing_testing.aslab: ~6 rows (approximately)
INSERT INTO `aslab` (`id`, `nama`, `nim`, `username`, `password`) VALUES
	(1, 'Dimas Yudistira', '0701213127', 'dimas170303', '1205051703030002'),
	(2, 'Sabirin Kosong', '0701234567', 'sabirin', 'sabirin'),
	(3, 'KTB', '6969420', NULL, NULL),
	(4, 'Sultan Azka', '123', NULL, NULL),
	(5, 'Paris Alvito', '321', NULL, NULL),
	(6, 'Bintang Hutagalung', '333', NULL, NULL);

-- Dumping structure for table aslabanjing_testing.dosen
CREATE TABLE IF NOT EXISTS `dosen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan dosen yang aktif mengajar mata kuliah praktikum';

-- Dumping data for table aslabanjing_testing.dosen: ~4 rows (approximately)
INSERT INTO `dosen` (`id`, `nama`, `username`, `password`) VALUES
	(1, 'Pak Algo', NULL, NULL),
	(2, 'Pak Pancasila', NULL, NULL),
	(3, 'Pak Database', NULL, NULL),
	(4, 'Pak Bahasa', NULL, NULL);

-- Dumping structure for table aslabanjing_testing.laboran
CREATE TABLE IF NOT EXISTS `laboran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `nim` varchar(10) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan data laboran';

-- Dumping data for table aslabanjing_testing.laboran: ~2 rows (approximately)
INSERT INTO `laboran` (`id`, `nama`, `nim`, `username`, `password`) VALUES
	(1, 'Luthfi', '0701245120', 'luthfi', 'luthfi'),
	(2, 'Fahri', '0709887654', 'fahri', 'fahri');

-- Dumping structure for table aslabanjing_testing.mahasiswa
CREATE TABLE IF NOT EXISTS `mahasiswa` (
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `nama` varchar(255) DEFAULT NULL,
  `stambuk` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan seluruh mahasiswa yang aktif dalam mata kuliah praktikum';

-- Dumping data for table aslabanjing_testing.mahasiswa: ~6 rows (approximately)
INSERT INTO `mahasiswa` (`nim`, `nama`, `stambuk`) VALUES
	('0701212124', 'levy putri kasmari', 2022),
	('0701212125', 'wiranto prasetya', 2021),
	('0701212126', 'bagas wijaya', 2019),
	('0701212127', 'dina claudia', 2021),
	('0701212128', 'bambang pratama', 2021),
	('0701256122', 'claudius claudianus', 2020),
	('0701256123', 'citra audie', 2020);

-- Dumping structure for table aslabanjing_testing.mata_kuliah
CREATE TABLE IF NOT EXISTS `mata_kuliah` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_mk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `semester` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kelas` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_dosen` int NOT NULL,
  `id_laboran` int NOT NULL,
  `id_aslab` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_mata_kuliah_dosen` (`id_dosen`),
  KEY `FK_mata_kuliah_aslab` (`id_aslab`),
  KEY `FK_mata_kuliah_laboran` (`id_laboran`),
  CONSTRAINT `FK_mata_kuliah_aslab` FOREIGN KEY (`id_aslab`) REFERENCES `aslab` (`id`),
  CONSTRAINT `FK_mata_kuliah_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id`),
  CONSTRAINT `FK_mata_kuliah_laboran` FOREIGN KEY (`id_laboran`) REFERENCES `laboran` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan semua mata kuliah praktikum yang sedang aktif';

-- Dumping data for table aslabanjing_testing.mata_kuliah: ~8 rows (approximately)
INSERT INTO `mata_kuliah` (`id`, `nama_mk`, `semester`, `kelas`, `id_dosen`, `id_laboran`, `id_aslab`) VALUES
	(1, 'Pemrograman Dasar', '6', 'IK-1', 1, 2, 1),
	(2, 'Pancasila', '4', 'IK-3', 2, 1, 2),
	(3, 'Basis Data', '3', 'IK-1', 3, 2, 4),
	(4, 'Pemrograman Dasar 2', '7', 'IK-2', 1, 2, 1),
	(5, 'Mitigasi Bencana', '4', 'IK-5', 2, 1, 6),
	(6, 'Bahasa Inggris', '2', 'IK-3', 4, 1, 3),
	(7, 'Pemrograman Dasar', '6', 'IK-2', 1, 1, 5),
	(8, 'Pancasila', '4', 'IK-2', 2, 1, 2);

-- Dumping structure for table aslabanjing_testing.mhs_mk_stts
CREATE TABLE IF NOT EXISTS `mhs_mk_stts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_mk` int NOT NULL,
  `modul_1` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_2` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_3` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_4` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_5` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_6` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_7` tinyint unsigned NOT NULL DEFAULT (0),
  `modul_8` tinyint unsigned NOT NULL DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `FK_mhs_mk_stts_mahasiswa` (`nim`),
  KEY `FK_mhs_mk_stts_mata_kuliah` (`id_mk`),
  CONSTRAINT `FK_mhs_mk_stts_mahasiswa` FOREIGN KEY (`nim`) REFERENCES `mahasiswa` (`nim`),
  CONSTRAINT `FK_mhs_mk_stts_mata_kuliah` FOREIGN KEY (`id_mk`) REFERENCES `mata_kuliah` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabel penghubung antara Mahasiswa, Status, dan Mata Kuliah';

-- Dumping data for table aslabanjing_testing.mhs_mk_stts: ~12 rows (approximately)
INSERT INTO `mhs_mk_stts` (`id`, `nim`, `id_mk`, `modul_1`, `modul_2`, `modul_3`, `modul_4`, `modul_5`, `modul_6`, `modul_7`, `modul_8`) VALUES
	(1, '0701256123', 1, 3, 0, 0, 0, 0, 0, 0, 0),
	(2, '0701212127', 2, 2, 1, 0, 0, 0, 0, 0, 0),
	(3, '0701256123', 2, 1, 3, 0, 0, 0, 0, 0, 0),
	(4, '0701212127', 1, 1, 2, 2, 0, 0, 0, 0, 0),
	(5, '0701212125', 8, 0, 0, 0, 0, 0, 0, 0, 0),
	(6, '0701212126', 3, 0, 0, 0, 0, 0, 0, 0, 0),
	(7, '0701212126', 2, 3, 1, 0, 0, 0, 0, 0, 0),
	(8, '0701212126', 1, 2, 1, 0, 0, 0, 0, 0, 0),
	(9, '0701256123', 4, 0, 0, 0, 0, 0, 0, 0, 0),
	(10, '0701212127', 5, 0, 0, 0, 0, 0, 0, 0, 0),
	(11, '0701212125', 5, 0, 0, 0, 0, 0, 0, 0, 0),
	(12, '0701212125', 6, 0, 0, 0, 0, 0, 0, 0, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
