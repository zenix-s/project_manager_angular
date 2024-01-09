# Project Manager

## Overview
La idea del proyecto es crear un sistema de gestión de proyectos que permita a los usuarios crear workspace para sus proyectos, en los cuales se pueda:
- Invitar a otros usuarios
- Crear equipos de trabajo
- Crear tareas
- Asignar tareas a equipos o usuarios
- Crear proyectos
- Asignar proyectos a equipos o usuarios
- Crear un subproyecto de un proyecto
- Crear categorías
- Asignar categorías a proyectos, subproyectos o tareas

## Tecnologías

### Frontend
- Angular
- TailwindCSS
- Typescript
- HTML
- CSS

### Backend
- NodeJS
- Express
- BBDD por definir

## Arquitectura

## Entidades


- User
  - id
  - username
  - email
  - password
  - creationDate
  - updateDate
  - settings json
    - theme
    - language
    - notifications
    - etc
- Workspace
  - id
  - name
  - description
  - creationDate
  - updateDate
  - settings json
    - theme
    - language
    - notifications
    - etc
- userWorkspace
  - role
    1. Admin
    2. User
    3. Guest
  - settings json
    - theme
    - language
    - notifications
    - etc 
  - idWorkspace
  - idUser
- Task
  - name
  - description
  - creationDate
  - updateDate
  - idWorkspace
- Tag 
  - name
  - type
    1. Project
    2. Team
    3. Category 
- SubTag
  - type
    1. subproject
    2. assignation
  - idTagParent
  - idTagChild 
- userTask
  - id
  - idUser
  - idTask
- userTag
  - id
  - idUser
  - idTag
- taskTag
  - id
  - idTask
  - idTag 


Las categorías, proyectos, y equipos son entidades que se agrupan a traves de tags, que son entidades que se pueden agrupar entre si

Ejemplo:
En caso de querer crear un proyecto y asginarlo a un equipo, se crean dos tags:

- Tag de proyecto - `project`
- Tag de equipo - `team`

Y se asocian a un tag padre, que en este caso sería el workspace

- Workspace padre - `workspace`

Se crea un subtag con los datos del proyecto
- Subtag de proyecto - `subproject`
- idTagParent - `team`
- idTagChild - `project`



