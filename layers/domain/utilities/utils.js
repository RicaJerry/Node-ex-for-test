
  const diffInOutTime = (date1, date2) => {
  // Le cas où date de checkin est 0
  if(!date1) {
    return 0;
  }
  return date2.getTime() - date1.getTime();
}

  module.exports = {
    diffInOutTime
  }