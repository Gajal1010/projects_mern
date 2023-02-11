import '../../pages/DailyHoroscopePage/DailyHoroscope.css'

export default function FavoritesCard({ user, sign, date, description, id, setNewFavorites}) {


const handleDelete = async () => {
    const response = await fetch(`/daily_horoscope/${user._id}/${id}`, {
        method: 'DELETE' 
    }).then(res => res.json())
    setNewFavorites(response.favorites)
}

    return (
        <>

<div className="row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div className="card text-center col-md-3 favorites-card" style={{ backgroundColor: '#FFFFFFF', opacity: 0.5 }}>
    <div className="card-header">
          <h5 className="card-title" style={{ color: '#000000' }}>{sign} </h5>
          <div className="wrapper">
      <div className="horoscope-img transformImage" id={sign}></div>
      </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{date}</li>
          <li className="list-group-item">{description}</li>
        </ul>
        <div className="card-body">
        <button onClick={handleDelete}>Remove Favorite</button>
          </div>
        </div>
        </div>
        </>
       
    ) 
}
