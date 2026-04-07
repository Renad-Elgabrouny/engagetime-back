const express = require("express");
const { validate } = require("../middleware/validate");
const { resourceSchema } = require("../Validation/resource.validation"); 

const resourceRouter= express.Router();

resourceRouter.post("./",validate(resourceSchema),
// the controller function will be here
)

resourceRouter.get("/session/:sessionId"
  // controller fucntion
)

resourceRouter.get("/:id"
  // controller fucntion
)

resourceRouter.put("/:id",validate(resourceSchema),
  // controller fucntion
)

resourceRouter.delete("/:id",
  // controller fucntion
)

module.exports=resourceRouter;
