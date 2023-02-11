import './ChineseZodiac.css'
import { useState } from 'react'

export default function ChineseZodiac() {
	const [zodiac, setZodiac] = useState("null")
	const [year, setYear] = useState(null)

	const handleChange = (event) => {		  
		setYear(event.target.value)
		}

	const handleSubmit = (event) => {
		event.preventDefault()
		setZodiac(chineseZodiac(year))
		function chineseZodiac(year) {
				switch (year % 12) {
				  case 0:
					return "Monkey";
				  case 1:
					return "Rooster";
				  case 2:
					return "Dog";
				  case 3:
					return "Pig";
				  case 4:
					return "Rat";
				  case 5:
					return "Ox";
				  case 6:
					return "Tiger";
				  case 7:
					return "Rabbit";
				  case 8:
					return "Dragon";
				  case 9:
					return "Snake";
				  case 10:
					return "Horse";
				  case 11:
					return "Goat";
				}
			  }
		}

  return (
    <>
    <h1>Chinese Zodiac Calculator</h1>
			<div className="form-content">
			<form onSubmit={handleSubmit}>
				<input type="number" name="birthYear" className="birthYear" placeholder='Enter year of birth...' required onChange={handleChange} min="1900" max="2030" maxLength="4" pattern="\d*" /> <br />
				<div className="button"><button type="submit" className="set">Set</button></div>
			</form>
			</div>
			{ zodiac !== "null" ?
			<h2 id="result-h2">You're a {zodiac}!</h2> :
			<h2 id="result-h2">You're a...</h2>
   }
   			<div className="wrapper">
				<div className="zodiac-img transformImage" id={zodiac}></div>
			</div>
   </>
); 
}