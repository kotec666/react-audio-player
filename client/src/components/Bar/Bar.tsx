import React, {useState} from 'react'
import s from './Bar.module.css'
import Modal from "../Modal/Modal"
import {useForm} from "react-hook-form"
import {ITrackReq} from "../../models/ITrack"
import {trackAPI} from "../../servicesAPI/TrackService"

const Bar = () => {

    const [isOpened, setIsOpened] = useState(false)
    const [createTrack] = trackAPI.useCreateTrackMutation()
    const {register: trackRegistration, formState: { errors: errorsTrack }, handleSubmit: handleSubmitTrack} = useForm<ITrackReq>()

    const [drag, setDrag] = useState(false)
    const [audioFile, setAudioFile] = useState<FileList>()
    const [audioError, setAudioError] = useState('')
    const [audioName, setAudioName] = useState('')

    const handleAddTrack = handleSubmitTrack( async ({ author, track_name, audio }) => {
        try {
            const trackData = new FormData()
            trackData.append('author', author)
            trackData.append('track_name', track_name)
            if (audioFile) {
                trackData.append('audio', audioFile[0])
                await createTrack(trackData).unwrap()
                setAudioError('')
                setIsOpened(!isOpened)
            }
        } catch (e) {
            setAudioError('произошла ошибка при создании трека')
        }
    })

    const dragStartHandler = (e:React.DragEvent) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e:React.DragEvent) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e:React.DragEvent) => {
        e.preventDefault()
        setAudioFile([e.dataTransfer.files][0])
        setAudioName([e.dataTransfer.files][0][0].name)
        setDrag(false)
    }

    return (
        <div className={s.bar__wrapper}>
            <h4>React Audio Player</h4>
            <button onClick={() => setIsOpened(!isOpened)}>UPLOAD TRACK</button>

            <Modal isOpened={isOpened} setIsOpened={setIsOpened} title={'Upload Track'} >
                <form onSubmit={handleAddTrack}>

                    <label htmlFor={'author'} >Track Author</label>
                    <input
                        type="text"
                        id={'author'}
                        {...trackRegistration("author", {
                            required: "Поле обязательно для заполнения",
                            minLength: {
                                value: 4,
                                message: 'Минимум 4 символа'
                            },
                            maxLength: {
                                value: 40,
                                message: 'Максимум 40 символов'
                            }
                        })}
                    />
                    {
                        errorsTrack?.author &&
                                <div style={{color:'red'}}>
                                    {errorsTrack?.author.message}
                                </div>
                    }

                    <label htmlFor={'name'} >Track Name</label>
                    <input
                        type="text"
                        id={'name'}
                        {...trackRegistration("track_name", {
                            required: "Поле обязательно для заполнения",
                            minLength: {
                                value: 4,
                                message: 'Минимум 4 символа'
                            },
                            maxLength: {
                                value: 40,
                                message: 'Максимум 40 символов'
                            }
                        })}
                    />
                    {
                        errorsTrack?.track_name &&
                        <div style={{color:'red'}}>
                            {errorsTrack?.track_name.message}
                        </div>
                    }


                    <div>
                        <h4>Track Audio</h4>
                        {drag
                            ? <div
                                className={s.dropArea}
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                onDrop={e => onDropHandler(e)}
                            >Отпустите аудио, чтобы его загрузить</div>
                            : <div
                                className={s.dropAreaNotActive}
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                            >{audioName ? `${audioName}` : 'Перетащите аудио, чтобы его загрузить'}</div>
                        }
                        {audioError ? <div style={{color:'red'}}>{audioError}</div> : null}
                    </div>


                    <button type="submit" className={s.upload__btn}>UPLOAD</button>
                </form>
            </Modal>
        </div>
    )
}

export default Bar