import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';    // Import your Login component
import Memory from './pages/Memory.jsx';  // Import your Memory component
import Screensaver from './pages/Screensaver.jsx';  // Import your Screensaver component
import { PageTransition } from '@steveeeie/react-page-transition';

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
        <Route path="/" element={<Screensaver />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memory" element={<Memory />} />
        </Routes>
 
      </div>
    </Router>
   
  );
}

export default App;
