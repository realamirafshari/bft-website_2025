import { compare, hash } from "bcryptjs";

const hashValue = async (value) => {
  const hashedPassword = await hash(value, 16);
  return hashedPassword;
};

const verifyValue = async (value, hashedValue) => {
  const isValid = await compare(value, hashedValue);
  return isValid;
};

export { hashValue, verifyValue };