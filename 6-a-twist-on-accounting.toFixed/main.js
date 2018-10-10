function betterToFixed(value, precision) {
  var strValue = value.toString();
  var indexOfDecimalPoint = strValue.indexOf('.');

  if (indexOfDecimalPoint < 0) {
    indexOfDecimalPoint = strValue.length;
  }

  var leftSide = strValue.substring(0, indexOfDecimalPoint);
  var rightSide = strValue.substring(indexOfDecimalPoint + 1);

  while (rightSide.length < precision) {
    rightSide += '0';
  }

  var newValue = leftSide + rightSide.substring(0, precision) + '.' + rightSide.substring(precision);
  var roundedStr = (Math.round(Number(newValue))).toString();

  while (roundedStr.length <= precision ) {
    roundedStr = '0' + roundedStr;
  }

  leftSide = roundedStr.substring(0, roundedStr.length - precision);
  rightSide = roundedStr.substring(leftSide.length);

  if (precision === 0) {
    return leftSide;
  } else {
    return leftSide + '.' + rightSide ;
  }
}
