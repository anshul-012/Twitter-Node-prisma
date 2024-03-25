import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
	cloud_name: "dzclxbbwk",
	api_key: "342355561256642",
	api_secret: "jwBjAlMOl04sRp9M42zd-wCH1NQ",
});
export const deleteOnCloudinary = async (public_id:string) => {
	await cloudinary.uploader.destroy(public_id);
};

export const uploadOnCloudinary = async (localFilePath:string) => {
	try {
		if (!localFilePath) return null;
		//upload the file on cloudinary
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
			max_bytes: 1 * 1024 * 1024,
		});

		fs.unlinkSync(localFilePath);

		return response;
	} catch (error) {
		fs.unlinkSync(localFilePath);
		return null;
	}
};
