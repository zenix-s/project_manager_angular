import express from 'express';
import { listWorkspaces } from '@/controller/workspaceController';

const router = express.Router();

// Listar workspaces de un usuario
router.get('/:userId', listWorkspaces);

// Crear un workspace
router.post('/', (req, res) => {
	res.send('Crear workspace');
});

// Modificar un workspace
router.put('/:id', (req, res) => {
	res.send('Modificar workspace');
});

// Eliminar un workspace
router.delete('/:id', (req, res) => {
	res.send('Eliminar workspace');
});



export default router;