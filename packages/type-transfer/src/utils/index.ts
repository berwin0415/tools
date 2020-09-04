import { isString } from "@battles/is";

export const firstToUpper = (str: string): string => {
  if (isString(str)) {
    return str.length > 1
      ? str[0].toUpperCase() + str.substring(1)
      : str.toUpperCase();
  } else {
    return "";
  }
};

export const formatJson = (str: string): string => {
  return JSON.stringify(JSON.parse(str), null, 4);
};
