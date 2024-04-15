INSERT INTO `user` (`id`, `username`, `password`, `email`, `createdAt`, `settings`) VALUES
(1, 'admin', 'password1', 'admin@mail.com', '2021-06-01 00:00:00', NULL),
(2, 'user1', 'password2', 'user1@mail.com', '2021-06-01 00:00:00', NULL);

INSERT INTO `workspace` (`id`, `name`, `description`, `createdAt`) VALUES
(1, 'Workspace 1', 'Description of workspace 1', '2021-06-01 00:00:00'),
(2, 'Workspace 2', 'Description of workspace 2', '2021-06-01 00:00:00');

INSERT INTO `userWorkspace` (`id`, `idUser`, `idWorkspace`, `role`, `createdAt`) VALUES
(1, 1, 1, 'ADMIN', '2021-06-01 00:00:00'),
(2, 2, 1, 'GUEST', '2021-06-01 00:00:00'),
(3, 1, 2, 'ADMIN', '2021-06-01 00:00:00');

INSERT INTO `task` (`id`, `name`, `description`, `createdAt`, `idWorkspace`, `visibility`, `deadline`) VALUES
(1, 'Task 1', 'Description of task 1', '2021-06-01 00:00:00', 1, 'PUBLIC', '2021-06-01 00:00:00'),
(2, 'Task 2', 'Description of task 2', '2021-06-01 00:00:00', 1, 'PRIVATE', '2021-06-01 00:00:00'),
(3, 'Task 3', 'Description of task 3', '2021-06-01 00:00:00', 2, 'PUBLIC', '2021-06-01 00:00:00'),
(4, 'Task 4', 'Description of task 4', '2021-06-01 00:00:00', 2, 'PRIVATE', '2021-06-01 00:00:00'),
(5, 'Task 5', 'Description of task 5', '2021-06-01 00:00:00', 1, 'PUBLIC', '2021-06-01 00:00:00');

INSERT INTO `category` (`id`, `name`, `description`, `createdAt`, `idWorkspace`) VALUES
(1, 'Category 1', 'Description of category 1', '2021-06-01 00:00:00', 1),
(2, 'Category 2', 'Description of category 2', '2021-06-01 00:00:00', 1),
(3, 'Category 3', 'Description of category 3', '2021-06-01 00:00:00', 2);

INSERT INTO `taskCategory` (`id`, `idTask`, `idCategory`, `createdAt`) VALUES
(1, 1, 1, '2021-06-01 00:00:00'),
(2, 2, 1, '2021-06-01 00:00:00'),
(3, 3, 2, '2021-06-01 00:00:00'),
(4, 4, 2, '2021-06-01 00:00:00'),
(5, 5, 1, '2021-06-01 00:00:00');