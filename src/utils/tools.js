export const classifyTime = (time) => {
  const [hour, minute] = time.split(':').map(Number);

  if (hour >= 0 && hour < 12) {
    return '(Morning)';
  } else {
    return '(Evening)';
  }
};

export const classifyTimeNoon = (time) => {
  const [hour, minute] = time.split(':').map(Number);

  if (hour >= 0 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

export const check_current_day = ({ date = new Date(), type = 'equal' }) => {
  try {
    const targetDate = new Date(moment(date).format('YYYY-MM-DD'));
    const today = new Date();
    if (type == 'equal') {
      if (
        targetDate.getDate() === today.getDate() &&
        targetDate.getMonth() === today.getMonth() &&
        targetDate.getFullYear() === today.getFullYear()
      ) {
        return true;
      }
      return false;
    } else if (type == 'greater') {
      if (
        targetDate.getDate() >= today.getDate() &&
        targetDate.getMonth() >= today.getMonth() &&
        targetDate.getFullYear() >= today.getFullYear()
      ) {
        return true;
      }
      return false;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
