import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';    // Import your Login component
import Memory from './pages/Memory.js';  // Import your Memory component
import { useState } from 'react';


import { io } from 'socket.io-client';

function App() {

  const socket = io('http://127.0.0.1:5000');
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className="App">
  
        <Routes>
          {/* Define routes for different pages */}
        <Route path="/login" element={<Login setUname={setUsername} socket={socket}/>} />
        <Route path="/" element={<Memory username={username} socket={socket}/>} />
        </Routes>
 
      </div>
    </Router>
   
  );
}

export default App;
