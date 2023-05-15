import { NextFunction, Request, Response } from 'express';
import { upperCaseFirst } from 'upper-case-first'; // assuming you have installed the 'upper-case-first' package

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
  // ERROR HANDLER
  console.log(err);
  if (err && err.code === 11000) {
    let errorKey = Object.keys(err['keyPattern']).toString();
    errorKey = upperCaseFirst(errorKey);
    res.status(400).send({ msg: `${errorKey} already exists` });
  }
  if (err.name === 'ValidationError') {
    // const errorMessages = Object.values(err.errors).map((val: any) => val.message);
    // const uniqueKeyErrors = Object.keys(err.errors).filter((key: string) =>
    //   err.errors[key].properties?.unique === true
    // );
    // if (uniqueKeyErrors.length > 0) {
    //   const errorKey = upperCaseFirst(uniqueKeyErrors[0]);
    //   res.status(400).send({ msg: `${errorKey} already exists` });
    // } else {
    //   res.status(400).send({ msg: errorMessages });
    // }
    res.status(400).send({
      msg: Object.values(err.errors).map((val: any) => val.message),
    });
  } else {
    res.status(400).send({ msg: err.message });
  }
};
