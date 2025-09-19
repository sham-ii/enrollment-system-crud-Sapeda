-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 19, 2025 at 11:57 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enroll_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `enrollment_tbl`
--

CREATE TABLE `enrollment_tbl` (
  `enroll_id` int NOT NULL,
  `stud_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `sem_id` int NOT NULL,
  `year_id` int NOT NULL,
  `enrollment_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `institute_tbl`
--

CREATE TABLE `institute_tbl` (
  `ins_id` int NOT NULL,
  `ins_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institute_tbl`
--

INSERT INTO `institute_tbl` (`ins_id`, `ins_name`) VALUES
(1, 'College of Engineering'),
(2, 'College of Information Technology'),
(3, 'College of Business'),
(4, 'College of Education'),
(5, 'College of Arts and Sciences'),
(6, 'College of Institute 6');

-- --------------------------------------------------------

--
-- Table structure for table `program_tbl`
--

CREATE TABLE `program_tbl` (
  `program_id` int NOT NULL,
  `program_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ins_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_tbl`
--

INSERT INTO `program_tbl` (`program_id`, `program_name`, `ins_id`) VALUES
(1, 'BS Civil Engineering', 1),
(2, 'BS Computer Science', 2),
(3, 'BS Information Systems', 2),
(4, 'BS Accountancy', 3),
(5, 'BSEd Major in Math', 4),
(6, 'BSTM', 6);

-- --------------------------------------------------------

--
-- Table structure for table `semester_tbl`
--

CREATE TABLE `semester_tbl` (
  `sem_id` int NOT NULL,
  `sem_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `year_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester_tbl`
--

INSERT INTO `semester_tbl` (`sem_id`, `sem_name`, `year_id`) VALUES
(1, '1st Semester', 1),
(2, '2nd Semester', 1),
(3, '1st Semester', 2),
(4, '2nd Semester', 2),
(5, 'Summer', 2),
(6, '6th Semester ', 3),
(7, '7th Semester ', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student_load`
--

CREATE TABLE `student_load` (
  `load_id` int NOT NULL,
  `stud_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_load`
--

INSERT INTO `student_load` (`load_id`, `stud_id`, `subject_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 1),
(5, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `student_tbl`
--

CREATE TABLE `student_tbl` (
  `stud_id` int NOT NULL,
  `last_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mid_init` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `program_id` int DEFAULT NULL,
  `allowance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_tbl`
--

INSERT INTO `student_tbl` (`stud_id`, `last_name`, `first_name`, `mid_init`, `program_id`, `allowance`) VALUES
(1, 'Fajardo', 'Janelle', 'M', 2, 5297),
(2, 'Gudani', 'Jhone Lhaiy', 'C', 1, 5742),
(3, 'Sapeda', 'Trisha Mae Angel', 'C', 3, 6452),
(4, 'Villanueva', 'Irish', 'A', 4, 4550),
(5, 'De Chavez', 'Pollene Joy', 'M', 5, 2198),
(6, 'Sapeda', 'Giveheart Kylle', 'C', 2, 5650),
(7, 'Divinagracia', 'John Matthew', 'C', 1, 5000),
(8, 'De Torrez', 'Neizel Skye', 'B', 3, 1720),
(9, 'Andal', 'Kassandra Crizel', 'C', 6, 1875),
(14, 'Ramos', 'Ma. Danielle', 'A', 2, 3456);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE `subject_tbl` (
  `subject_id` int NOT NULL,
  `subject_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sem_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`subject_id`, `subject_name`, `sem_id`) VALUES
(1, 'Introduction to Programming', 1),
(2, 'Data Structures', 2),
(3, 'Database Management', 3),
(4, 'Accounting Principles', 4),
(5, 'Educational Psychology', 5),
(13, 'Project Management', 7);

-- --------------------------------------------------------

--
-- Table structure for table `year_tbl`
--

CREATE TABLE `year_tbl` (
  `year_id` int NOT NULL,
  `year_from` int DEFAULT NULL,
  `year_to` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_tbl`
--

INSERT INTO `year_tbl` (`year_id`, `year_from`, `year_to`) VALUES
(1, 2022, 2024),
(2, 2024, 2025),
(3, 2025, 2026),
(4, 2026, 2027),
(5, 2027, 2028);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enrollment_tbl`
--
ALTER TABLE `enrollment_tbl`
  ADD PRIMARY KEY (`enroll_id`),
  ADD KEY `fk_student` (`stud_id`),
  ADD KEY `fk_subject` (`subject_id`),
  ADD KEY `fk_semester` (`sem_id`),
  ADD KEY `fk_year` (`year_id`);

--
-- Indexes for table `institute_tbl`
--
ALTER TABLE `institute_tbl`
  ADD PRIMARY KEY (`ins_id`);

--
-- Indexes for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `ins_id` (`ins_id`);

--
-- Indexes for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD PRIMARY KEY (`sem_id`),
  ADD KEY `year_id` (`year_id`);

--
-- Indexes for table `student_load`
--
ALTER TABLE `student_load`
  ADD PRIMARY KEY (`load_id`),
  ADD KEY `stud_id` (`stud_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD PRIMARY KEY (`stud_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `sem_id` (`sem_id`);

--
-- Indexes for table `year_tbl`
--
ALTER TABLE `year_tbl`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enrollment_tbl`
--
ALTER TABLE `enrollment_tbl`
  MODIFY `enroll_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_tbl`
--
ALTER TABLE `program_tbl`
  MODIFY `program_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  MODIFY `sem_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_tbl`
--
ALTER TABLE `student_tbl`
  MODIFY `stud_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  MODIFY `subject_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `year_tbl`
--
ALTER TABLE `year_tbl`
  MODIFY `year_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollment_tbl`
--
ALTER TABLE `enrollment_tbl`
  ADD CONSTRAINT `fk_semester` FOREIGN KEY (`sem_id`) REFERENCES `semester_tbl` (`sem_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_student` FOREIGN KEY (`stud_id`) REFERENCES `student_tbl` (`stud_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_year` FOREIGN KEY (`year_id`) REFERENCES `year_tbl` (`year_id`) ON DELETE CASCADE;

--
-- Constraints for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD CONSTRAINT `program_tbl_ibfk_1` FOREIGN KEY (`ins_id`) REFERENCES `institute_tbl` (`ins_id`);

--
-- Constraints for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD CONSTRAINT `semester_tbl_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_tbl` (`year_id`);

--
-- Constraints for table `student_load`
--
ALTER TABLE `student_load`
  ADD CONSTRAINT `student_load_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `student_tbl` (`stud_id`),
  ADD CONSTRAINT `student_load_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`);

--
-- Constraints for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD CONSTRAINT `student_tbl_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program_tbl` (`program_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
