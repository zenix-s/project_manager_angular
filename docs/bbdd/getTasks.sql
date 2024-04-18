-- -- Tabla de usuario
-- CREATE TABLE IF NOT EXISTS `user` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `username` VARCHAR(50) NOT NULL, `password` VARCHAR(255) NOT NULL, `email` VARCHAR(100) NOT NULL, `createdAt` DATETIME NOT NULL, `settings` JSON DEFAULT NULL, `deleted` BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY (`id`), UNIQUE KEY `username` (`username`), UNIQUE KEY `email` (`email`)
-- );
-- -- Tabla de espacio de trabajo
-- CREATE TABLE IF NOT EXISTS `workspace` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `description` VARCHAR(255) DEFAULT NULL, `createdAt` DATETIME NOT NULL, `deleted` BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY (`id`)
-- );
-- -- Tabla de invitación
-- CREATE TABLE IF NOT EXISTS `invitation` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `email` VARCHAR(100) NOT NULL, `idWorkspace` INT(11) NOT NULL, `createdAt` DATETIME NOT NULL, `deleted` BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY (`id`), KEY `idWorkspace` (`idWorkspace`), CONSTRAINT `fk_invitation_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
-- );
-- -- Tabla de usuario-espacio de trabajo
-- CREATE TABLE IF NOT EXISTS `userWorkspace` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `idUser` INT(11) NOT NULL, `idWorkspace` INT(11) NOT NULL, `role` ENUM('ADMIN', 'MEMBER', 'GUEST') NOT NULL DEFAULT 'GUEST', `createdAt` DATETIME NOT NULL, PRIMARY KEY (`id`), KEY `idUser` (`idUser`), KEY `idWorkspace` (`idWorkspace`), CONSTRAINT `fk_userWorkspace_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`), CONSTRAINT `fk_userWorkspace_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
-- );
-- -- Resto de las tablas
-- CREATE TABLE IF NOT EXISTS `task` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `description` VARCHAR(255) DEFAULT NULL, `createdAt` DATETIME NOT NULL, `idWorkspace` INT(11) NOT NULL, `visibility` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PRIVATE', `deadline` DATETIME DEFAULT NULL, `completed` BOOLEAN NOT NULL DEFAULT FALSE, `priority` ENUM(
--         'NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
--     ) NOT NULL DEFAULT 'NONE', `dependentIdTask` INT(11) DEFAULT NULL, `deleted` BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY (`id`), KEY `idWorkspace` (`idWorkspace`), CONSTRAINT `fk_task_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`), CONSTRAINT `fk_task_task` FOREIGN KEY (`dependentIdTask`) REFERENCES `task` (`id`)
-- );
-- CREATE TABLE IF NOT EXISTS `category` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `description` VARCHAR(255) DEFAULT NULL, `createdAt` DATETIME NOT NULL, `idWorkspace` INT(11) NOT NULL, `color` VARCHAR(7) DEFAULT NULL, `completed` BOOLEAN NOT NULL DEFAULT FALSE, `deleted` BOOLEAN NOT NULL DEFAULT FALSE, PRIMARY KEY (`id`), KEY `idWorkspace` (`idWorkspace`), CONSTRAINT `fk_category_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`)
-- );
-- CREATE TABLE IF NOT EXISTS `userTask` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `idUser` INT(11) NOT NULL, `idTask` INT(11) NOT NULL, `role` ENUM('ADMIN', 'MEMBER', 'GUEST') NOT NULL DEFAULT 'GUEST', `createdAt` DATETIME NOT NULL, PRIMARY KEY (`id`), KEY `idUser` (`idUser`), KEY `idTask` (`idTask`), CONSTRAINT `fk_userTask_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`), CONSTRAINT `fk_userTask_task` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`)
-- );
-- CREATE TABLE IF NOT EXISTS `taskCategory` (
--     `id` INT(11) NOT NULL AUTO_INCREMENT, `idTask` INT(11) NOT NULL, `idCategory` INT(11) NOT NULL, `createdAt` datetime NOT NULL, PRIMARY KEY (`id`), KEY `idTask` (`idTask`), KEY `idCategory` (`idCategory`), CONSTRAINT `taskCategory_ibfk_1` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`), CONSTRAINT `taskCategory_ibfk_2` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`)
-- );
SELECT
	t.id,
	t.name,
	t.createdAt,
	t.idWorkspace,
	t.description,
	t.completed,
	t.deadline,
	t.priority,
	t.visibility,
	t.dependentIdTask,
	CONCAT(
		'[',
		CASE
			WHEN COUNT(c.id) > 0 THEN GROUP_CONCAT(
				JSON_OBJECT(
					'id',
					c.id,
					'name',
					c.name,
					'description',
					c.description,
					'color',
					c.color,
					'completed',
					c.completed,
					'idWorkspace',
					c.idWorkspace
				)
				ORDER BY
					c.id
			)
			ELSE ''
		END,
		']'
	) AS categories,
	-- array of tasks that depend on this task
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id',
			t2.id,
			'name',
			t2.name,
			'description',
			t2.description,
			'createdAt',
			t2.createdAt,
			'completed',
			t2.completed,
			'deadline',
			t2.deadline,
			'priority',
			t2.priority,
			'visibility',
			t2.visibility,
			'dependentIdTask',
			t2.dependentIdTask
		)
	) AS dependentTasks
FROM
	task t
	LEFT JOIN taskCategory tc ON t.id = tc.idTask
	LEFT JOIN category c ON tc.idCategory = c.id
	LEFT JOIN task t2 ON t2.dependentIdTask = t.id
WHERE
	t.id = 1
	AND t.deleted = 0
	AND t2.deleted = 0
	AND t.`dependentIdTask` IS NULL
	AND t2.`dependentIdTask` IS NOT NULL
GROUP BY
	t.id,
	t.name