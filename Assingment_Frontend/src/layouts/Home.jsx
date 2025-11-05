import React, { useState, useEffect } from 'react';
import Nav from './Nav';

const Home = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: 'New',
    image: null,
  });

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false); 
  const [selectedBookId, setSelectedBookId] = useState(null); 
  const [showModal, setShowModal] = useState(false); 


  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://form-using-mongodb.vercel.app/book/getbooks`, { credentials: 'include' });
      const data = await res.json();

  

      setBooks(data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const deleteFunc = async (id) => {
    try {
      const res = await fetch(`https://form-using-mongodb.vercel.app/book/delete/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      
       

      if (res.ok) {

         if(res.message=='Forbidden')
    {
    alert('Only Owner of this book can delete this')
    }

        alert('Deleted Successfully');
        fetchBooks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('condition', formData.condition);
    if (formData.image) data.append('image', formData.image);

    try {
      const url = editMode
        ? `https://form-using-mongodb.vercel.app/book/update/${selectedBookId}`
        : `https://form-using-mongodb.vercel.app/book/create`;

      const method = editMode ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        body: data,
        credentials: 'include',
      });

    
      const result = await response.json();

    

      if (response.ok) {

        if(result.message=='Forbidden')
        alert('Only Owner of this book can change this')

        alert(editMode ? 'Book updated successfully!' : 'Book added successfully!');
        setFormData({ title: '', author: '', condition: 'New', image: null });
        setEditMode(false);
        setSelectedBookId(null);
        setShowModal(false);
        fetchBooks();
      } else {
        alert(result.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  // Open edit modal and prefill
  const openEditModal = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      condition: book.condition,
      image: null,
    });
    setSelectedBookId(book._id);
    setEditMode(true);
    setShowModal(true);
  };

  // Open create modal
  const openCreateModal = () => {
    setFormData({ title: '', author: '', condition: 'New', image: null });
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div>
      <Nav />

      <button
        onClick={openCreateModal}
        className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 mt-5"
      >
        Add Books
      </button>

      {loading ? (
        <p className="text-center mt-5 text-gray-600">Loading books...</p>
      ) : (
        <div className="ms-4 grid grid-cols-3 gap-4 mt-5">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="border rounded-lg p-4 shadow-md bg-white relative">
                <img
                  src={`http://localhost:8000${book.imageUrl}`}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-bold mt-2">{book.title}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-500">Condition: {book.condition}</p>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => openEditModal(book)}
                    className="bg-blue-500 text-white p-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFunc(book._id)}
                    className="bg-red-500 text-white p-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No books found</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h1 className="font-bold text-xl mb-4">
              {editMode ? 'Edit Book' : 'Create a New Book'}
            </h1>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full border rounded-md px-3 py-1.5 mb-3"
                required
              />

              <label>Author</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="block w-full border rounded-md px-3 py-1.5 mb-3"
                required
              />

              <label>Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="block w-full border rounded-md px-3 py-1.5 mb-3"
              >
                <option value="New">New</option>
                <option value="Fair">Fair</option>
                <option value="Old">Old</option>
              </select>

              <label>Image</label>
              <input
                name="avatar"
                type="file"
                onChange={handleChange}
                className="block w-full border rounded-md px-3 py-1.5 mb-3"
                accept=".jpg,.png,.gif"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-3 py-1.5 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 py-1.5 rounded"
                >
                  {editMode ? 'Update' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
