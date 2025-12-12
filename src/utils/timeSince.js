
const timeSince = (date) => {
  const second = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
    // console.log(second)

  let interval = Math.floor(second / 31536000); // year calculation
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = second / 2592000; // month calculation

  if(interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = second / 86400; // day calculation

  if(interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = second / 3600; // hour calculation

  if(interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = second / 60; // minute calculation

  if(interval > 1) {
    return Math.floor(interval) + " minutes";
  } 
  return Math.floor(second) + " seconds";
}

export default timeSince
