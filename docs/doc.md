## APis

varios elementos principales

- Usuarios
- Workspaces

Un usuario puede tener varios workspaces y un workspace puede tener varios usuarios.

- Tareas

Un workspace puede tener varias tareas.

- Equipos

Un workspace puede tener varios equipos.
Un equipo puede tener varios usuarios.
Un usuario puede estar en varios equipos.

- Proyectos

Un workspace puede tener varios proyectos.
Un proyecto puede tener varias tareas.
Un proyecto puede estar asignado a varios equipos.
Un proyecto puede estar asignado a varios usuarios.

- Categorías

Una tarea puede tener varias categorías.

- Invitaciones

Un usuario puede invitar a otro usuario a un workspace.


Acciones sobre Usuarios

- Crear usuario
- Editar usuario
- Eliminar usuario
- Ver detalles de usuario
- Ver lista de usuarios
- Ver lista de workspaces de un usuario


Acciones sobre Workspaces
- Ver lista de equipos de un workspace 
- Ver lista de usuarios de un workspace
- Ver lista de proyectos de un workspace
- Ver lista de categorías de un workspace
- Ver lista de tareas de un workspace

```json
{
	"categories": [
		{
			"id": 1,
			"name": "Categoría 1"
		}
	],
	"tasks": [
		{
			"id": 1,
			"name": "Tarea 1",
			"description": "Descripción de la tarea 1",
			"status": "pendiente",
			"categories": [
				{
					"id": 1,
					"name": "Categoría 1"
				}
			],
			"assignedTo": [
				{
					"id": 1,
					"name": "Usuario 1"
				}
			]
		}
	],
	
}