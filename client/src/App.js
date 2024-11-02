import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';    // Import your Login component
import Memory from './pages/Memory.js';  // Import your Memory component

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {

  return (
    <Router>
      <div className="App">
  
        <Routes>
          {/* Define routes for different pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Memory />} />
        </Routes>
 
      </div>
    </Router>
   
  );
}

export default App;
