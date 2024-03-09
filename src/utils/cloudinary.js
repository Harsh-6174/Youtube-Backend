import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //Upload on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //File successfully uploaded, then unlink it 
        fs.unlinkSync(localFilePath)
        
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)  //Remove the locally saved temp. file from the server
        return null;
    }
}

export {uploadOnCloudinary}