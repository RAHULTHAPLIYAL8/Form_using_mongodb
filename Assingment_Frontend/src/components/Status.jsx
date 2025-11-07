import React, { useState, useEffect } from 'react';
import Nav from '../layouts/Nav';

const Status = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  // 📦 Fetch all book requests
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/request/get`, { credentials: 'include' });
      const res = await response.json();

      if (res?.data) setBooks(res.data);
      if (res?.userId) setUserId(res.userId);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

 
  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/request/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: action }),
      });

      const res = await response.json();

      if (response.ok) {
        alert(res.message || `Request ${action}ed successfully`);
        fetchBooks(); // refresh data
      } else {
        alert(res.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error updating request');
    }
  };

  return (
    <div>
      <Nav />

      {loading ? (
        <p className="text-center mt-5 text-gray-600">Loading books...</p>
      ) : (
        <div className="ms-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="border rounded-lg p-4 shadow-md bg-white">
                <img
                  src={`${import.meta.env.VITE_BACKEND_API}/${book.book?.imageUrl}`}
                  alt={book.book?.title || 'Book image'}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-bold mt-2">{book.book?.title}</h2>

                <p className="text-sm text-gray-700">
                  <strong>Requester:</strong> {book.requester?.name} ({book.requester?.email})
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Owner:</strong> {book.owner?.name} ({book.owner?.email})
                </p>
                <p className="text-sm mt-1">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`${
                      book.status === 'pending'
                        ? 'text-yellow-600'
                        : book.status === 'accepted'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {book.status}
                  </span>
                </p>

                {/* ✅ Show action buttons if user is the owner and request is pending */}
                {book.owner?._id === userId && book.status === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleAction(book._id, 'accepted')}
                      className="bg-green-600 cursor-pointer rounded text-white font-bold py-2 px-3 hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(book._id, 'declined')}
                      className="bg-red-600 cursor-pointer rounded text-white font-bold py-2 px-3 hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No requests found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Status;
