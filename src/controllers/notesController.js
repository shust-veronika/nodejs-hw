import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = { userId };

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const limit = Math.max(1, Number(perPage));
  const skip = (Math.max(1, Number(page)) - 1) * limit;

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    Note.find(filter).skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalNotes / limit);

  res.status(200).json({
    page: Math.max(1, Number(page)),
    perPage: limit,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, userId: req.user._id });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    req.body,
    { returnDocument: 'after' },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
