const Books=require('../../models/Book');

exports.getBooks=async(req,res)=>
{
    const books=await Books.find({isAvailable:true}).populate('owner','name email');
    res.json(books);
}

exports.getBook=async(req,res)=>
{
    const book=await Books.findById(req.params.id).populate('owner','name email');

    if(!book)
    {
        res.status(404).json({message:'Not found'});
    }

    res.json(book);
}


exports.createBook=async(req,res)=>
{
    const owner=req.userId;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("rahul")
    const {title,author,condition}=req.body;
    const books=await Books.create({owner,title,author,condition,imageUrl});
    res.status(201).json(books);
}



exports.getMyBooks = async (req, res) => {
  const books = await Books.find({ owner: req.user._id });
  res.json(books);
};



exports.updateBook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.owner.equals(req.userId)) return res.status(200).json({ message: 'Forbidden' });

    console.log(req.body);;

    const {title,author,condition} = req.body;

    let imageUrl = book.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    book.title = title;
    book.author = author;
    book.condition = condition;
    book.imageUrl = imageUrl;

    await book.save();

    res.json({
      message: 'Book updated successfully',
      book,
    });
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.deleteBook = async (req, res) => {
  const book = await Books.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  if (!book.owner.equals(req.userId)) return res.status(200).json({ message: 'Forbidden' });
  await book.deleteOne();
  res.json({ message: 'Deleted' });
};