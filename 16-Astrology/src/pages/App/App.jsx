import { getUser } from '../../utilities/users-service';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import ChineseZodiac from '../ChineseZodiac/ChineseZodiac';
import DailyHoroscopePage from '../DailyHoroscopePage/DailyHoroscopePage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/NavBar/NavBar';
import ProfilePage from '../ProfilePage/ProfilePage'


function App() {
  const [user, setUser] = useState(getUser());
  const [horoscope, setHoroscope] = useState([])
  const [sunSign, setSunSign] = useState('Pisces')
  const [day, setDay] = useState('Today')

  useEffect (function () {
    async function getItems() {
    const URL = `https://aztro.sameerkumar.website/?sign=${sunSign}&day=${day}`;
    await fetch(URL, {
      method: 'POST'
    }).then(response => response.json())
    .then(json => setHoroscope(json))
    .catch(err => console.error(err))
  }
  getItems()
  }, [day, sunSign])

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={`/profile/${user._id}`} element={<ProfilePage user={user} />} />
            <Route path="/chinese_zodiac" element={<ChineseZodiac />} />
            <Route path="/daily_horoscope" element={<DailyHoroscopePage user={user} horoscope={horoscope} setSunSign={setSunSign} sunSign={sunSign} setDay={setDay} day={day} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App
