function isValid(conf: {
  policy: { min: number; max: number; char: string };
  password: string;
}) {
  let count = 0;
  for (let i = 0; i < conf.password.length; i++) {
    if (conf.password.charAt(i) === conf.policy.char) {
      count++;
    }
  }
  return conf.policy.min <= count && count <= conf.policy.max;
}

export function ex1core(
  input: {
    policy: { min: number; max: number; char: string };
    password: string;
  }[]
) {
  let valid = 0;
  for (let i = 0; i < input.length; i++)
    if (isValid(input[i])) {
      valid++;
    }
  return valid;
}
