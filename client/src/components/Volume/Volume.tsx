import React, {ChangeEvent} from 'react'
import s from "../CurrentTrack/CurrentTrack.module.css"
import {useAppSelector} from "../../hooks/redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faVolumeUp, faVolumeXmark} from "@fortawesome/free-solid-svg-icons"


interface ITimelineProps {
    left: number
    right: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    muteTrack: () => void
}


const Volume:React.FC<ITimelineProps> =  ({left, right, onChange, muteTrack}) => {

    const {volume} = useAppSelector(state => state.playerReducer)

    return (
        <>
            <div className={s.action}>
                {
                    volume === 0 ? <FontAwesomeIcon icon={faVolumeXmark} onClick={muteTrack}  />
                                 : <FontAwesomeIcon icon={faVolumeUp} onClick={muteTrack} />
                }
            </div>
            <input type="range" value={left} max={right} className={s.volume} onChange={onChange} />
        </>
    )
}

export default Volume