export default (pre: string, input: any, addToPre: boolean): string => {
  const array = pre.split(",");
  if (array.length === 0) {
    return "#";
  }
  if (addToPre) {
    return `${pre},${input}`;
  } else {
    if (pre.startsWith("#,2")) {
      return "#,2";
    }
    if (array.includes("2")) {
      array.splice(array.indexOf("2"), 1);
      return array.join(",");
    } else {
      return "#";
    }
  }
};
