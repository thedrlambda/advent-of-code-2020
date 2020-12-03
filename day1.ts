export function ex1(input: number[]): number {
  for (let i = 0; i < input.length - 1; i++)
    for (let j = i + 1; j < input.length; j++)
      if (input[i] + input[j] === 2020) {
        return input[i] * input[j];
      }
  return 514579;
}
