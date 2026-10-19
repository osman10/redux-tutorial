import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser, deleteUser } from '../../features/users/usersSliceTwo';

const UserComponent = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.usersTwo);

  // Form state matching your data structure
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skills = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);
    
    dispatch(
      addUser({
        name,
        email,
        age: Number(age),
        city,
        isActive,
        skills,
      })
    );

    // Reset form
    setName('');
    setEmail('');
    setAge('');
    setCity('');
    setIsActive(true);
    setSkillsInput('');
  };

  if (status === 'loading') return <p>Loading users...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>User Management (Redux CRUD)</h2>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input type="text" placeholder="Skills (comma separated, e.g. python, sql)" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />
        <label>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active
        </label>
        <button type="submit">Add User</button>
      </form>

      {/* User List */}
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>{user.name}</strong> ({user.email}) - {user.age} yrs, {user.city} 
            <br />
            Status: {user.isActive ? 'Active' : 'Inactive'} | Skills: {user.skills?.join(', ')}
            <br />
            <button onClick={() => dispatch(deleteUser(user.id))} style={{ marginTop: '5px', background: 'red', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;