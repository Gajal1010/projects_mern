import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import logo from '../../zodiac.png';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>Astrologyx</h1>
      <button className='authpage-button' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
      <>
          <img src={logo} id="logo" className="App-logo" alt="logo" />
          <SignUpForm setUser={setUser} /></>
          :
          <>
          <img src={logo} id="logo" className="App-logo" alt="logo" />
          <LoginForm setUser={setUser} /></>
      }
    </main>
  );
}