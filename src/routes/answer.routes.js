const express = require("express");
const { validate } = require("../middleware/validate");
const { answerSchemas } = require("../Validation/answer.validation"); 

const answerRouter=express.Router();

answerRouter.post("/:type",validate(answerSchemas),
// controller function
)

answerRouter.get("/poll/:pollId",

  //controller function
)

answerRouter.delete("/:id",
  // also a controller function
)

module.exports=answerRouter;