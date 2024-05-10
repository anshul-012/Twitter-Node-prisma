"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloudinary = exports.deleteOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: "dzclxbbwk",
    api_key: "342355561256642",
    api_secret: "jwBjAlMOl04sRp9M42zd-wCH1NQ",
});
const deleteOnCloudinary = async (public_id) => {
    await cloudinary_1.v2.uploader.destroy(public_id);
};
exports.deleteOnCloudinary = deleteOnCloudinary;
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            return null;
        //upload the file on cloudinary
        const response = await cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: "auto",
            max_bytes: 1 * 1024 * 1024,
        });
        fs_1.default.unlinkSync(localFilePath);
        return response;
    }
    catch (error) {
        fs_1.default.unlinkSync(localFilePath);
        return null;
    }
};
exports.uploadOnCloudinary = uploadOnCloudinary;
