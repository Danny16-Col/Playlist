import Playlist from '../models/Playlist.js';

// create playlist
export const createPlaylist = async (req, res) => {
    try {
        const { title, description, song } = req.body;

        const exists = await Playlist.findOne({ title });
        if (exists) return res.status(401).json({ message: 'Playlist already exists' });

        const playlist = await Playlist.create({
            title,
            description,
            song,
            author: req.user._id,
        });
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Playlist list
export const getPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.find().populate('author', 'username');
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get playlist by ID
export const getPlaylistByID = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('author', 'username');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update playlist
export const updatePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        if (playlist.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You cannot edit this playlist' });
        }
        Object.assign(playlist, req.body);
        await playlist.save();
        res.json({ playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete playlist
export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        if (playlist.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'you cannot delete this playlist' });
        }
        await playlist.deleteOne();
        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// vote playlist
export const votePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        if (playlist.voters.includes(req.user._id)) {
            return res.status(400).json({ message: 'You voted for this playlist' });
        }
        playlist.votes += 1;
        playlist.voters.push(req.user._id);
        await playlist.save();
        res.json({ message: 'Registered vote', vote: playlist.voters });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get playlist ranking
export const getRanking = async (req, res) => {
    try {
        const ranking = await Playlist.find()
            .sort({ votes: -1 })
            .limit(10)
            .populate('author', 'username');
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};