import { SortingOrder, sortDirection } from "../../common/types";
import { ASC, DESC, NONE } from "../constants";


export const sortDirectionToggle = (currentDirection: sortDirection): SortingOrder => {
  if (currentDirection === NONE || currentDirection === DESC) {
    return ASC;
  } else {
    return DESC;
  }
};
