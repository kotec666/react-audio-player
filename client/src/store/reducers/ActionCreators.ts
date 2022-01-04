import axios from "axios"
import {ITrack} from "../../models/ITrack"
import {createAsyncThunk} from "@reduxjs/toolkit"



 export const fetchTracks = createAsyncThunk(
     'track/fetchAll',
     async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITrack>(`http://localhost:5000/api/track`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить треки')
        }
     }
 )