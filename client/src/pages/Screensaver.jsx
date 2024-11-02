import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';



const Login = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();


    function ClickAnywhere() {
        useEffect(() => {
            const handleClick = () => {
                navigate('/Login');
            };
    
            // Add event listener for clicks on the document
            document.addEventListener('click', handleClick);
    
            // Clean up the event listener on component unmount
            return () => {
                document.removeEventListener('click', handleClick);
            };
        }, []); // Empty dependency array means this runs once when the component mounts
    
        
    }

    return (
        <>
        <style jsx global>{`
            body {
                background-image: url(${require('../assets/colourful.jpg')});
                background-size: cover;  /* Makes the image cover the entire area */ 
            }
        `}</style>
        
        <div>
            <Header />
            <ClickAnywhere />
        </div>
          
        </>
    );
};

export default Login;
