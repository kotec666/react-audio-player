import React, {useState} from 'react'
import s from './Bar.module.css'
import Modal from "../Modal/Modal"

const Bar = () => {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className={s.bar__wrapper}>
            <h4>React Audio Player</h4>
            <button onClick={() => setIsOpened(!isOpened)}>UPLOAD TRACK</button>

            <Modal isOpened={isOpened} setIsOpened={setIsOpened} title={'Upload Track'} >
                <form>
                    <label htmlFor={'author'} >Track Author</label>
                    <input type="text" id={'author'}/>

                    <label htmlFor={'name'} >Track Name</label>
                    <input type="text" id={'name'}/>


                    <div>
                        <h4>Track Audio</h4>
                        <label htmlFor={'audio'} className={s.choose__btn} >CHOOSE AUDIO</label>
                        <input hidden={true} type="file" id={'audio'}/>
                    </div>


                    <button className={s.upload__btn}>UPLOAD</button>
                </form>
            </Modal>
        </div>
    )
}

export default Bar