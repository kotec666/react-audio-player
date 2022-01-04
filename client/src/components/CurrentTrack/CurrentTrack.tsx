import React, {useEffect, useState} from 'react'
import s from './CurrentTrack.module.css'
import {faCirclePause, faCirclePlay, faBackward, faForward} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useAppDispatch, useAppSelector} from "../../hooks/redux"
import {
    pauseTrack,
    playTrack,
    setActiveTrack,
    setCurrentTime,
    setDuration,
    setVolume,
    setCurrIndex,
} from '../../store/reducers/PlayerReducer'
import Timeline from "../Timeline/Timeline"
import Volume from "../Volume/Volume"


let audio: HTMLAudioElement

const CurrentTrack = () => {

    const {active, pause, duration, currentTime, volume, trackIndex} = useAppSelector(state => state.playerReducer)
    const {track: tracks} = useAppSelector(state => state.trackReducer)
    const dispatch = useAppDispatch()

    const getTrack = () => {
       let nextTrack
        nextTrack = tracks.filter((track, i) => i === trackIndex + 1)
         dispatch(setCurrIndex(trackIndex + 1))
         dispatch(setActiveTrack(nextTrack[0]))
    }

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            dispatch(setCurrIndex(trackIndex))
            dispatch(setActiveTrack(active))
        } else {
            let prevTrack
            prevTrack = tracks.filter((track, i) => i === trackIndex - 1)
            dispatch(setActiveTrack(prevTrack[0]))
            dispatch(setCurrIndex(trackIndex - 1))
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            let nextTrack
            nextTrack = tracks.filter((track, i) => i === trackIndex + 1)
            dispatch(setCurrIndex(trackIndex + 1))
            dispatch(setActiveTrack(nextTrack[0]))
        } else {
            dispatch(setCurrIndex(trackIndex))
            dispatch(setActiveTrack(active))
        }
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
               dispatch(setDuration(Math.ceil(audio.duration)))
            }
            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
            }
        }
    }

    const play = () => {
        if (pause) {
            dispatch(playTrack())
            audio.play()
        } else {
            dispatch(pauseTrack())
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        dispatch(setVolume(Number(e.target.value)))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        dispatch(setCurrentTime(Number(e.target.value)))
    }

    const muteTrack = () => {
        if (volume === 0) {
            audio.volume = 25 / 100
            dispatch(setVolume(25))
        } else {
            audio.volume = 0
            dispatch(setVolume(0))
        }

    }

    if (!active) {
        return null
    }

    const getRandomColor = () => {
        let letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }



    function secondsToHms(duration: number) {
        duration = Number(duration)

        let h = Math.floor(duration / 3600)
        let m = Math.floor(duration % 3600 / 60)
        let s = Math.floor(duration % 3600 % 60)

        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2)
    }


    return (
        <div className={s.Track__Wrapper}>
            <div className={s.audio__name__wrapper} style={{ background: `linear-gradient(180deg, ${getRandomColor()} 15%, ${getRandomColor()} 84%)`}}>
                <h4>{active && active.author}</h4>
                <h4>{active && active.track_name}</h4>
            </div>
            <div className={s.actions__wrapper}>
                <div className={s.action}>
                    <FontAwesomeIcon icon={faBackward} className={s.control} onClick={toPrevTrack} />
                </div>
                <div className={s.action}>
                    {
                        pause ? <FontAwesomeIcon icon={faCirclePlay} onClick={play} className={s.pause} />
                              : <FontAwesomeIcon icon={faCirclePause} onClick={play} className={s.pause} />
                    }
                </div>
                <div className={s.action}>
                    <FontAwesomeIcon icon={faForward} className={s.control} onClick={toNextTrack} />
                </div>
            </div>

            <div className={s.second__controls}>
                <Timeline secondsToHms={secondsToHms} changeCurrentTime={changeCurrentTime} left={currentTime} right={duration} />
            </div>

            <div className={s.volumeControls}>
                <Volume left={volume} right={100} onChange={changeVolume} muteTrack={muteTrack} />
            </div>
        </div>
    )
}

export default CurrentTrack