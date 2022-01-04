const {Track} = require('./../models/models')
const ApiError = require('./../error/ApiError')
const uuid = require('uuid')
const path = require('path')


class TrackController {

    async create(req, res, next) {
        try {
            const {track_name, author} = req.body
            const {audio} = req.files

             let fileName = uuid.v4() + '.mp3'
             await audio.mv(path.resolve(__dirname, '..', 'static', fileName))

             const track = await Track.create({track_name, author, audio: fileName})
             return res.json(track)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const tracks = await Track.findAll()
        return res.json(tracks)
    }

    async getOne(req, res) {
        const {id} = req.params
        const track = await Track.findOne({where: {id}})
        return res.json(track)
    }


    async deleteOne(req, res, next) {
        try {
            const tracks = await Track.findAll({
                where: {
                    id: +req.params.id
                }
            })
            const track = tracks[0]
            await track.destroy()
            res.status(204).json({})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }




}

module.exports = new TrackController()