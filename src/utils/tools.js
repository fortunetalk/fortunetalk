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
