import { createValidator } from "express-joi-validation";
export const parseEarnings = (s: string) => parseFloat(s.substring(1));

export const validator = createValidator();
