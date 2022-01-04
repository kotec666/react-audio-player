import React from 'react'
import s from './Track.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faTrash} from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import {pauseTrack, setActiveTrack, setCurrIndex} from '../../store/reducers/PlayerReducer'
import {trackAPI} from "../../servicesAPI/TrackService";


interface ITrackListItemProps {
    index: number
    id: number
    track_name: string
    author: string
    audio: string
    createdAt:string
    updatedAt:string
}


const TrackListItem:React.FC<ITrackListItemProps> = ({id, track_name, author, audio, index}) => {


    const {active, pause} = useAppSelector(state => state.playerReducer)
    const dispatch = useAppDispatch()

    const [deleteTrack] = trackAPI.useDeleteTrackMutation()

    const Track = {id, track_name, author, audio}

    const play = () => {
        dispatch(setActiveTrack(Track))
        dispatch(pauseTrack())
        dispatch(setCurrIndex(index))
    }

    const handleDeleteTrack = async () => {
        await deleteTrack(id).unwrap()
    }


    return (
        <div className={s.TrackItem}>
            <div className={s.playBtn}>
                { active && active.id === id && !pause
                        ?   <FontAwesomeIcon icon={faPause} onClick={play} />
                        :   <FontAwesomeIcon icon={faPlay} onClick={play} />
                }
            </div>
            <div>{author.length <= 14 ? author && author : author && author.substring(0, 6) + '...'}</div>
            <div>-</div>
            <div>{track_name.length <= 14 ? track_name && track_name : track_name && track_name.substring(0, 6) + '...'}</div>
            <div
                style={{'cursor': 'pointer'}}
                onClick={handleDeleteTrack}
            >
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    )
}

export default TrackListItem