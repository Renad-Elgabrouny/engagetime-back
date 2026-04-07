import { Router } from "express";
import { validateSpeaker } from "../validation/speaker.validation.js";


export const speakerRouter = Router();



speakerRouter.get("/me" , async (req, res) => {
  try {
    // we use findById to get the full speaker document from the DB
    // we exclude passwordHash
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



speakerRouter.get("/:id", async (req, res) => {
  try {
    //return only the public-facing info of a speaker
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



speakerRouter.patch("/me", validateSpeaker("update", req.body),async (req, res) => {
  try {
    // user auth middleware on this 
    //update name, bio, links, awards
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



speakerRouter.patch("/me/avatar", upload.single("avatar"), async (req, res) => {

  try {
    // user auth middleware on this 
    // use multer to upload photo in order for speaker to change photo
 
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


speakerRouter.delete("/me",async (req, res) => {
  try {
    // use auth middleware on this
    // delete speaker record and delete all their seessions, questions, answeres, activities etc...
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});