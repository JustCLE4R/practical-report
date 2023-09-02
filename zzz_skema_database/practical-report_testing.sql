-- --------------------------------------------------------
-- Host:                         192.168.1.1
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


-- Dumping database structure for practical-report_testing
CREATE DATABASE IF NOT EXISTS `practical-report_testing` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `practical-report_testing`;

-- Dumping structure for table practical-report_testing.aslab
CREATE TABLE IF NOT EXISTS `aslab` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `notel` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `motto` varchar(255) DEFAULT NULL,
  `instagram` varchar(20) DEFAULT NULL,
  `facebook` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Meyimpan data asisten lab';

-- Dumping data for table practical-report_testing.aslab: ~9 rows (approximately)
INSERT INTO `aslab` (`id`, `nama`, `nim`, `username`, `password`, `notel`, `motto`, `instagram`, `facebook`) VALUES
	(1, 'Dimas Yudistira', '0701213127', 'z6ro99', '$2a$10$uTU.yku5fqYCswq08cHyzeE/YKS5UZJXu5Di8cfObVIQVnAlhIVRW', NULL, NULL, NULL, NULL),
	(2, 'Sabirin Kosong', '0701234567', 'sabirin', '$2a$12$x/Bz0zuGbcL4c1odIbk3GO2n07EOiF.V8LAGhHuCYHrnjJNBoQAA2', NULL, NULL, NULL, NULL),
	(3, 'KTB', '6969420', 'ktb', NULL, NULL, NULL, NULL, NULL),
	(4, 'Sultan Azka', '123', 'sult4n', NULL, NULL, NULL, NULL, NULL),
	(5, 'Paris Alvito', '321', NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 'Bintang Hutagalang', '333', 'ShootingStar', '$2a$15$qnRwdVBYBiUGHSXlR2ltWeHEqFloIAr6tL1I7.yK3dmjnfdrquzUu', NULL, NULL, NULL, NULL),
	(19, 'Anissa Arya', '0706969420', 'arya237', '$2b$15$4gW.2IvlenwcVSknLgQMTeVoPXVIEpILnzgUt6liBu4s1645xzRgK', NULL, NULL, NULL, NULL),
	(24, 'test', '123', 'test', '$2b$15$nA4nHwxGy48FuSLPAS4eV.y6poB2k3OFADV1h/h9FpJOBl6ss59.y', NULL, NULL, NULL, NULL),
	(25, 'Ira Rivera', '070170303', 'ira_rivera17', '$2b$15$a6Rom4WoxVzBactZ/M9GhenC8pC52jpZ3XoxVHLgAzGL7V184RKkS', NULL, NULL, NULL, NULL);

-- Dumping structure for table practical-report_testing.dosen
CREATE TABLE IF NOT EXISTS `dosen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nip` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'not set',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'not set',
  `notel` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `motto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `instagram` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `facebook` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan dosen yang aktif mengajar mata kuliah praktikum';

-- Dumping data for table practical-report_testing.dosen: ~5 rows (approximately)
INSERT INTO `dosen` (`id`, `nama`, `nip`, `username`, `password`, `notel`, `motto`, `instagram`, `facebook`) VALUES
	(1, 'Pak Algo', '', 'algo1', '$2a$12$.zyjriKYNAuQYbp09yma8eA4IhnU6WcPipw4PTE84B42r2mdTYSG.', NULL, NULL, NULL, NULL),
	(2, 'Pak Pancasila', '', ' ', '', NULL, NULL, NULL, NULL),
	(3, 'Pak Database', '', ' ', '', NULL, NULL, NULL, NULL),
	(4, 'Pak Bahasa', '', ' ', '', NULL, NULL, NULL, NULL),
	(5, 'Pak Filsafat', '', '', '', NULL, NULL, NULL, NULL),
	(6, 'Pak Arman', '2342', 'not set', 'not set', NULL, NULL, NULL, NULL);

-- Dumping structure for table practical-report_testing.laboran
CREATE TABLE IF NOT EXISTS `laboran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `nim` varchar(10) DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `notel` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `motto` varchar(255) DEFAULT NULL,
  `instagram` varchar(20) DEFAULT NULL,
  `facebook` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan data laboran';

