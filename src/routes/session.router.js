import { Router } from "express";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getSession,
  updateSession,
} from "../controllers/session.controller.js";
import { createSessionSchema } from "../Validation/session.validation.js";
import { validate } from "../middleware/validate.js";

export const sessionRouter = Router();

sessionRouter.get("/", async (req, res) => {
  // let userId = req.user.id;
  try {
    let userId = "69c81af9d2a5ef61e0ac2498";
    let sessions = await getAllSessions(userId);
    res.status(200).json(sessions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

sessionRouter.post("/", validate(createSessionSchema), async (req, res) => {
  try {
    // let userId = req.user.id;
    const userId = "69c81af9d2a5ef61e0ac2498";
    console.log(req.body);
    const { title, accessType, state } = req.body;
    if (!title || !accessType || !state) {
      return res.status(400).json({ message: "Bad request" });
    }
    //TODO: Create a function in controller that checks the accesstype first
    // if access type is private, generate random id, and store it as code in session
    const session = await createSession({ title, accessType, state, userId });
    res.status(201).json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

sessionRouter.get("/:id", async (req, res) => {
  try {
    // let userId = req.user.id;
    const userId = "69c81af9d2a5ef61e0ac2498";
    const sessionId = req.params.id;
    console.log(sessionId);
    const session = await getSession(sessionId, userId);
    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }
    res.status(200).json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

sessionRouter.put("/:id", validate(createSessionSchema), async (req, res) => {
  try {
    // let userId = req.user.id;
    const userId = "69c81af9d2a5ef61e0ac2498";
    const sessionId = req.params.id;
    const { title, accessType, state } = req.body;
    const session = await updateSession(
      sessionId,
      { title, accessType, state },
      userId,
    );
    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }
    res.status(200).json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

sessionRouter.delete("/:id", async (req, res) => {
  try {
    const userId = "69c81af9d2a5ef61e0ac2498";
    const sessionId = req.params.id;
    const session = await deleteSession(sessionId, userId);
    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

sessionRouter.get("/join/:slug", async (req, res) => {
  try {
    // TODO:
    // return session public information
    // if session is private return { requiresCode: true } with response
    // frontend shows an extra input field for the code
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

sessionRouter.post("/join/:slug", async (req, res) => {
  try {
    // TODO:
    // check if the entered code is correct
    // if code is correct return the full session data
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
