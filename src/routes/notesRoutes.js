import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.use(authenticate);

router.get('/notes', getAllNotes);

router.get('/notes/:id', getNoteById);

router.post(
  '/notes',
  celebrate({
    [Segments.BODY]: createNoteSchema,
  }),
  createNote,
);

router.patch(
  '/notes/:id',
  celebrate({
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

router.delete('/notes/:id', deleteNote);

export default router;
