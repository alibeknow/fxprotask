import * as Joi from "joi";
import express from "express";
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";

const app = express();
const validator = createValidator();

const querySchema = Joi.object({
  name: Joi.string().required(),
});

interface HelloRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    name: string;
  };
}

app.get("/hello", validator.body(querySchema), (req: ValidatedRequest<HelloRequestSchema>, res) => {
  // Woohoo, type safety and intellisense for req.query!
  res.end(`Hello ${req.query.name}!`);
});

app.listen(3000);
