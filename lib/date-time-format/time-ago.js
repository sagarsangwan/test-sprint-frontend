export function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000); // Difference in seconds

  if (diffInSeconds < 0) {
    return "in the future";
  }

  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const WEEK = 604800;
  const MONTH = 2592000;
  const YEAR = 31536000;

  let timeUnit;
  let timeValue;

  if (diffInSeconds < MINUTE) {
    timeValue = diffInSeconds;
    timeUnit = "second";
  } else if (diffInSeconds < HOUR) {
    timeValue = Math.floor(diffInSeconds / MINUTE);
    timeUnit = "minute";
  } else if (diffInSeconds < DAY) {
    timeValue = Math.floor(diffInSeconds / HOUR);
    timeUnit = "hour";
  } else if (diffInSeconds < MONTH) {
    timeValue = Math.floor(diffInSeconds / DAY);
    timeUnit = "day";
  } else if (diffInSeconds < YEAR) {
    timeValue = Math.floor(diffInSeconds / MONTH);
    timeUnit = "month";
  } else {
    timeValue = Math.floor(diffInSeconds / YEAR);
    timeUnit = "year";
  }

  // Handle pluralization
  const unitText = timeValue === 1 ? timeUnit : `${timeUnit}s`;

  return `${timeValue} ${unitText} ago`;
}
