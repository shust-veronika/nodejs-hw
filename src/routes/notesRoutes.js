import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

const router = Router();

router.use(authenticate);

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
