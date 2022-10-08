export const formatDate = data => {
  let dateTimeString = '';
  const today = new Date();
  if (
    today.getFullYear() !== data.getFullYear() ||
    today.getMonth() !== data.getMonth() ||
    today.getDate() !== data.getDate()
  ) {
    dateTimeString =
      data.getDate() +
      '/' +
      (data.getMonth() + 1) +
      '/' +
      data.getFullYear().toString().slice(2, 4) +
      ' ';
  }
  var hours = data.getHours();
  var minutes = data.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  dateTimeString = dateTimeString + hours + ':' + minutes + ' ' + ampm;
  return dateTimeString;
};
