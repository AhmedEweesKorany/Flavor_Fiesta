-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 18, 2024 at 07:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flavor_fiesta`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipes_id` int(4) NOT NULL,
  `recipes_title` varchar(255) NOT NULL,
  `recipes_description` varchar(1024) NOT NULL,
  `recipes_image` varchar(1024) NOT NULL,
  `recipes_cookingtime` int(3) NOT NULL,
  `recipes_calories` int(4) NOT NULL,
  `recipes_ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipes_ingredients`)),
  `recipes_cookingInstructions` varchar(2046) NOT NULL,
  `recipes_rate` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipes_id`, `recipes_title`, `recipes_description`, `recipes_image`, `recipes_cookingtime`, `recipes_calories`, `recipes_ingredients`, `recipes_cookingInstructions`, `recipes_rate`) VALUES
(1, 'Tandoori Chicken', 'Tandoori Chicken is a delicious and popular Indian dish that has gained international acclaim for its flavorful and aromatic characteristics. This dish is a traditional part of Indian cuisine and is loved by food enthusiasts worldwide. The preparation of Tandoori Chicken involves marinating chicken pieces in a blend of yogurt and a plethora of spices, including cumin, coriander, turmeric, paprika, garlic, ginger, and chili powder.', 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1080&dpr=1', 30, 3858, '[\"1/8 teaspoon saffron powder, or 1/4 teaspoon saffron threads\",\"1 tablespoon boiling water\",\"4 skinless chicken thighs\",\"4 skinless chicken legs\",\"3/4 teaspoon coarse salt\",\"1 teaspoon ground cumin\",\"1 teaspoon ground coriander\",\"1 teaspoon ground cinnamon\",\"1/2 teaspoon paprika (I used pimente d\'Espelette)\",\"1/2 teaspoon turmeric\",\"1 to 1 1/2 teaspoons chili powder, depending on how hot you want it\",\"10 turns fresh ground black pepper\",\"1 cup whole milk plain yogurt\",\"juice of one fresh lime\",\"1 tablespoon finely-minced fresh ginger\",\"2 cloves garlic, peeled and finely minced\"]', '[\"In a small bowl, mix saffron powder (or saffron threads) with boiling water and let it steep for 5 minutes.\",\"In a large mixing bowl, combine the chicken thighs and legs with all the dry spices and yogurt.\",\"Add the saffron mixture, lime juice, minced ginger, and garlic to the bowl and mix well to coat the chicken evenly.\",\"Cover the bowl with plastic wrap and let the chicken marinate in the refrigerator for at least 2 hours, preferably overnight.\",\"Preheat the oven to 450°F (230°C).\",\"Place the marinated chicken on a baking tray and bake for 20-25 minutes or until the chicken is fully cooked and slightly charred.\",\"Serve hot with naan or rice and your favorite chutney.\"]', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(2555) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(2, 'ahmed', 'ewe@gmail.com', '12345', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipes_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipes_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
