import React from 'react'
import './SongCards.css';

export const SongCards = ({secondSearch}) => {
    return (
    <div className='container'>
      {secondSearch.map((song,i) => (
        
        <div key={i}>
          <div className="song">
            <h2>{song.data.name}</h2>
            <h4>{song.data.artists.items[0].profile.name}</h4>
            <img src={song.data.albumOfTrack.coverArt.sources[0].url}/>
          </div>
        </div>
      ))}
      
    </div>
  )
}
