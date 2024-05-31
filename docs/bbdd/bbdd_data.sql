-- Inserta datos en la tabla `user`
INSERT INTO
	`user` (
		`id`,
		`username`,
		`password`,
		`email`,
		`createdAt`,
		`settings`
	)
VALUES
	(
		1,
		'admin',
		'password1',
		'admin@mail.com',
		'2021-06-01 00:00:00',
		NULL
	),
	(
		2,
		'user1',
		'password2',
		'user1@mail.com',
		'2021-06-01 00:00:00',
		NULL
	);

-- Inserta datos en la tabla `workspace`
INSERT INTO
	`workspace` (`id`, `name`, `description`, `createdAt`)
VALUES
	(
		1,
		'Desarrollo Web',
		'Proyecto de desarrollo web',
		'2021-06-01 00:00:00'
	),
	(
		2,
		'Todo Personal',
		'Lista de tareas diarias personales',
		'2021-06-01 00:00:00'
	);

-- Inserta datos en la tabla `category`
INSERT INTO
	`category` (
		`id`,
		`name`,
		`description`,
		`idWorkspace`,
		`color`,
		`completed`
	)
VALUES
	(
		1,
		'Frontend',
		'Tareas relacionadas con el frontend',
		1,
		'#FF5733',
		FALSE
	),
	(
		2,
		'Backend',
		'Tareas relacionadas con el backend',
		1,
		'#33FF57',
		FALSE
	),
	(
		3,
		'Compras',
		'Tareas de compras personales',
		2,
		'#3357FF',
		FALSE
	),
	(
		4,
		'Salud',
		'Tareas relacionadas con la salud personal',
		2,
		'#FF33A1',
		FALSE
	);

-- Inserta datos en la tabla `task`
INSERT INTO
	`task` (
		`id`,
		`name`,
		`description`,
		`createdAt`,
		`idWorkspace`,
		`visibility`,
		`deadline`,
		`completed`,
		`priority`,
		`dependentIdTask`,
		`deleted`
	)
VALUES
	(
		1,
		'Diseñar el landing page',
		'Crear el diseño inicial del landing page',
		'2021-06-01 00:00:00',
		1,
		'PUBLIC',
		'2021-07-01 00:00:00',
		FALSE,
		'HIGH',
		NULL,
		FALSE
	),
	(
		2,
		'Configurar base de datos',
		'Configurar la base de datos inicial',
		'2021-06-01 00:00:00',
		1,
		'PRIVATE',
		'2021-06-15 00:00:00',
		FALSE,
		'MEDIUM',
		NULL,
		FALSE
	),
	(
		3,
		'Comprar comestibles',
		'Comprar leche, pan y frutas',
		'2021-06-01 00:00:00',
		2,
		'PUBLIC',
		'2021-06-05 00:00:00',
		FALSE,
		'LOW',
		NULL,
		FALSE
	),
	(
		4,
		'Hacer ejercicio',
		'Correr 5 km en el parque',
		'2021-06-01 00:00:00',
		2,
		'PRIVATE',
		'2021-06-01 00:00:00',
		FALSE,
		'MEDIUM',
		NULL,
		FALSE
	),
	(
		5,
		'Implementar landing page',
		'Convertir el diseño del landing page en código HTML/CSS',
		'2021-06-02 00:00:00',
		1,
		'PUBLIC',
		'2021-07-05 00:00:00',
		FALSE,
		'HIGH',
		1,
		FALSE
	),
	(
		6,
		'Revisar y ajustar el diseño',
		'Revisar el diseño implementado y hacer ajustes necesarios',
		'2021-06-03 00:00:00',
		1,
		'PRIVATE',
		'2021-07-10 00:00:00',
		FALSE,
		'MEDIUM',
		1,
		FALSE
	);

-- Inserta datos en la tabla `userWorkspace`
INSERT INTO
	`userWorkspace` (`id`, `idUser`, `idWorkspace`, `role`, `deleted`)
VALUES
	(1, 1, 1, 'ADMIN', 0),
	(2, 1, 2, 'ADMIN', 0);

-- Inserta datos en la tabla `taskCategory`
INSERT INTO
	`taskCategory` (`id`, `idTask`, `idCategory`)
VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 3, 3),
	(4, 4, 4),
	(5, 5, 1),
	(6, 6, 1);

COMMIT;