import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 200
    },
    song: [
        {
        type: String,
        required: true
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        dafault: Date.now
    },
    votes:{
        type:Number,
        default:0
    },
    voters:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        }
    ]

});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;