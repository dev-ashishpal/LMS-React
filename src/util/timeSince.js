export const timeSince = (date) => {
  let seconds = Math.floor((new Date() - date) / 1000);


    const timer = (interval, value) => {
        if (interval > 1) {
            if (Math.floor(interval) === 1) {
                console.log(value);
                return Math.floor(interval) + `${value}`;
            } else if (Math.floor(interval) > 1) {
                console.log(value);
                return Math.floor(interval) + `${value}s`;
            }
        }
    }

  let interval = seconds / 31536000;
    // timer(interval,'year');
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " year";
    } else if (Math.floor(interval) > 1) {
      return Math.floor(interval) + " years";
    }
  }
  interval = seconds / 2592000;
    // timer(interval,'month');
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " month";
    } else if (Math.floor(interval) > 1) {
      return Math.floor(interval) + " months";
    }
  }

  interval = seconds / 86400;
    // timer(interval,'day');
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " day";
    } else if (Math.floor(interval) > 1) {
      return Math.floor(interval) + " days";
    }
  }
  interval = seconds / 3600;
  // timer(interval, 'hour');
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + " hour";
    } else if (Math.floor(interval) > 1) {
      return Math.floor(interval) + " hours";
    }
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min";
  }
  return Math.floor(seconds) + " sec";
};
