import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchTerm, deleteUser } from './usersSlice';

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
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading users...</div>;
  }

  if (status === 'failed') {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>User Dashboard</h2>

      {/* Search Bar Functionality */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
      />

      <p style={{ color: '#666' }}>Showing {filteredUsers.length} of {users.length} users</p>

      {/* User Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>{user.name}</h4>
              <p style={{ margin: '0 0 2px 0', color: '#555', fontSize: '14px' }}>Email: {user.email}</p>
              <p style={{ margin: 0, color: '#777', fontSize: '13px' }}>City: {user.address.city}</p>
            </div>
            <button
              onClick={() => dispatch(deleteUser(user.id))}
              style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
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