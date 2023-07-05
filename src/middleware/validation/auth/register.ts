import { CustomValidator } from "express-validator";

import { User } from "@db/models";
import {
  emailValidationChain,
  passwordValidationChain,
  usernameValidationChain,
} from "@middleware/validation/auth/validation-chains";
import { isStrongPasswordMessage } from "@middleware/validation/error-messages";

/**
 * Checks if a username is available.
 *
 * @param username - the desired username
 * @returns a boolean
 */
const isAvailableUsername: CustomValidator = async (
  username: string
): Promise<boolean> => {
  const record = await User.findOne({ where: { username: username } });
  if (record === null) {
    return Promise.resolve(true);
  }
  return Promise.reject();
};

/**
 * Express-Validator ValidationChains for the auth/register route
 */
const validate = [
  usernameValidationChain()
    .custom(isAvailableUsername)
    .withMessage("Already in use. Please use a different username."),
  passwordValidationChain()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(isStrongPasswordMessage),
  emailValidationChain(),
];

export default validate;
