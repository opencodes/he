-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 21, 2013 at 05:31 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `monthly_expense`
--

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE IF NOT EXISTS `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `payment_mode` enum('credit_card','debit_card','cash') NOT NULL DEFAULT 'credit_card',
  `note` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `device_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`id`, `amount`, `payment_mode`, `note`, `date`, `device_id`) VALUES
(1, 770, 'credit_card', 'movie ticket', '2013-06-20 23:19:00', ''),
(2, 770, 'debit_card', 'movie ticket', '2013-06-20 23:19:00', ''),
(3, 770, 'cash', 'movie ticket', '2013-06-20 23:19:00', ''),
(4, 200, 'credit_card', 'sa sdssa sdsad', '2013-06-21 08:16:06', '1221dqwe12e1');
