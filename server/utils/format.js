const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// TODO: replace with moment.js
/** Formats day of month (e.g., 13, 31) into correct format '13th', '31st' */
function formatDay(day) {
  if (day % 10 === 1) return `${day}st`;
  if (day < 20 && day > 10) return `${day}th`;
  if (day % 10 === 2) return `${day}nd`;
  return `${day}rd`;
}

module.exports = {
  formatDay,
  monthNames,
};
