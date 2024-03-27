<div style="text-align: justify">

# Varbas una herramienta de gestión de proyectos colaborativa

## Introducción

Varbas es una herramienta de gestión de proyectos colaborativa.

El objetivo de Varbas es permitir a equipos de trabajo colaborar en la gestión de proyectos de forma efectiva.

Varbas esta diseñada para permitir a los equipos crear, asignar, rastrear y completar tareas de manera organizada y colaborativa.

Diseñada para adaptarse a las necesidades de cualquier equipo, Varbas ofrece una interfaz intuitiva y funciones sólidas que facilitan la coordinación y el control en cada etapa del proyecto.


## ¿Por qué?

A pesar de que existen muchas herramientas de gestión de proyectos, siempre hay algo que no termina de encajar. Ya sea por la falta de alguna funcionalidad, por la complejidad de la herramienta o por el precio.


Varbas nace con la idea de ser una herramienta open-source, sencilla y con las funcionalidades justas para que cualquier equipo de trabajo pueda gestionar sus proyectos de forma efectiva.
## Tecnologías

Para el desarrollo se utilizarán las siguientes tecnologías:

- **Frontend**:
  - Angular: Biblioteca de TypeScript para construir interfaces de usuario.
  - Tailwind CSS: Framework de CSS.
  - TypeScript: Superconjunto de JavaScript que añade tipado estático.
- **Backend**:
	- Node.js: Entorno de ejecución para JavaScript.
  	- Express: Framework de Node.js para construir APIs REST.
	- MongoDB: Base de datos NoSQL.

Alternativas:
En vez de Angular se podría usar Next.js.
En vez de MongoDB se podría usar MySQL.
En vez de Express se puede usar el framework NextJs.

<div style="page-break-after: always;"></div>


## Asignaturas relacionadas

**Desarrollo de aplicaciones en entorno cliente:** 
  - Sobre esta asignatura se usarán las tecnologías de Angular y TypeScript.

**Desarrollo de aplicaciones en entorno servidor:**
  - Sobre esta asignatura se usarán las tecnologías de Node.js con Express y MongoDB, aunque no se han podido dar en profundidad, son tecnologías que quiero aprender y aplicar en el proyecto.

**Despliegue de aplicaciones:** 
  - Sobre esta asignatura se aplicarán los conocimientos para desplegar la aplicación en un servidor 


## Funcionalidades

### Fucionalidades generales
- **Registro y autenticación**: Los usuarios podrán registrarse y autenticarse.
- **Gestión de usuarios**: Los usuarios podrán gestionar su perfil.

### Funcionalidades principales
- **Workspace**: Un espacio de trabajo en el que se pueden crear proyectos, tareas, equipos y categorías.
- **Equipos**: Los usuarios se pueden agrupar en equipos.
- **Tareas**: A los usuarios o equipos se les pueden asignar tareas.
- **Categorías**: Las tareas pueden tener categorías.
- **Proyectos**: Se pueden crear proyectos dentro de un workspace, los cuales pueden tener tareas, y ser asignados a equipos o usuarios.

### Funcionalidades secundarias
- **Estadísticas**: Se podrán ver estadísticas de los proyectos y tareas.
- **Notificaciones**: Los usuarios recibirán notificaciones de las tareas asignadas.

<div style="page-break-after: always;"></div>

## Modelo de datos

Varbas se basa sobre el concepto de **Workspace**. Un workspace es un espacio de trabajo en el que se pueden crear proyectos, tareas, equipos y categorías.

Un usuario administrador puede crear un workspace y añadir a otros **usuarios** los cuales se pueden agrupar en **equipos**.

A los usuarios o equipos se les pueden asignar **tareas** y estas tareas pueden tener **categorías**.

También se pueden crear **proyectos** dentro de un workspace, los cuales pueden tener **tareas**, y ser asignados a **equipos** o **usuarios**.

![Modelo de datos](./docs/assets/ModeloDatos.png)

</div>