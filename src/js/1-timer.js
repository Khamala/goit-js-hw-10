
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
// console.log(flatpickr);

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// console.log(iziToast);

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
            // alert("Please choose a date in the future");
             iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
      });
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
    
    const timerId = setInterval(updateTimer, 1000);
    updateTimer();

    function updateTimer() {
        const timeForTimer = userSelectedDate - new Date();

         if (timeForTimer <= 0) {
             clearInterval(timerId);
             btnStart.removeAttribute('disabled');
             input.removeAttribute('disabled');

            return;
        };

        const { days, hours, minutes, seconds } = convertMs(timeForTimer);

        display.day.textContent = addLeadingZero(days);
        display.hours.textContent = addLeadingZero(hours);
        display.minutes.textContent = addLeadingZero(minutes);
        display.seconds.textContent = addLeadingZero(seconds);

         // Деактивировать кнопку и инпут
        btnStart.setAttribute('disabled', 'disabled');
        input.setAttribute('disabled', 'disabled');
    };
    
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};
