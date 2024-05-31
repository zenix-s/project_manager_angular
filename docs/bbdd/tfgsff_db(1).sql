--
-- Base de datos: `tfgsff_db`
--

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `idWorkspace` int(11) NOT NULL,
  `color` varchar(7) DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitation`
--

CREATE TABLE `invitation` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `idWorkspace` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `idWorkspace` int(11) NOT NULL,
  `visibility` enum('PUBLIC','PRIVATE') NOT NULL DEFAULT 'PRIVATE',
  `deadline` datetime DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `priority` enum('NONE','LOW','MEDIUM','HIGH','CRITICAL') NOT NULL DEFAULT 'NONE',
  `dependentIdTask` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taskCategory`
--

CREATE TABLE `taskCategory` (
  `id` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`)),
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userTask`
--

CREATE TABLE `userTask` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  `role` enum('ADMIN','MEMBER','GUEST') NOT NULL DEFAULT 'GUEST'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userWorkspace`
--

CREATE TABLE `userWorkspace` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idWorkspace` int(11) NOT NULL,
  `role` enum('ADMIN','MEMBER','GUEST') NOT NULL DEFAULT 'GUEST',
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workspace`
--

CREATE TABLE `workspace` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idWorkspace` (`idWorkspace`);

--
-- Indices de la tabla `invitation`
--
ALTER TABLE `invitation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idWorkspace` (`idWorkspace`);

--
-- Indices de la tabla `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idWorkspace` (`idWorkspace`),
  ADD KEY `fk_task_task` (`dependentIdTask`);

--
-- Indices de la tabla `taskCategory`
--
ALTER TABLE `taskCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTask` (`idTask`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `userTask`
--
ALTER TABLE `userTask`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idTask` (`idTask`);

--
-- Indices de la tabla `userWorkspace`
--
ALTER TABLE `userWorkspace`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idWorkspace` (`idWorkspace`);

--
-- Indices de la tabla `workspace`
--
ALTER TABLE `workspace`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `invitation`
--
ALTER TABLE `invitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `taskCategory`
--
ALTER TABLE `taskCategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `userTask`
--
ALTER TABLE `userTask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `userWorkspace`
--
ALTER TABLE `userWorkspace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `workspace`
--
ALTER TABLE `workspace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `fk_category_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`);

--
-- Filtros para la tabla `invitation`
--
ALTER TABLE `invitation`
  ADD CONSTRAINT `fk_invitation_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`);

--
-- Filtros para la tabla `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_task_task` FOREIGN KEY (`dependentIdTask`) REFERENCES `task` (`id`),
  ADD CONSTRAINT `fk_task_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`);

--
-- Filtros para la tabla `taskCategory`
--
ALTER TABLE `taskCategory`
  ADD CONSTRAINT `taskCategory_ibfk_1` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`),
  ADD CONSTRAINT `taskCategory_ibfk_2` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`);

--
-- Filtros para la tabla `userTask`
--
ALTER TABLE `userTask`
  ADD CONSTRAINT `fk_userTask_task` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`),
  ADD CONSTRAINT `fk_userTask_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `userWorkspace`
--
ALTER TABLE `userWorkspace`
  ADD CONSTRAINT `fk_userWorkspace_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_userWorkspace_workspace` FOREIGN KEY (`idWorkspace`) REFERENCES `workspace` (`id`);
COMMIT;

