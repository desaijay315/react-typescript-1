import { ASC, DESC, NONE } from "../constants";

let sortDirection: typeof ASC | typeof DESC | typeof NONE = NONE;


export const sortDirectionToggle = (currentDirection: typeof sortDirection): typeof ASC | typeof DESC => {
  if (currentDirection === NONE || currentDirection === DESC) {
    return ASC;
  } else {
    return DESC;
  }
};
