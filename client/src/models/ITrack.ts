
export interface ITrack {
    id: number
    track_name: string
    author: string
    audio: string
    track: string
    createdAt: string
    updatedAt: string
}

export interface ITrackReq {
    track_name: string
    author: string
    audio: string
}

export interface ITrackRes {
    id: number
    track_name: string
    author: string
    audio: string
    createdAt: string
    updatedAt: string
}