-- database creation script
CREATE DATABASE IF NOT EXISTS `tfgsff_db` USE `tfgsff_db`;

CREATE TABLE
	IF NOT EXISTS `user` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`username` varchar(50) NOT NULL,
		`password` varchar(255) NOT NULL,
		`email` varchar(100) NOT NULL,
		`created_at` datetime NOT NULL,
		`settings` json DEFAULT NULL,
		PRIMARY KEY (`id`),
		UNIQUE KEY `username` (`username`),
		UNIQUE KEY `email` (`email`)
	)
CREATE TABLE
	IF NOT EXISTS `workspace` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`name` varchar(50) NOT NULL,
		`description` varchar(255) DEFAULT NULL,
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
	)
CREATE TABLE
	IF NOT EXISTS `invitation` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`email` varchar(100) NOT NULL,
		`workspace_id` int (11) NOT NULL,
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `workspace_id` (`workspace_id`),
		CONSTRAINT `invitation_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `userWorkspace` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`user_id` int (11) NOT NULL,
		`workspace_id` int (11) NOT NULL,
		`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `user_id` (`user_id`),
		KEY `workspace_id` (`workspace_id`),
		CONSTRAINT `userWorkspace_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
		CONSTRAINT `userWorkspace_ibfk_2` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `task` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`name` varchar(50) NOT NULL,
		`description` varchar(255) DEFAULT NULL,
		`created_at` datetime NOT NULL,
		`workspace_id` int (11) NOT NULL,
		`visibility` enum ('public', `private`) NOT NULL DEFAULT 'private',
		PRIMARY KEY (`id`),
		KEY `workspace_id` (`workspace_id`),
		CONSTRAINT `task_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `category` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`name` varchar(50) NOT NULL,
		`description` varchar(255) DEFAULT NULL,
		`created_at` datetime NOT NULL,
		`workspace_id` int (11) NOT NULL,
		PRIMARY KEY (`id`),
		KEY `workspace_id` (`workspace_id`),
		CONSTRAINT `category_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `team` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`name` varchar(50) NOT NULL,
		`description` varchar(255) DEFAULT NULL,
		`created_at` datetime NOT NULL,
		`workspace_id` int (11) NOT NULL,
		PRIMARY KEY (`id`),
		KEY `workspace_id` (`workspace_id`),
		CONSTRAINT `team_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `project` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`name` varchar(50) NOT NULL,
		`description` varchar(255) DEFAULT NULL,
		`created_at` datetime NOT NULL,
		`workspace_id` int (11) NOT NULL,
		PRIMARY KEY (`id`),
		KEY `workspace_id` (`workspace_id`),
		CONSTRAINT `project_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `userTeam` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`user_id` int (11) NOT NULL,
		`team_id` int (11) NOT NULL,
		`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `user_id` (`user_id`),
		KEY `team_id` (`team_id`),
		CONSTRAINT `userTeam_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
		CONSTRAINT `userTeam_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `userProject` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`user_id` int (11) NOT NULL,
		`project_id` int (11) NOT NULL,
		`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `user_id` (`user_id`),
		KEY `project_id` (`project_id`),
		CONSTRAINT `userProject_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
		CONSTRAINT `userProject_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `userTask` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`user_id` int (11) NOT NULL,
		`task_id` int (11) NOT NULL,
		`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `user_id` (`user_id`),
		KEY `task_id` (`task_id`),
		CONSTRAINT `userTask_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
		CONSTRAINT `userTask_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `teamTask` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`team_id` int (11) NOT NULL,
		`task_id` int (11) NOT NULL,
		`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `team_id` (`team_id`),
		KEY `task_id` (`task_id`),
		CONSTRAINT `teamTask_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
		CONSTRAINT `teamTask_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `teamProject` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`team_id` int (11) NOT NULL,
		`project_id` int (11) NOT NULL,
		`role` enum ('admin', 'member', 'guest') NOT NULL DEFAULT 'guest',
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `team_id` (`team_id`),
		KEY `project_id` (`project_id`),
		CONSTRAINT `teamProject_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
		CONSTRAINT `teamProject_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `taskCategory` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`task_id` int (11) NOT NULL,
		`category_id` int (11) NOT NULL,
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `task_id` (`task_id`),
		KEY `category_id` (`category_id`),
		CONSTRAINT `taskCategory_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`),
		CONSTRAINT `taskCategory_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
	)
CREATE TABLE
	IF NOT EXISTS `taskProject` (
		`id` int (11) NOT NULL AUTO_INCREMENT,
		`task_id` int (11) NOT NULL,
		`project_id` int (11) NOT NULL,
		`created_at` datetime NOT NULL,
		PRIMARY KEY (`id`),
		KEY `task_id` (`task_id`),
		KEY `project_id` (`project_id`),
		CONSTRAINT `taskProject_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`),
		CONSTRAINT `taskProject_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
	)