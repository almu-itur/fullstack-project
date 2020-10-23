import { RequestHandler } from "express";

const sample: RequestHandler = (req, res, next) => {
  res.locals.sample = "Almu";
  //   next();
  res.status(200).send("hey");
};

export default sample;
