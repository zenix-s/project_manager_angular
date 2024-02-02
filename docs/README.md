# Project Manager

## Overview

La idea del proyecto es crear un sistema de gestión de proyectos que permita a los usuarios crear workspace para sus proyectos, en los cuales se pueda:

- Invitar a otros usuarios
- Crear equipos de trabajo
- Crear tareas
- Asignar tareas a equipos o usuarios
- Crear categorías
- Asignar categorías a tareas

## Tecnologías

### Frontend

- Angular
- TailwindCSS
- Typescript
- HTML
- CSS

### Backend

- NodeJS
- BBDD por definir

## Arquitectura

## Entidades

```ts
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  creationDate: Date;
  updateDate: Date;
  settings: {
    theme: string;
    language: string;
    notifications: boolean;
  };
}

interface Invitation {
  id: number;
  idWorkspace: number;
  idUser: number;
  role: number;
  status: number;
  creationDate: Date;
  updateDate: Date;
}

interface Workspace {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  settings: {
    theme: string;
    language: string;
    notifications: boolean;
  };
}

interface UserWorkspace {
  role: number;
  settings: {
    theme: string;
    language: string;
    notifications: boolean;
  };
  idWorkspace: number;
  idUser: number;
}

interface Task {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  idWorkspace: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
}

interface Team {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
}

interface UserTeam {
  id: number;
  role: number;
  settings: {
    theme: string;
    language: string;
    notifications: boolean;
  };
  idTeam: number;
  idUser: number;
}

interface TaskCategory {
  id: number;
  idTask: number;
  idCategory: number;
}

interface TaskUser {
  id: number;
  idTask: number;
  idUser: number;
}

interface TaskTeam {
  id: number;
  idTask: number;
  idTeam: number;
}
```
