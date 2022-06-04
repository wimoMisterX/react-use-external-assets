export const difference = <T>(col1: T[], col2: T[]): T[] =>
  col1.filter((x) => !col2.includes(x))
