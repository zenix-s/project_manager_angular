-- Script de creación de la base de datos
CREATE DATABASE IF NOT EXISTS `tfgsff_db`;

USE `tfgsff_db`;

-- Tabla de usuario
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL,
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
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

-- Tabla de invitación
CREATE TABLE IF NOT EXISTS `invitation` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `workspace_id` INT(11) NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `workspace_id` (`workspace_id`),
    CONSTRAINT `fk_invitation_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
);

-- Tabla de usuario-espacio de trabajo
CREATE TABLE IF NOT EXISTS `userWorkspace` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `workspace_id` INT(11) NOT NULL,
    `role` ENUM ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `workspace_id` (`workspace_id`),
    CONSTRAINT `fk_userWorkspace_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userWorkspace_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
);

-- Resto de las tablas
CREATE TABLE IF NOT EXISTS `task` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `workspace_id` INT(11) NOT NULL,
    `visibility` ENUM ('public', 'private') NOT NULL DEFAULT 'private',
		`deadline` DATETIME DEFAULT NULL,
		`completed` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`),
    KEY `workspace_id` (`workspace_id`),
    CONSTRAINT `fk_task_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `category` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `workspace_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `workspace_id` (`workspace_id`),
    CONSTRAINT `fk_category_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `team` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `workspace_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `workspace_id` (`workspace_id`),
    CONSTRAINT `fk_team_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `project` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `workspace_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `workspace_id` (`workspace_id`),
    CONSTRAINT `fk_project_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
);

CREATE TABLE IF NOT EXISTS `userTeam` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `team_id` INT(11) NOT NULL,
    `role` ENUM ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `team_id` (`team_id`),
    CONSTRAINT `fk_userTeam_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userTeam_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
);

CREATE TABLE IF NOT EXISTS `userProject` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `project_id` INT(11) NOT NULL,
    `role` ENUM ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `project_id` (`project_id`),
    CONSTRAINT `fk_userProject_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userProject_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
);

CREATE TABLE IF NOT EXISTS `userTask` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `task_id` INT(11) NOT NULL,
    `role` ENUM ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `task_id` (`task_id`),
    CONSTRAINT `fk_userTask_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_userTask_task` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`)
);

CREATE TABLE IF NOT EXISTS `teamTask` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `team_id` INT(11) NOT NULL,
    `task_id` INT(11) NOT NULL,
    `role` ENUM ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `team_id` (`team_id`),
    KEY `task_id` (`task_id`),
    CONSTRAINT `fk_teamTask_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
    CONSTRAINT `fk_teamTask_task` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`)
);


CREATE TABLE IF NOT EXISTS `teamProject` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`team_id` INT(11) NOT NULL,
	`project_id` INT(11) NOT NULL,
	`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
	`created_at` datetime NOT NULL,
	PRIMARY KEY (`id`),
	KEY `team_id` (`team_id`),
	KEY `project_id` (`project_id`),
	CONSTRAINT `teamProject_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
	CONSTRAINT `teamProject_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
);
CREATE TABLE IF NOT EXISTS `taskCategory` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`task_id` INT(11) NOT NULL,
		`category_id` INT(11) NOT NULL,
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `task_id` (`task_id`),
		KEY `category_id` (`category_id`),
		CONSTRAINT `taskCategory_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`),
		CONSTRAINT `taskCategory_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
	);
CREATE TABLE IF NOT EXISTS `taskProject` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`task_id` INT(11) NOT NULL,
		`project_id` INT(11) NOT NULL,
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `task_id` (`task_id`),
		KEY `project_id` (`project_id`),
		CONSTRAINT `taskProject_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`),
		CONSTRAINT `taskProject_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
	);