const Request=require('../../models/Request');
const Book=require('../../models/Book');

exports.createRequest = async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.isAvailable) return res.status(400).json({ message: 'Book not available' });
  if (book.owner.equals(req.userId)) return res.status(400).json({ message: `You own this book` });
  const existing = await Request.findOne({ book: bookId, requester: req.userId, status: 'pending' });
  if (existing) return res.status(400).json({ message: 'You already have a pending request' });

  const reqDoc = await Request.create({
    book: bookId,
    requester: req.userId,
    owner: book.owner,
  });

  if(reqDoc)
  {
  book.isAvailable=false;
  book.save();
  }

  res.status(201).json({data:reqDoc,status:'ok'});
};

exports.getRequestsForUser = async (req, res) => {
  const requests = await Request.find({
    $or: [{ owner: req.userId }, { requester: req.userId }]
  }).populate('book requester owner', 'title name email imageUrl');
  res.json({data:requests,"userId":req.userId});
};

exports.updateRequestStatus = async (req, res) => {
  try {

    console.log("Rahul Thapliyal")
    
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // find the request
    const reqDoc = await Request.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Request not found' });

    // only owner can change status
    if (reqDoc.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    if (status === 'accepted') {
      reqDoc.status = 'accepted';
      await reqDoc.save();
      return res.json({ message: 'Request accepted', data: reqDoc });
    } 
    
    if (status === 'declined') {
      await Request.findByIdAndDelete(id);
      return res.json({ message: 'Request declined and deleted' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

