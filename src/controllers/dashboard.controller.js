import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const {userId} = req.user?._id
    
    try {
        const videos = await Video.find(
            {
                owner: userId
            }
        )

        if(!videos || videos.length === 0)
        {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    videos,
                    "No videos uploaded by the user"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                videos,
                "All videos fetched sucessfully"
            )
        )

    } 
    catch (error) {
        throw new ApiError(400, error?.message || "Error while fetching videos")
    }
})

export {
    getChannelStats, 
    getChannelVideos
}