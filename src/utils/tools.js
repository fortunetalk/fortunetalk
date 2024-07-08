 export const classifyTime = (time) => {
    const [hour, minute] = time.split(':').map(Number);
  
    if (hour >= 0 && hour < 12) {
      return '(Morning)';
    } else {
      return '(Evening)';
    }
  };