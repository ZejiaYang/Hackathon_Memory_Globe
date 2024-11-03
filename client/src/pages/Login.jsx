import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/LogoStraight';
import Characters from '../assets/colourful.jpg';
import Typewriter from 'typewriter-effect';




const Login = ({ setUname, socket }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);

        setUname(username);
        navigate('/Memory');
    };

    return (
        <>
            <style jsx global>{`
            body { background: radial-gradient(circle, #0776aa, #032045);
        }
        `}</style>

            <Logo />
            
            <div style={{ position: 'relative', height: '25vh', margin: '50px', marginTop: '60px' ,  color:'white',fontSize: '24pt',
                                    fontFamily: 'Lazyhand', textAlign:'center', padding:'30px'}}>

<Typewriter
  onInit={(typewriter) => {
    typewriter
      .typeString('Welcome to the Memory Globe, a whimsical place where your memories shimmer like stars! ')
      .pauseFor(500) // Pause after the first sentence
      .typeString('Here, emotions dance and guide you through the colorful connections of your past. ')
      .pauseFor(500) // Pause for spacing between sentences
      .typeString('Each memory sparkles, revealing how moments intertwine to create your unique story. ')
      .pauseFor(500) // Pause for spacing between sentences
      .typeString('Dive in and let the Memory Globe show you the magic of your feelings!')
      .start(); // Start typing
  }}
  options={{
    delay: 40, // Adjust the typing speed (lower = faster)
    autoStart: true, // Automatically start typing
    loop: false, // Set to false if you don't want to loop
  }}
/>


            </div>

            <div style={{ position: 'relative', height: '20vh', margin: '50px', marginTop: '60px' }}>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '50%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center', // Horizontally centers the content
                        alignItems: 'center', // Vertically centers the content
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', width: '90%' }}>
                            <label htmlFor="username" style={{
                                fontSize: '20pt',
                                fontFamily: 'Impact',
                                color: 'white',
                                marginRight: '30px' // Space between label and input
                            }}>Username: </label>


                            <input
                                id="memory"
                                type="text" // Use type="text" for a single-line input
                                required
                                style={{
                                    width: '40%',
                                    height: '50px', // Adjust height as needed for single line
                                    fontSize: '16pt',
                                    fontFamily: 'Lazyhand',
                                    marginRight: '40px', // Space between input and button
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    border: 'none', // Remove default border
                                    borderRadius: '5px', // Rounded corners
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
                                }}
                            />

                            <button type="submit" style={{
                                width: '20%',
                                height: '50px',
                                fontFamily: 'Impact',
                                fontSize: '15pt',
                                color: 'black', // Black text color
                                border: 'none', // Remove default border
                                borderRadius: '5px', // Rounded corners
                                cursor: 'pointer', // Change cursor to pointer
                                transition: 'box-shadow 0.3s ease, background 0.3s ease', // Smooth transition for the glow effect
                                boxShadow: 'none', // No initial shadow
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))' // white gradient
                            }}

                                onMouseOver={(e) => {

                                    e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 255, 0, 0.5), rgba(255, 255, 255, 0))'; // Change background on hover
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = 'none'; // Remove glow when not hovering
                                    e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))'; // Reset background
                                }}>
                                Open Memories!
                            </button>
                        </div>
                    </div>
                </form>

            </div>

        </>
    );
};

export default Login;
