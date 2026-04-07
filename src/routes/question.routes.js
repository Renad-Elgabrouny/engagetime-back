import express from "express";
import { validate } from "../middleware/validate.js";
import { createQuestionSchema } from "../Validation/question.validation.js"; 


export const questionRouter = express.Router();

questionRouter.post(
  "/create-question",
   validate(createQuestionSchema)
//    createQuestion --> from controller 

);

questionRouter.put(
  "/edit-question/:questionId",
   validate(createQuestionSchema)
//    editQuestion --> from controller
);

questionRouter.get(
    "/get-question/:id" , 
//    getQuestionByID --> from controller
);
questionRouter.get(
    "/get-questions",
//    getAllQuestion --> from controller
);

questionRouter.delete(
  "/delete-question/:id",
//    deleteQuestionByID --> from controller
);

questionRouter.delete(
  "/delete-questions",
//    deleteQuestions --> from controller
);