-- Dumping data for table practical-report_testing.laboran: ~2 rows (approximately)
INSERT INTO `laboran` (`id`, `nama`, `nim`, `username`, `password`, `notel`, `motto`, `instagram`, `facebook`) VALUES
	(1, 'Luthfi', '0701245120', 'luthfi', '$2a$10$hynlIurfM3tEgasRkeV4/upvj2yAAwj4ByCAo87zRtWu.72sGlXTS', NULL, NULL, NULL, NULL),
	(2, 'Fahri', '0709887654', 'fahri', '$2a$10$K/dBidkAlJbEZyC20Jcmze6wlyCaLqYuwMZsCUhiTzy/PUodq5lu2', NULL, NULL, NULL, NULL);

-- Dumping structure for table practical-report_testing.mahasiswa
CREATE TABLE IF NOT EXISTS `mahasiswa` (
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `nama` varchar(255) DEFAULT NULL,
  `stambuk` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan seluruh mahasiswa yang aktif dalam mata kuliah praktikum';

-- Dumping data for table practical-report_testing.mahasiswa: ~9 rows (approximately)
INSERT INTO `mahasiswa` (`nim`, `nama`, `stambuk`) VALUES
	('0221411331', 'Ardancok', 2022),
	('0701212124', 'levy putri kasmari', 2022),
	('0701212125', 'wiranto prasetya', 2021),
	('0701212126', 'bagas wijaya', 2019),
	('0701212127', 'dina claudia', 2021),
	('0701212128', 'bambang pratama', 2021),
	('0701256122', 'claudius claudianus', 2020),
	('0701256123', 'citra audie', 2020),
	('0706969420', 'Depsy Throty', 2069),
	('0706969698', 'Buk Ria', 2019),
	('0709898987', 'Ali Imran', 2023);

-- Dumping structure for table practical-report_testing.mata_kuliah
CREATE TABLE IF NOT EXISTS `mata_kuliah` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
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

-- Dumping data for table practical-report_testing.mata_kuliah: ~8 rows (approximately)
INSERT INTO `mata_kuliah` (`id`, `nama`, `semester`, `kelas`, `id_dosen`, `id_laboran`, `id_aslab`) VALUES
	(1, 'Pemrograman Dasar', '6', 'IK-1', 1, 2, 1),
	(2, 'Pancasila', '4', 'IK-3', 2, 1, 2),
	(3, 'Basis Data', '3', 'IK-1', 3, 2, 4),
	(4, 'Pemrograman Dasar 2', '7', 'IK-2', 1, 2, 1),
	(5, 'Mitigasi Bencana', '4', 'IK-5', 2, 1, 6),
	(6, 'Bahasa Inggris', '2', 'IK-3', 4, 1, 3),
	(7, 'Pemrograman Dasar', '6', 'IK-2', 1, 1, 5),
	(8, 'Pancasila', '4', 'IK-2', 2, 1, 2);

-- Dumping structure for table practical-report_testing.mhs_mk_stts
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabel penghubung antara Mahasiswa, Status, dan Mata Kuliah';

-- Dumping data for table practical-report_testing.mhs_mk_stts: ~11 rows (approximately)
INSERT INTO `mhs_mk_stts` (`id`, `nim`, `id_mk`, `modul_1`, `modul_2`, `modul_3`, `modul_4`, `modul_5`, `modul_6`, `modul_7`, `modul_8`) VALUES
	(1, '0701256123', 3, 3, 0, 0, 0, 0, 0, 0, 0),
	(2, '0701212127', 4, 2, 1, 0, 0, 2, 0, 0, 0),
	(3, '0701256123', 2, 1, 3, 0, 0, 0, 0, 0, 0),
	(4, '0701212127', 1, 2, 1, 0, 0, 1, 0, 0, 0),
	(5, '0701212125', 8, 0, 0, 0, 0, 0, 0, 0, 0),
	(6, '0701212126', 3, 0, 0, 0, 0, 0, 2, 0, 2),
	(7, '0701212126', 4, 0, 1, 0, 0, 0, 0, 1, 0),
	(8, '0701212126', 1, 2, 1, 0, 0, 0, 0, 0, 2),
	(9, '0701256123', 4, 0, 0, 0, 0, 0, 0, 0, 0),
	(10, '0701212127', 5, 2, 2, 1, 1, 0, 0, 0, 0),
	(11, '0701212125', 5, 2, 2, 2, 2, 1, 0, 1, 0),
	(12, '0701212125', 6, 0, 0, 0, 0, 0, 0, 0, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
