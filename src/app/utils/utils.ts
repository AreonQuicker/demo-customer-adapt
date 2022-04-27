export function tick(cb: () => void) {
  setTimeout(cb, 0);
}
type ColorType = [string, number, number];

let red: ColorType = ['red', 255, 0];
let green: ColorType = ['green', 0, 255];

red[0] = 'blue';
