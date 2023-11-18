import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keyword, setKeyword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const apiUrl = 'https://notestakeingbackend.vercel.app';

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/dashboard/notes/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [username, token, editMode]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiUrl}/register`, {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  const showToast = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
  };

  const showToaster = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username,
        password,
      });
      setToken(response.data.token);
      showToaster('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      showToast('Incorrect username or password.');
    }
  };

  const handleAddNote = async () => {
    try {
      await axios.post(
        `${apiUrl}/dashboard/note`,
        {
          username,
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle('');
      setContent('');
      fetchNotes(); 
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleUpdateNote = async () => {
    try {
      await axios.put(
        `${apiUrl}/dashboard/note/${username}/${editNoteId}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle('');
      setContent('');
      setEditMode(false);
      setEditNoteId(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`${apiUrl}/dashboard/note/${username}/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes(); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = (noteId) => {
    const noteToEdit = notes.find((note) => note._id === noteId);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setEditMode(true);
      setEditNoteId(noteId);
    }
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setEditMode(false);
    setEditNoteId(null);
  };
  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setToken('');
    setNotes([]);
    setTitle('');
    setContent('');
    setEditMode(false);
    setEditNoteId(null);
    setKeyword('');
    setSearchResults([]);
  };
  
  const handleSearch = async () => {
    try {
      console.log('Before Search - Keyword:', keyword);
      const response = await axios.get(`${apiUrl}/dashboard/search/${username}`, {
        params: { keyword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('After Search - Response:', response.data);
      setSearchResults(response.data.notes);  
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  };
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <div>
      <h1 className='heading'>My Notes App</h1>
      {token ? (
        <Dashboard
          title={title}
          content={content}
          keyword={keyword}
          setKeyword={setKeyword} 
          notes={notes}
          handleTitleChange={handleTitleChange}
          handleContentChange={handleContentChange}
          handleAddNote={handleAddNote}
          handleUpdateNote={handleUpdateNote}
          handleEditNote={handleEditNote}
          handleDeleteNote={handleDeleteNote}
          handleSearch={handleSearch}
          searchResults={searchResults} 
          handleCancelEdit={handleCancelEdit}
          handleLogout={handleLogout}
          editMode={editMode}
        />
      ) : (
        <>
          <Register
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleRegister={handleRegister}
          />
          <ToastContainer />
          <Login
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLogin={handleLogin}
          />
        </>
      )}
    </div>
  );
}

export default App;