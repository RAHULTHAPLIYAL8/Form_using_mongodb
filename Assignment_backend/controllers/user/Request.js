const Request = require('../models/Request');
const Book = require('../models/Book');
const mongoose = require('mongoose');

exports.createRequest = async (req, res) => {
  const { bookId, message } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.isAvailable) return res.status(400).json({ message: 'Book not available' });
  if (book.owner.equals(req.user._id)) return res.status(400).json({ message: `You own this book` });
  const existing = await Request.findOne({ book: bookId, requester: req.user._id, status: 'pending' });
  if (existing) return res.status(400).json({ message: 'You already have a pending request' });

  const reqDoc = await Request.create({
    book: bookId,
    requester: req.user._id,
    owner: book.owner,
    message
  });
  
  res.status(201).json(reqDoc);
};

exports.getRequestsForUser = async (req, res) => {
  const requests = await Request.find({
    $or: [{ owner: req.user._id }, { requester: req.user._id }]
  }).populate('book requester owner', 'title name email');
  res.json(requests);
};

exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  if (!['accepted','declined'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const reqDoc = await Request.findById(id).session(session);
    if (!reqDoc) throw new Error('Request not found');
    if (!reqDoc.owner.equals(req.user._id)) throw new Error('Not owner');
    if (reqDoc.status !== 'pending') throw new Error('Already handled');

    reqDoc.status = status;
    await reqDoc.save({ session });

    if (status === 'accepted') {
      const book = await Book.findById(reqDoc.book).session(session);
      if (!book) throw new Error('Book not found');
      book.isAvailable = false;
      await book.save({ session });
      await Request.updateMany(
        { book: reqDoc.book, status: 'pending', _id: { $ne: reqDoc._id } },
        { $set: { status: 'declined' } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    res.json(reqDoc);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
};
