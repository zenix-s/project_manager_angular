-- Script de creación de la base de datos
CREATE DATABASE IF NOT EXISTS `tfgsff_db`;

USE `tfgsff_db`;

-- Tabla de usuario
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `settings` JSON DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
);

-- Tabla de espacio de trabajo
CREATE TABLE IF NOT EXISTS `workspace` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

-- Tabla de invitación
CREATE TABLE IF NOT EXISTS `invitation` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `idWorkspace` INT(11) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idWorkspace` (`idWorkspace`),
    CONSTRAINT `fk_invitation_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
);

-- Tabla de usuario-espacio de trabajo
CREATE TABLE IF NOT EXISTS `userWorkspace` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `idUser` INT(11) NOT NULL,
    `idWorkspace` INT(11) NOT NULL,
    `role` ENUM ('ADMIN', 'MEMBER', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idUser` (`idUser`),
    KEY `idWorkspace` (`idWorkspace`),
    CONSTRAINT `fk_userWorkspace_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userWorkspace_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
);

-- Resto de las tablas
CREATE TABLE IF NOT EXISTS `task` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `idWorkspace` INT(11) NOT NULL,
    `visibility` ENUM ('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PRIVATE',
		`deadline` DATETIME DEFAULT NULL,
		`completed` BOOLEAN NOT NULL DEFAULT FALSE,
		`priority` ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'NONE',
    PRIMARY KEY (`id`),
    KEY `idWorkspace` (`idWorkspace`),
    CONSTRAINT `fk_task_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `category` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `idWorkspace` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idWorkspace` (`idWorkspace`),
    CONSTRAINT `fk_category_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `team` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `idWorkspace` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idWorkspace` (`idWorkspace`),
    CONSTRAINT `fk_team_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `userTeam` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `idUser` INT(11) NOT NULL,
    `idTeam` INT(11) NOT NULL,
    `role` ENUM ('ADMIN', 'MEMEBER', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idUser` (`idUser`),
    KEY `idTeam` (`idTeam`),
    CONSTRAINT `fk_userTeam_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userTeam_team` FOREIGN KEY (`idTeam`) REFERENCES `team` (`id`)
);



CREATE TABLE IF NOT EXISTS `userTask` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `idUser` INT(11) NOT NULL,
    `idTask` INT(11) NOT NULL,
    `role` ENUM ('ADMIN', 'MEMBER', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idUser` (`idUser`),
    KEY `idTask` (`idTask`),
    CONSTRAINT `fk_userTask_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userTask_task` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`)
);

CREATE TABLE IF NOT EXISTS `teamTask` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `idTeam` INT(11) NOT NULL,
    `idTask` INT(11) NOT NULL,
    `role` ENUM ('ADMIN', 'MEMBER', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idTeam` (`idTeam`),
    KEY `idTask` (`idTask`),
    CONSTRAINT `fk_teamTask_team` FOREIGN KEY (`idTeam`) REFERENCES `team` (`id`),
    CONSTRAINT `fk_teamTask_task` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`)
);



CREATE TABLE IF NOT EXISTS `taskCategory` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`idTask` INT(11) NOT NULL,
		`idCategory` INT(11) NOT NULL,
		`createdAt` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `idTask` (`idTask`),
		KEY `idCategory` (`idCategory`),
		CONSTRAINT `taskCategory_ibfk_1` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`),
		CONSTRAINT `taskCategory_ibfk_2` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`)
	);