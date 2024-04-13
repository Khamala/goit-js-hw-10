import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

// console.log(flatpickr);

const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    // onClose() вызывается каждый раз при закрытии окошка календарика
    onClose(selectedDates) {
        // console.log(selectedDates[0]);

        // Если дата меньше текущей, то вешаю атрибут на кнопку или 
        // удаляю атт disable  и тогда присваиваю в переменную значение выбранной даты в млсек
        if (selectedDates[0] <= options.defaultDate) {
            btnStart.setAttribute('disabled', 'disabled');
            alert("Please choose a date in the future");
        } else {
            btnStart.removeAttribute('disabled');

            userSelectedDate = selectedDates[0];
        }
  },
};

const instance = flatpickr(dateTimePicker, options);
// console.log(instance);

btnStart.addEventListener('click', handlerStart);


const display = {
    day: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

function handlerStart() {
    if (!userSelectedDate) {
        return;
    };

    const timeForTimer = userSelectedDate - new Date();

    const timerId = setInterval(() => {
        // Мне нужно время текущее и время выбранное, их разницу
        const { days, hours, minutes, seconds } = convertMs(timeForTimer);

        const convertTime = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
        
        display.day.textContent = addLeadingZero(convertTime.days);
        display.hours.textContent = addLeadingZero(convertTime.hours);
        display.minutes.textContent = addLeadingZero(convertTime.minutes);
        display.seconds.textContent = addLeadingZero(convertTime.seconds);

        // Деактивировать кнопку и инпут
        btnStart.setAttribute('disabled', 'disabled');
        input.setAttribute('disabled', 'disabled');

    }, 1000);
    
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

