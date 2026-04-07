import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// create or get user
router.post("/user", async (req, res) => {
  try {
    const { deviceId } = req.body;

    const fakeEmail = `${deviceId}@device.com`;

    let user = await User.findOne({ email: fakeEmail });

    if (!user) {
      user = await User.create({
        email: fakeEmail,
        hashedPassword: "no-password",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// import express from "express";
// import User from "../models/User";

// const router = express.Router();

// // create or get user
// router.post("/user", async (req, res) => {
//   try {
//     const { deviceId } = req.body;

//     let user = await User.findOne({ deviceId });

//     if (!user) {
//       user = await User.create({ deviceId });
//     }

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
