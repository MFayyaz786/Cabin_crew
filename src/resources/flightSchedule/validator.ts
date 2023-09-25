import { FlightStatus } from '../../entities/flight';
import * as Joi from 'joi';
const addNew = Joi.object({
  scheduleDate: Joi.date().iso().required(),
  departureDate:Joi.date().iso().required(),
  arrivalDate:Joi.date().iso().required(),
  airLine:Joi.string().required(),
  flight:Joi.string().required(),
  scheduleType:Joi.string().required().valid("arrival","departure"),
  createdBy:Joi.string().required()
});
const updateFlight = Joi.object({
   flightNo: Joi.string().optional(),
  destination:Joi.string().optional(),
  origin:Joi.string().optional(),
 // boardingTime:Joi.date().required(),
  status:Joi.string().valid('in_process','not_initiated','closed').optional(),
  airLine:Joi.string().optional(),
  updatedBy:Joi.string().optional()
});
const updateFlightStatus = Joi.object({
  //flightNo:Joi.string().required(),
  flightStatus:Joi.string().required(),
});

export default {addNew,updateFlight,updateFlightStatus};
