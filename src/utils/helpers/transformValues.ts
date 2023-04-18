// function transformValues(obj: any, ...exceptionKeys: [String]): any {
function transformValues(
  obj: Record<string, any>,
  ...exceptionKeys: (string | [])[]
): any {
  // Iterate over the keys of the object
  for (const key of Object.keys(obj)) {
    // Check if the key is in the exception list
    if (key === 'postCode') {
      console.log('exceptionKeys', exceptionKeys);
      console.log('exceptionKeys.includes(key)', exceptionKeys.includes(key));
    }
    if (exceptionKeys.includes(key)) {
      continue;
    }
    // Check if the value is a string
    if (typeof obj[key] === 'string') {
      // Check if the string looks like a number
      if (!isNaN(Number(obj[key]))) {
        // Convert the string to a number
        obj[key] = Number(obj[key]);
      } else if (obj[key] === 'true') {
        obj[key] = true;
      }
    }
    // Check if the value is an object
    else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively transform the values in the object
      obj[key] = transformValues(obj[key], ...exceptionKeys);
    }
  }

  return obj;
}

export default transformValues;
