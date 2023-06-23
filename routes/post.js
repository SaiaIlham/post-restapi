const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

function result (succ, msg, details){
    if (details) {
        return{
            succes: succ,
            message: msg,
            data: details
        }
    }else {
        return{
            succes: succ,
            mesaage: msg
        }
    }
}

router.get('/', async(req, res) => {
    try {
        const post = await Post.aggregate([
            {
              $lookup: {
                from: 'user',
                localField: 'user_id',
                foreignField: '_id',
                as: 'userData'
              }  
            },
            {
                $set: {
                    id: '$_id',
                    username: { $arrayElemAt: ['$usserData.username, 0'] },
                    modified_date: {$dateToString: { format: '$d-%m-%Y %H:%M:%S', date: 'created_date', timezone: '+07:00'} }, 
                }
            },
            {
                $project: {
                    userDara: 0
                    _id: 0 
                }
            }
        ]);

        if (post.length > 0) {
            
        }
    }
})