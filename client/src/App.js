import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';    // Import your Login component
import Memory from './pages/Memory.jsx';  // Import your Memory component
import Screensaver from './pages/Screensaver.jsx';  // Import your Screensaver component
import { useState } from 'react';


import { io } from 'socket.io-client';

function App() {

  const socket = io('http://10.255.250.109:5001');
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className="App">
    
        <Routes>
          {/* Define routes for different pages */}
        <Route path="/" element={<Screensaver />} />
        <Route path="/login" element={<Login setUname={setUsername} socket={socket}/>} />
        <Route path="/memory" element={<Memory socket={socket} username={username}/>} />
        </Routes>
 
      </div>
    </Router>
   
  );
}

export default App;
