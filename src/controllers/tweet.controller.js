import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {tweetContent} = req.body

    if(!tweetContent)
    {
        throw new ApiError(400, "Tweet content is required")
    }

    try {
        const newTweet = await Tweet.create({
            owner: req.user?._id,
            content: tweetContent
        })

        if(!newTweet)
        {
            throw new ApiError(400, "Unable to create tweet")
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                newTweet,
                "Tweet created successfully"
            )
        )
    } 
    catch (error) {
        throw new ApiError(401, error?.message || "Unable to create tweet")
    }
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params
    const {tweetContent} = req.body

    if(!tweetId)
    {
        throw new ApiError(400, "Tweet Id is required")
    }

    if(!tweetContent)
    {
        throw new ApiError(400, "Tweet content is required")
    }

    try {
        const tweet = await Tweet.findById(tweetId)

        if(!tweet)
        {
            throw new ApiError(400, "Tweet doesn't exist")
        }

        if(tweet.owner.toString() !== req.user?._id.toString())
        {
            throw new ApiError(300, "Unauthorized access")
        }

        const updatedTweet = await Tweet.findByIdAndUpdate(
            tweetId,
            {
                $set:{
                    content: tweetContent
                }
            },
            {
                new: true
            }
        )
        
        if(!updatedTweet)
        {
            throw new ApiError(500, "Unable to update tweet")
        }    

        return res.status(200).json(
            200,
            updatedTweet,
            "Tweet updated successfully"
        )

    } 
    catch (error) {
        throw new ApiError(500, error?.message || "Unable to update tweet")
    }
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params

    if(!tweetId)
    {
        throw new ApiError(400, "Tweet Id is required")
    }

    try {
        const tweet = await Tweet.findById(tweetId)
        
        if(!tweet)
        {
            throw new ApiError(404, "Tweet doesn't exist")
        }

        if(tweet.owner.toString() !== req.user?._id.toString())
        {
            throw new ApiError(300, "Unauthorized access")
        }

        const deletedTweet = await Tweet.findByIdAndDelete(tweetId)

        if(!deletedTweet)
        {
            throw new ApiError(500, "Unable to delete tweet")
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Tweet deleted successfully"
            )
        )
    } 
    catch (error) {
        throw new ApiError(500, error?.message || "Unable to delete tweet")
    }
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}