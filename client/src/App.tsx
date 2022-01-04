import React from 'react'
import './App.css'
import Bar from "./components/Bar/Bar"
import TrackListItem from "./components/TrackListItem/TrackListItem"
import CurrentTrack from "./components/CurrentTrack/CurrentTrack"
import {trackAPI} from "./servicesAPI/TrackService"

function App() {

    const {data: track, isLoading, error} = trackAPI.useFetchAllTrackQuery(null)


  return (
    <div className="App">
      <Bar />
      <div className="app__wrapper">
          <div className="trackList__wrapper">
              {track && track.map((audioFile, index) => {
                  return (
                      <TrackListItem key={audioFile.id} index={index} id={audioFile.id} author={audioFile.author} track_name={audioFile.track_name} audio={audioFile.audio} createdAt={audioFile.createdAt} updatedAt={audioFile.updatedAt} />
                  )
              })}
          </div>
          <div className="currentTrack__wrapper">
              <CurrentTrack />
          </div>
      </div>
    </div>
  )
}

export default App
