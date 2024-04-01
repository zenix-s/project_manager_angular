import express, {Express, Request, Response} from 'express'
import { getTasks } from '@/services/tasks/getTasks'

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.send("ver tareas")
})

router.get('/:projectId', (req: Request, res: Response) => {
	const projectId: number = parseInt(req.params.projectId)
	const tasks = getTasks(projectId)
	res.send(tasks)
})

export default router