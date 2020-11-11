-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 11 nov. 2020 à 09:49
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gest_magasinier`
--

-- --------------------------------------------------------

--
-- Structure de la table `magasinier`
--

CREATE TABLE `magasinier` (
  `id_mgsn` int(11) NOT NULL,
  `nom` varchar(15) NOT NULL,
  `prenom` varchar(15) NOT NULL,
  `salaire` int(20) NOT NULL,
  `age` int(5) NOT NULL,
  `tele` int(11) NOT NULL,
  `id_spct` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `magasinier`
--

INSERT INTO `magasinier` (`id_mgsn`, `nom`, `prenom`, `salaire`, `age`, `tele`, `id_spct`) VALUES
(2, 'mohammed', 'aassoul', 5400, 27, 672692545, 2),
(32, 'zakaria', 'saidi', 3400, 35, 653439837, 3),
(34, 'mehdi', 'bamhaoued', 7400, 28, 653343266, 3),
(35, 'mohammed', 'rouamchi', 7400, 24, 647635483, 5),
(37, 'chaimae', 'maaloum', 4500, 34, 645837649, 3),
(38, 'ahmad', 'massad', 5600, 44, 645873649, 4),
(41, 'hannane', 'amzil', 4500, 28, 637498736, 5);

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

CREATE TABLE `specialite` (
  `id_spct` int(11) NOT NULL,
  `spct` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`id_spct`, `spct`) VALUES
(1, 'Chauffeur'),
(2, 'Reception des M/ses'),
(3, 'Milieu industriel'),
(4, 'Gestion de stock'),
(5, 'Logistique interne');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'mustafa.idoufkir@gmail.com', '$2y$10$pMo5OwLu1qtfdlIynDdoHuWliYaoav4gKXjB2CAamiyFLJrZ1qc06'),
(3, 'admin@admin.com', '$2a$08$9aw0xvEYFdRm8ap0AjbN3O5cX2me2WODEhvmqtlPtKnB3/rWmRVga'),
(7, 'exemple@test.com', '$2a$08$OR1PePPOZY8a10BKETtR9ep9E3pr4NtEhYp4u8W/7YdH4x6czyHvm');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `magasinier`
--
ALTER TABLE `magasinier`
  ADD PRIMARY KEY (`id_mgsn`),
  ADD KEY `id_spct` (`id_spct`);

--
-- Index pour la table `specialite`
--
ALTER TABLE `specialite`
  ADD PRIMARY KEY (`id_spct`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `magasinier`
--
ALTER TABLE `magasinier`
  MODIFY `id_mgsn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `specialite`
--
ALTER TABLE `specialite`
  MODIFY `id_spct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `magasinier`
--
ALTER TABLE `magasinier`
  ADD CONSTRAINT `magasinier_ibfk_1` FOREIGN KEY (`id_spct`) REFERENCES `specialite` (`id_spct`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
