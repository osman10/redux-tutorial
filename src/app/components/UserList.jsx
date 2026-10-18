import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchTerm, deleteUser } from '../../features/users/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { list: users, status, error, searchTerm } = useSelector((state) => state.users);

  // Fetch users when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500 font-medium">
        Loading users...
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center mt-12 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 font-sans bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h2>

      {/* Search Bar Functionality */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border text-gray-800 placeholder-gray-400"
      />

      <p className="text-gray-600 text-sm mb-4">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      {/* User Cards Grid */}
      <div className="flex flex-col gap-3">
        {filteredUsers.map((user) => (
          <div 
            key={user.id} 
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
          >
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">{user.name}</h4>
              <p className="text-gray-600 text-sm mb-0.5">Email: {user.email}</p>
              <p className="text-gray-500 text-xs">City: {user.address.city}</p>
            </div>
            <button
              onClick={() => dispatch(deleteUser(user.id))}
              className="bg-red-500 hover:bg-red-600 text-white font-medium border-none px-3.5 py-2 rounded-md cursor-pointer text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;