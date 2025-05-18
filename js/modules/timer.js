function timer(id, deadline) {
  // const deadline = new Date('2025-01-01T00:00:00');
  // Функція яка буде визначати залишок часу до кінця акції і конвертувати мілісекунди в потрібний нам фломат часу
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());

    let days, hours, minutes, seconds;

    if (t <= 0) {
      days = '0';
      hours = '0';
      minutes = '0';
      seconds = '0';
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {total: t, days, hours, minutes, seconds};
  }

  // Функція яка додає додатковий нуль цифрам що менше 10
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

export default timer;
