export function range(from: number, to: number): number[];
export function range(to: number): number[];
export function range(arg1: number, arg2?: number) {
  if (arg2) {
    return Array.from({ length: arg2 - arg1 }, (_, k) => k + arg1);
  } else {
    Array.from({ length: arg1 }, (_, k) => k);
  }
}
