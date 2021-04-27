-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 27, 2021 at 06:41 AM
-- Server version: 10.3.25-MariaDB-0ubuntu0.20.04.1
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `Names` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `Names`) VALUES
(1, 'ArtaCorp1'),
(3, 'ArtaCorp2'),
(4, 'ArtaCorp3'),
(5, 'ArtaCorp3');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `id` int(11) NOT NULL,
  `Names` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`id`, `Names`) VALUES
(5, 'Matt'),
(9, 'Thomas'),
(16, 'pear'),
(17, 'thomas'),
(18, 'thomas'),
(19, 'thomas'),
(20, 'Arta'),
(21, 'Arta'),
(22, 'Hello World 123');

-- --------------------------------------------------------

--
-- Table structure for table `workingHours`
--

CREATE TABLE `workingHours` (
  `id` int(11) NOT NULL,
  `employeesid` int(11) NOT NULL,
  `Hours` double NOT NULL,
  `departmentid` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `workingHours`
--

INSERT INTO `workingHours` (`id`, `employeesid`, `Hours`, `departmentid`, `Date`) VALUES
(4, 21, 5, 5, '2021-04-25'),
(5, 21, 3, 5, '2021-04-24'),
(6, 21, 9, 5, '2021-04-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workingHours`
--
ALTER TABLE `workingHours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employeesid` (`employeesid`),
  ADD KEY `departmentid` (`departmentid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `workingHours`
--
ALTER TABLE `workingHours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `workingHours`
--
ALTER TABLE `workingHours`
  ADD CONSTRAINT `workingHours_ibfk_1` FOREIGN KEY (`employeesid`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `workingHours_ibfk_2` FOREIGN KEY (`departmentid`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
