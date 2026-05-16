import express from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = express.Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: getAllNotesSchema,
  }),
  getAllNotes,
);

router.get(
  '/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
  }),
  getNoteById,
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: createNoteSchema,
  }),
  createNote,
);

router.patch(
  '/:noteId',
  celebrate(updateNoteSchema),
  updateNote,
);

router.delete(
  '/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
  }),
  deleteNote,
);

export default router;
