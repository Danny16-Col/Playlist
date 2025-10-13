import Playlist from '../models/Playlist.js';
import AppError from '../utils/AppError.js';

// create playlist
export const createPlaylist = async (req, res, next) => {
    try {
        const { title, description, song } = req.body;

        const exists = await Playlist.findOne({ title });
        if (exists) return next(new AppError('Playlist already exists',409))

        const playlist = await Playlist.create({
            title,
            description,
            song,
            author: req.user._id,
        });
        res.status(201).json(playlist);
    } catch (error) {
        next(error);
    }
};

// Playlist list
export const getPlaylist = async (req, res, next) => {
    try {
        const playlist = await Playlist.find().populate('author', 'username');
        res.json(playlist);
    } catch (error) {
        next(error);
    }
};

// Get playlist by ID
export const getPlaylistByID = async (req, res, next) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('author', 'username');
        if (!playlist) return next(new AppError('Playlist not found',404));
        res.json(playlist);
    } catch (error) {
        next(error);
    }
};

// Update playlist
export const updatePlaylist = async (req, res, next) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return next(new AppError('Playlist not found',404))
        if (playlist.author.toString() !== req.user._id.toString()) {
            return next(new AppError('You cannot edit this playlist',403));
        }
        Object.assign(playlist, req.body);
        await playlist.save();
        res.json({ 
            message:'Playlist updated successfully',
            playlist });
    } catch (error) {
        next(error);
    }
};

// Delete playlist
export const deletePlaylist = async (req, res, next) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return next(new AppError('Playlist not found',404))
        if (playlist.author.toString() !== req.user._id.toString()) {
            return next(new AppError('you cannot delete this playlist',403));
        }
        await playlist.deleteOne();
        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// vote playlist
export const votePlaylist = async (req, res, next) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return next(new AppError('Playlist not found', 404))
        if (playlist.voters.some(voter => voter.toString() === req.user._id.toString())) {
            return next(new AppError('You already voted for this playlist',400));
        }
        playlist.votes += 1;
        playlist.voters.push(req.user._id);
        await playlist.save();
        res.json({ message: 'Registered vote', vote: playlist.voters });
    } catch (error) {
        next(error);
    }
};

// get playlist ranking
export const getRanking = async (req, res, next) => {
    try {
        const ranking = await Playlist.find()
            .sort({ votes: -1 })
            .limit(10)
            .populate('author', 'username');
        res.json(ranking);
    } catch (error) {
        next(error);
    }
};