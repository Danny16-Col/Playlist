import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
    createPlaylist,
    getPlaylist,
    getPlaylistByID,
    updatePlaylist,
    deletePlaylist,
    votePlaylist,
    getRanking
} from '../controllers/playlistControllers.js'

const router = express.Router();

router.get('/', getPlaylist);
router.get('/ranking/top', getRanking);
router.get('/:id', getPlaylistByID);

router.post('/', protect, createPlaylist);
router.put('/:id', protect, updatePlaylist);
router.delete('/:id', protect, deletePlaylist);
router.post('/:id/vote', protect, votePlaylist);

export default router;