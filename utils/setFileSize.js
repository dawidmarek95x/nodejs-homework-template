const setFileSize = (amount, unit) => {
  const DATA_MULTIPLIER = 1024;
  if (typeof +amount !== "number") {
    return 0;
  }

  if (typeof unit !== "string") {
    return amount;
  }

  if (unit.toLowerCase() === "kilobyte" || unit === "kB") {
    return amount * DATA_MULTIPLIER;
  }

  if (unit.toLowerCase() === "megabyte" || unit === "MB") {
    return amount * DATA_MULTIPLIER ** 2;
  }

  if (unit.toLowerCase() === "gigabyte" || unit === "GB") {
    return amount * DATA_MULTIPLIER ** 3;
  }

  if (unit.toLowerCase() === "terabyte" || unit === "TB") {
    return amount * DATA_MULTIPLIER ** 4;
  }

  return amount;
};

module.exports = setFileSize;
