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

export const formatAndShuffleMCQData = (data) => {
  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    let shuffled = array.slice(); // Create a copy of the array to avoid mutating the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Format the data
  const formattedData = data.map(item => ({
    _id: item._id,
    question: item.question,
    liveClassId: item.liveClassId,
    choices: item.choices.map(mcq => ({
      text: mcq.text,
      isCorrect: false,
      _id: mcq._id
    }))
  }));

  // Shuffle the formatted data and choices
  return shuffleArray(formattedData).map(item => ({
    ...item,
    choices: shuffleArray(item.choices)
  }));
};

export const formateMCQForSubmit = (data, customerId) => {
  const w = {
    liveClassId: data[0]?.liveClassId?._id,
    customerId: customerId,
    answers: data.flatMap(item =>
      item.choices
        .filter(choice => choice?.isCorrect)
        .map(choice => ({
          questionId: item?._id,
          selectedChoiceId: choice?._id
        }))
    )
  }
  return w
}

