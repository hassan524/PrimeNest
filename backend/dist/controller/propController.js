"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = exports.GetUserUniqueProp = exports.getUserProperties = exports.HandleGetFav = exports.HandleAddToFav = exports.HandleGetPropertys = exports.HandleAddProperty = void 0;
const Propertys_model_1 = __importDefault(require("../models/Propertys.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const HandleAddProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const formData = req.body;
    console.log("Request Body:", formData);
    try {
        const NewProperty = new Propertys_model_1.default({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            images: formData.images,
            tags: formData.tags,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            propertyType: formData.propertyType
        });
        yield NewProperty.save();
        res.status(201).json({ message: "Property added successfully", property: NewProperty });
    }
    catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ message: "Failed to add property", error: error.message });
    }
});
exports.HandleAddProperty = HandleAddProperty;
const HandleGetPropertys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Propertys_model_1.default.find();
        res.status(200).json({ success: true, properties });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.HandleGetPropertys = HandleGetPropertys;
const HandleAddToFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const { id } = req.body;
        const userId = req.user.id;
        if (!id)
            return res.status(400).json({ message: "Property ID is required" });
        const user = yield User_model_1.default.findById(userId);
        const property = yield Propertys_model_1.default.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (!property)
            return res.status(404).json({ message: "Property not found" });
        const isAlreadyFav = user.favorites.some((fav) => fav.toString() === id);
        let message = "";
        if (isAlreadyFav) {
            user.favorites = user.favorites.filter((fav) => fav.toString() !== id);
            message = "Removed from favorites successfully";
        }
        else {
            user.favorites.push(id);
            message = "Added to favorites successfully";
        }
        yield user.save();
        res.status(200).json({
            message,
            favorites: user.favorites,
        });
    }
    catch (error) {
        console.error("Error in HandleAddToFav:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.HandleAddToFav = HandleAddToFav;
const HandleGetFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const user = yield User_model_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const favoriteProperties = yield Propertys_model_1.default.find({ _id: { $in: user.favorites } });
        return res.json({ message: "Success", favorites: favoriteProperties });
    }
    catch (error) {
        console.error("Error fetching favorite properties:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.HandleGetFav = HandleGetFav;
const getUserProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const userId = req.user.id;
        const properties = yield Propertys_model_1.default.find({ userId });
        res.json({ message: "Success", properties });
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getUserProperties = getUserProperties;
const GetUserUniqueProp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request received at /Uniqueprop with body:", req.body);
        const { propertyID, userID } = req.body;
        if (!propertyID || !userID) {
            console.log("Missing Credentials:", { propertyID, userID });
            return res.status(400).json({ message: "Credentials are required" });
        }
        console.log("🔍 Searching for Property with ID:", propertyID);
        const property = yield Propertys_model_1.default.findById(propertyID);
        if (!property) {
            console.log(" Property not found in database for ID:", propertyID);
            return res.status(404).json({ message: "Property not found" });
        }
        const user = yield User_model_1.default.findById(userID);
        if (!user) {
            console.log("User not found in database for ID:", userID);
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ property, user });
    }
    catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.GetUserUniqueProp = GetUserUniqueProp;
const Info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User_model_1.default.find();
        if (Users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        const props = yield Propertys_model_1.default.find();
        if (props.length === 0) {
            return res.status(404).json({ message: 'No properties found' });
        }
        res.status(200).json({ message: 'Information', Users, props });
    }
    catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.Info = Info;
