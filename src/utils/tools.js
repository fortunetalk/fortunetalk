import moment from "moment";

export const classifyTime = (time) => {
  const [hour, minute] = time?.split(':').map(Number);

  if (hour >= 0 && hour < 12) {
    return '(Morning)';
  } else {
    return '(Evening)';
  }
};

export const classifyTimeNoon = (time) => {
  if (!time) return '-';

  const [hour, minute] = time.split(':').map(Number);

  if (hour >= 0 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Afternoon';
  } else if (hour >= 17 && hour < 24) {
    return 'Evening';
  } else {
    return 'Invalid time';
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

