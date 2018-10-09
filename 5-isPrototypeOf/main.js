function isPrototypeOf(myPrototype, myObject) {
  if (!myPrototype) {
    throw new TypeError('First argument must be truthy.')
  }

  if (myObject && Object(myObject) === myObject) {
    if (myPrototype === myObject) {
      return true;
    } else {
      return isPrototypeOf(myPrototype, Object.getPrototypeOf(myObject))
    }
  } else {
    return false;
  }
}
