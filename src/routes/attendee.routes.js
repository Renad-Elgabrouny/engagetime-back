import express from "express";
import { validate } from "../middleware/validate.js";
import { attendeeSchemas } from "../Validation/attendee.validation"; 


export const attendeeRouter  = express.Router();

attendeeRouter.post(
  "/new-attendee",
   validate(attendeeSchemas)
//    newAttendees --> from controller 
);

attendeeRouter.put(
  "/attendee/:deviceId",
   validate(attendeeSchemas)
//    editAttendees --> from controller
);

attendeeRouter.get(
    "/attendees/:deviceId" , 
//    getAttendeesByID --> from controller
);
attendeeRouter.get(
    "/get-attendees",
//    getAllAttendees --> from controller
);

attendeeRouter.delete(
  "/delete-attendee/:id",
//    deleteAttendeesByID --> from controller
);
