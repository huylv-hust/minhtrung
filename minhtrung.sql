-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 17, 2018 lúc 11:37 AM
-- Phiên bản máy phục vụ: 10.1.26-MariaDB
-- Phiên bản PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `minhtrung`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cmt` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `person` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `name`, `cmt`, `birthday`, `address`, `phone`, `email`, `person`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Nhung', '142549079', '2018-06-11', 'Hà Nội', '0984787652', 'nhungnguyen@gmail.com', 'Huy', 1, '2018-06-11 11:18:52', '2018-06-11 11:34:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `item_info` varchar(255) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `real_price` int(10) DEFAULT NULL,
  `interest` int(10) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `money` varchar(10) DEFAULT NULL,
  `pay_date` text,
  `type` int(4) DEFAULT NULL,
  `status` int(4) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `cus_id`, `item`, `item_info`, `price`, `real_price`, `interest`, `end_date`, `money`, `pay_date`, `type`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'SH', 'SH i150', 200000000, NULL, 3000, '2018-07-22', '203000000', NULL, 1, 0, '2018-07-17 09:35:50', '2018-07-17 09:35:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '0',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `address`, `phone`, `email`, `role`, `status`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jesse Mon', '', '0984787652', 'levanhuy93@gmail.com', 2, 1, '$2y$10$Z5Sz8.AaHjxQ/93tLTEQjuH6A1UoVTTVGD7VLApqPBxQswybZlYEi', 'gRq7p7zeAeWOfwh5bwG9T4O1OSzD7PZh05vJYu7BFy5qJWLnIQ8yJUE5g2S9', '2018-05-14 01:25:57', '2018-06-11 04:33:52'),
(2, 'Ngọc', '', '0', 'ngocnguyen@gmail.com', 1, 1, '$2y$10$Z5Sz8.AaHjxQ/93tLTEQjuH6A1UoVTTVGD7VLApqPBxQswybZlYEi', 'dyxvsDZNcxsBHWNvJXXasaW0bhnBlYoXx3LD4MVPvA8zNDydGXorH96JCgaa', '2018-06-06 17:00:00', '2018-06-07 20:01:48'),
(3, 'Huyền H', 'Hà Nội', '984787652', 'minhhuyen@gmail.com', 1, 1, '$2y$10$BbFSqfCA09iugvG1XPWwbe7Po7PoSMC8Bslnsn/v480Zdd7QKQ3Ke', 'bUXNl2DgRbV4o2sc7rtUueMA57y6wKzDDGHVbIBQr4Ki7HWLQMFnRt0AGwFK', '2018-06-08 03:40:53', '2018-06-11 01:02:20');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
