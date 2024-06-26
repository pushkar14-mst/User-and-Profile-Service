import { Request, Response } from "express";
import { createProfile, getProfile, updateProfile } from "../db/profiles-db";
import { v4 as uuidv4 } from "uuid";

export const createUserProfile = async (req: Request, res: Response) => {
  const { first_name, last_name, contact_number, bio, address } = req.body;
  const user_id = req.user.jwtUserObj.id;
  const profile_id = uuidv4();
  try {
    const profile = await createProfile({
      profile_id,
      user_id,
      first_name,
      last_name,
      contact_number,
      bio,
      address,
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error("Create profile error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during profile creation." });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const updateParams = req.body.updateParams;
  const user_id = req.user.jwtUserObj.id;
  try {
    const profile = await updateProfile(user_id, updateParams);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during profile update." });
  }
};

export const getCurrentUserProfile = async (req: Request, res: Response) => {
  try{
    const user_id = req.user.jwtUserObj.id;
    console.log("user_id", user_id);
    const profile = await getProfile(user_id);
    console.log("profile", profile);
    res.status(200).json(profile);
  }
  catch(error){
    console.error("Get profile error:", error);
    res.status(500).json({ message: "An error occurred during profile retrieval." });
  }
};

export const getProfileByUserIdReq = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log("user_id", userId);
  try {
    const profile = await getProfile(userId);
    console.log("profile", profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Get profile by user error:", error);
    res.status(500).json({ message: "An error occurred during profile retrieval." });
  }
};