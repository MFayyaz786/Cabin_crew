import { FlightStatus } from '../../entities/flight';
import * as Joi from 'joi';
const addNew = Joi.object({
  crews: Joi.array().min(1).required(),
  scheduledFlight:Joi.string().required(),
  flight:Joi.string().required(),
  airLine:Joi.string().required(),
  createdBy:Joi.string().required()
});
const addNewCrew = Joi.object({
  crew: Joi.string().required(),
  scheduledFlight:Joi.string().required(),
  updatedBy:Joi.string().required()
});
const updateFlight = Joi.object({
   flightNo: Joi.string().optional(),
  destination:Joi.string().optional(),
  origin:Joi.string().optional(),
  status:Joi.string().valid('in_process','not_initiated','closed').optional(),
  airLine:Joi.string().optional(),
  updatedBy:Joi.string().optional()
});
const updateFlightStatus = Joi.object({
  //flightNo:Joi.string().required(),
  flightStatus:Joi.string().required(),
});

export default {addNew,updateFlight,updateFlightStatus,addNewCrew};
