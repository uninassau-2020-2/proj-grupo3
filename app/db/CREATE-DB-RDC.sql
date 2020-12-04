-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Dez-2020 às 00:06
-- Versão do servidor: 10.4.10-MariaDB
-- versão do PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rdc`
--
CREATE DATABASE IF NOT EXISTS `rdc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rdc`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_img_profile` varchar(255) DEFAULT NULL,
  `user_type_profile` varchar(45) NOT NULL,
  `user_status` varchar(45) NOT NULL,
  `tbl_usercol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_pass`, `user_img_profile`, `user_type_profile`, `user_status`) VALUES
(1, 'Neylor Cesar', 'neylor@neysoft.com.br', '(81)0000-0000', '1q2w3e4r', 'neylor.png', 'ADMIN', 'A'),
(2, 'Douglas Henrique', 'douglas@gmail.com', '(81)00000-0000', '1q2w3e4r', 'douglas.jpg', 'ADMIN', 'A'),
(3, 'Maurílio Cunha', 'maurilio@gmail.com', '(81)00000-0000', '1q2w3e4r', 'maurilio.jpg', 'ADMIN', 'I'),
(4, 'Augusto Sergio', 'augusto@gmail.com', '(81)00000-0000', '1q2w3e4r', 'augusto.jpg', 'ADMIN', 'A');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
