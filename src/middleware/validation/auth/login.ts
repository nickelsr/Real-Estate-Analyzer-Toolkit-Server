import {
  emailValidationChain,
  passwordValidationChain,
} from "@middleware/validation/auth/validation-chains";

const validate = [emailValidationChain(), passwordValidationChain()];

export default validate;
