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
    const newUser = {
      name,
      email,
      age: Number(age),
      city,
      isActive,
      skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
    };
    dispatch(addUser(newUser));
    setName('');
    setEmail('');
    setAge('');
    setCity('');
    setIsActive(true);
    setSkillsInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            User Management
          </h1>
          <p className="mt-3 text-slate-500 text-sm">
            Add, view and manage your users in one place
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 sm:p-8 mb-10"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span className="inline-block w-2 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            Add New User
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Skills <span className="text-slate-400 font-normal">(comma separated)</span>
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="React, Node.js, TypeScript"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-indigo-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
                    isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-slate-600">
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition-all"
            >
              Add User
            </button>
          </div>
        </form>

        {/* Status / Error */}
        {status === 'loading' && (
          <div className="text-center py-6 text-indigo-600 font-medium animate-pulse">
            Loading users...
          </div>
        )}
        {error && (
          <div className="text-center py-4 px-5 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Users List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users && users.map((user) => (
            <div
              key={user.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{user.name}</h3>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user.isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="text-sm text-slate-600 space-y-1 mb-3">
                <p><span className="font-medium text-slate-700">Age:</span> {user.age}</p>
                <p><span className="font-medium text-slate-700">City:</span> {user.city}</p>
              </div>

              {user.skills && user.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {user.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => dispatch(deleteUser(user.id))}
                className="w-full mt-2 py-2 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-95 transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {users && users.length === 0 && status !== 'loading' && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium">No users yet</p>
            <p className="text-sm mt-1">Add your first user using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComponent;