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


-- Dumping database structure for practical-report
CREATE DATABASE IF NOT EXISTS `practical-report` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `practical-report`;

-- Dumping structure for table practical-report.aslab
CREATE TABLE IF NOT EXISTS `aslab` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Meyimpan data asisten lab';

-- Dumping data for table practical-report.aslab: ~0 rows (approximately)

-- Dumping structure for table practical-report.dosen
CREATE TABLE IF NOT EXISTS `dosen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=501 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan dosen yang aktif mengajar mata kuliah praktikum';

-- Dumping data for table practical-report.dosen: ~0 rows (approximately)

-- Dumping structure for table practical-report.laboran
CREATE TABLE IF NOT EXISTS `laboran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `nim` varchar(10) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan data laboran';

-- Dumping data for table practical-report.laboran: ~0 rows (approximately)

-- Dumping structure for table practical-report.mahasiswa
CREATE TABLE IF NOT EXISTS `mahasiswa` (
  `nim` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `nama` varchar(255) DEFAULT NULL,
  `stambuk` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan seluruh mahasiswa yang aktif dalam mata kuliah praktikum';

-- Dumping data for table practical-report.mahasiswa: ~0 rows (approximately)

-- Dumping structure for table practical-report.mata_kuliah
CREATE TABLE IF NOT EXISTS `mata_kuliah` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `semester` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kelas` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_dosen` int NOT NULL,
  `id_aslab` int NOT NULL,
  `id_laboran` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_mata_kuliah_dosen` (`id_dosen`),
  KEY `FK_mata_kuliah_aslab` (`id_aslab`),
  KEY `FK_mata_kuliah_laboran` (`id_laboran`),
  CONSTRAINT `FK_mata_kuliah_aslab` FOREIGN KEY (`id_aslab`) REFERENCES `aslab` (`id`),
  CONSTRAINT `FK_mata_kuliah_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id`),
  CONSTRAINT `FK_mata_kuliah_laboran` FOREIGN KEY (`id_laboran`) REFERENCES `laboran` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Menyimpan semua mata kuliah praktikum yang sedang aktif';

-- Dumping data for table practical-report.mata_kuliah: ~0 rows (approximately)

-- Dumping structure for table practical-report.mhs_mk_stts
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabel penghubung antara Mahasiswa, Status, dan Mata Kuliah';

-- Dumping data for table practical-report.mhs_mk_stts: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
