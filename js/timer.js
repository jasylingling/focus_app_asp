
let seconds = 1500; // 25 minutes * 60 seconds = 1500 seconds
let timer;
let isPaused = true;
let isPomodoro = true;
let isShortBreak = false;
let isLongBreak = false;

const startPauseButtons = document.querySelectorAll(".timer-countdown button");
const displays = document.querySelectorAll(".timer-countdown h3");

startPauseButtons.forEach(button => {
  button.addEventListener("click", function() {
    if (isPaused) {
      startPauseButtons.forEach(b => {b.innerHTML = "Pause";})
      
      isPaused = false;
      timer = setInterval(function() {
        seconds--;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.querySelector('[data-ui="#modal-timer"]').innerHTML = `<i class="small-padding" aria-label="link to timer">timer</i>${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
        displays.forEach(display => {
          display.innerHTML = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
        })    
        if (seconds === 0) {
          clearInterval(timer);
        }
      }, 1000);
    } else {
      resetAll()
    }
  });
})

const optionButtons = document.querySelectorAll('.timer-option button')
optionButtons.forEach(optionButton => {
  
  optionButton.addEventListener('click', e => {
    optionButtons.forEach(b => b.classList.remove('fill'))
    optionButtons.forEach(b => b.classList.add('border'))
    const text = optionButton.innerText
    setClickedButton(text)
    if(text == 'Pomodoro') {
      console.log('Pomodoro')
      if (!isPomodoro) {
        resetAll()
        isPomodoro = true
        isShortBreak = false
        isLongBreak = false
        clearInterval(timer)
        seconds = 1500; // 25 minutes * 60 seconds = 1500 seconds
        resetDisplay('25:00')
      } 
    } else if (text =='Short Break') {
      console.log('Short Break')
      if (!isShortBreak) {
        resetAll()
        isPomodoro = false
        isShortBreak = true
        isLongBreak = false
        clearInterval(timer)
        seconds = 300; // 5 minutes * 60 seconds = 300 seconds
        resetDisplay('5:00')
      }
    } else if (text =='Long Break') {
      console.log('Long Break')
      if(!isLongBreak) {
        resetAll()
        isPomodoro = false
        isShortBreak = false
        isLongBreak = true
        clearInterval(timer)
        seconds = 900; // 15 minutes * 60 seconds = 300 seconds
        resetDisplay('15:00')
      }
    }
  })
})

function resetAll () {
  document.querySelector('[data-ui="#modal-timer"]').innerHTML = `<i class="small-padding" aria-label="link to timer">timer</i>Timer`
  startPauseButtons.forEach(b => {b.innerHTML = "Start";})
  isPaused = true;
  clearInterval(timer);
}

function resetDisplay (time) {
  displays.forEach(display => {
    display.innerHTML = time ;
  })  
}

function setClickedButton (buttonText) {
  optionButtons.forEach(btn => {
    if (btn.innerText == buttonText) {
      btn.classList.add('fill')
      btn.classList.remove('border')
    }
  })
}
