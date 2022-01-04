import React, {ChangeEvent, useEffect} from 'react'
import s from "../CurrentTrack/CurrentTrack.module.css"
import {useAppSelector} from "../../hooks/redux"

interface ITimelineProps {
    left: number
    right: number
    secondsToHms: (duration: number) => string
    changeCurrentTime: (e: ChangeEvent<HTMLInputElement>) => void
}


const Timeline:React.FC<ITimelineProps> =  ({secondsToHms, changeCurrentTime, left, right}) => {

    const {duration, currentTime} = useAppSelector(state => state.playerReducer)

    return (
        <>
            <pre>{secondsToHms(currentTime)}</pre>
            <input
                type="range"
                className={s.timeline}
                min={0}
                max={right}
                value={left}
                onChange={changeCurrentTime}
            />
            <pre>{secondsToHms(duration)}</pre>
        </>
    )
}

export default Timeline