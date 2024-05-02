const controls = () => {
  // Global flag to check if timer is running
  let countDownRunning = false
  let sessionCountRunning = true
  let breakCountRunning = false

  //   alarm
  const alarm = new Audio("public/clock-alarm-8761.mp3")
  // break length and session length timer display divs
  const displayBreakTimer = document.getElementById("breakCtn__breakTime")
  const displaySessionTimer = document.getElementById("sessionCtn__sessionTime")

  //   timer header text
  const timerHeaderText = document.getElementById("sessionheader")

  //   count down timer display spans
  const countDownsessionTime = document.getElementById("timeLeft")
  const countDownSeconds = document.getElementById("timeRight")

  //   Play, Pause and Reset buttons
  const pausePlay = document.querySelector(".pausePlay")
  const reset = document.querySelector(".reset")

  //   break length buttons
  const breakBtn_up = document.querySelector(".breakCtn__button-up")
  const breakBtn_down = document.querySelector(".breakCtn__button-down")

  //   session length controls
  const sesstionBtn_up = document.querySelector(".sessionCtn__button-up")
  const sesstionBtn_down = document.querySelector(".sessionCtn__button-down")

  //   users declared break and session sessionTime saved
  //   this is used reset sessionTime at the end of each session or break
  //   to users preferece
  let userSession = 25
  let userBreak = 5

  // default timers declared
  let sessionTime = userSession
  let seconds = 0
  let breakTime = userBreak

  //   displaying Session and Break timers
  displayBreakTimer.textContent = breakTime
  displaySessionTimer.textContent = sessionTime

  //   displaying CountDown timers
  countDownsessionTime.textContent = sessionTime.toString().padStart(2, "0")
  countDownSeconds.textContent = seconds.toString().padStart(2, "0")

  //   adding event listeners to break length control buttons
  breakBtn_up.addEventListener("click", () => {
    if (userBreak === 60) {
      return
    }
    userBreak++
    breakTime = userBreak
    displayBreakTimer.textContent = breakTime

    // makes live change to the countdown if it Break
    if (timerHeaderText.textContent === "Break") {
      seconds = 0
      countDownsessionTime.textContent = breakTime.toString().padStart(2, "0")
      countDownSeconds.textContent = seconds.toString().padStart(2, "0")
    }
  })

  breakBtn_down.addEventListener("click", () => {
    if (userBreak === 1) {
      return
    }
    userBreak--
    breakTime = userBreak
    displayBreakTimer.textContent = breakTime

    // makes live change to the countdown if it Break
    if (timerHeaderText.textContent === "Break") {
      seconds = 0
      countDownsessionTime.textContent = breakTime.toString().padStart(2, "0")
      countDownSeconds.textContent = seconds.toString().padStart(2, "0")
    }
  })

  //   adding event listeners to session length control buttons
  sesstionBtn_up.addEventListener("click", () => {
    if (userSession == 60) {
      return
    }

    userSession++
    sessionTime = userSession
    displaySessionTimer.textContent = sessionTime
    if (timerHeaderText.textContent === "Session") {
      seconds = 0
      countDownsessionTime.textContent = sessionTime.toString().padStart(2, "0")
      countDownSeconds.textContent = seconds.toString().padStart(2, "0")
    }
  })

  sesstionBtn_down.addEventListener("click", () => {
    if (userSession === 1) {
      return
    }
    userSession--
    sessionTime = userSession
    displaySessionTimer.textContent = sessionTime

    if (timerHeaderText.textContent === "Session") {
      seconds = 0
      countDownsessionTime.textContent = sessionTime.toString().padStart(2, "0")
      countDownSeconds.textContent = seconds.toString().padStart(2, "0")
    }
  })

  //   countDown functions

  // 1  Session function

  let sessionCountdown

  const CountDownSession = () => {
    // changes the header to Session
    timerHeaderText.textContent = "Session"

    sessionCountdown = setInterval(() => {
      // if Time is less than 2 min make the text color of the timers and header red
      if (sessionTime < 2) {
        document.getElementById("countDownTime").style.color = "red"
        timerHeaderText.style.color = "red"
      }
      // if Time is more than 2 min make the text color of the timers and header white
      if (sessionTime > 2) {
        document.getElementById("countDownTime").style.color = "white"
        timerHeaderText.style.color = "#4b4453"
      }
      if (seconds === -1 && sessionTime > -1) {
        countDownsessionTime.textContent = (sessionTime - 1)
          .toString()
          .padStart(2, "0")
        countDownSeconds.textContent = 59

        seconds = 59 - 1
        sessionTime--
        return
      }
      countDownsessionTime.textContent = sessionTime.toString().padStart(2, "0")
      countDownSeconds.textContent = seconds.toString().padStart(2, "0")

      if (seconds > -1) {
        seconds--
      }

      //   this is when the timer get to 00:00 then it ends the session and reset sessionTime
      // then it calls the Break function
      if (sessionTime.toString().padStart(2, "0") == "00" && seconds == -1) {
        countDownsessionTime.textContent = "00"
        countDownSeconds.textContent = "00"
        // stops breakSetInterval func
        clearInterval(sessionCountdown)
        // locks playpause and reset keys
        pausePlay.disabled = true
        // reset Global flags by setting sessionCountRunning to false
        sessionCountRunning = !sessionCountRunning
        // sets sessionCountRunning to true
        breakCountRunning = !breakCountRunning
        breakTime = userBreak

        setTimeout(() => {
          document
            .getElementById("sessionTimer_wrapper")
            .classList.toggle("alarm")
          alarm.play()
        }, 1000)
        // displays break and prepares for switch
        setTimeout(() => {
          timerHeaderText.textContent = "Break"
          countDownsessionTime.textContent = breakTime
            .toString()
            .padStart(2, "0")
          countDownSeconds.textContent = "00"
        }, 1500)

        // starts breakCountDown after 4 seconds
        setTimeout(() => {
          document
            .getElementById("sessionTimer_wrapper")
            .removeAttribute("class")
          pausePlay.disabled = false
          breakCountDown()
        }, 2000)
      }
    }, 1000)
  }

  //   2 Break function

  let breakCountdown

  const breakCountDown = () => {
    //   break Interval countdown

    // changes the header to Break
    timerHeaderText.textContent = "Break"

    breakCountdown = setInterval(() => {
      // if Time is less than 2 min make the text color of the timers and header red
      if (breakTime < 2) {
        document.getElementById("countDownTime").style.color = "red"
        timerHeaderText.style.color = "red"
      }
      // if Time is more than 2 min make the text color of the timers and header white
      if (breakTime > 2) {
        document.getElementById("countDownTime").style.color = "white"
        timerHeaderText.style.color = "#4b4453"
      }
      if (seconds === -1 && breakTime > -1) {
        countDownsessionTime.textContent = (breakTime - 1)
          .toString()
          .padStart(2, "0")
        countDownSeconds.textContent = 59

        seconds = 59 - 1
        breakTime--
        return
      }
      countDownsessionTime.textContent = breakTime.toString().padStart(2, "0")
      countDownSeconds.textContent = seconds.toString().padStart(2, "0")

      if (seconds > -1) {
        seconds--
      }

      //   this is when the timer get to 00:00 then it ends the session and reset sessionTime
      // then it calls the Session function
      if (breakTime.toString().padStart(2, "0") == "00" && seconds == -1) {
        countDownsessionTime.textContent = "00"
        countDownSeconds.textContent = "00"
        // stops breakSetInterval func
        clearInterval(breakCountdown)
        // locks playpause and reset keys
        pausePlay.disabled = true
        // reset Global flags by setting breackCountRunning to false
        breakCountRunning = !breakCountRunning
        // sets sessionCountRunning to true
        sessionCountRunning = !sessionCountRunning
        sessionTime = userSession

        setTimeout(() => {
          document
            .getElementById("sessionTimer_wrapper")
            .classList.toggle("alarm")
          alarm.play()
        }, 1000)
        // displays session and prepares for switch
        setTimeout(() => {
          timerHeaderText.textContent = "Session"
          countDownsessionTime.textContent = sessionTime
            .toString()
            .padStart(2, "0")
          countDownSeconds.textContent = "00"
        }, 1500)

        // starts CountDownSession after 4 seconds
        setTimeout(() => {
          document
            .getElementById("sessionTimer_wrapper")
            .removeAttribute("class")
          pausePlay.disabled = false
          CountDownSession()
        }, 2000)
      }
    }, 1000)
  }

  //   adding event listener to PausePlay button

  pausePlay.addEventListener("click", () => {
    // toggles between true and false on each click
    countDownRunning = !countDownRunning

    // if countdown is not running then run countdown (meaning countDownRunning = false)
    if (countDownRunning) {
      // start the CountDownSession function with a setInterval
      sessionCountRunning && CountDownSession()
      breakCountRunning && breakCountDown()

      // disables the arrow up and down controls when countdown is running
      breakBtn_up.disabled = true
      breakBtn_down.disabled = true
      sesstionBtn_up.disabled = true
      sesstionBtn_down.disabled = true

      return
    }

    // if countdown is  running then pause or stop countdown (meaning countDownRunning = true)
    // both the session and break intervals are terminated.
    clearInterval(sessionCountdown)
    clearInterval(breakCountdown)

    // enables the arrow up and down controls when countdown not running
    breakBtn_up.disabled = false
    breakBtn_down.disabled = false
    sesstionBtn_up.disabled = false
    sesstionBtn_down.disabled = false
  })

  reset.addEventListener("click", () => {
    // stops all timerCountDown intervals
    clearInterval(sessionCountdown)
    clearInterval(breakCountdown)
    // clears again to make sure all interval invoked by setTimeout is terminated
    setTimeout(() => {
      clearInterval(sessionCountdown)
      clearInterval(breakCountdown)

      timerHeaderText.textContent = "Session"

      displayBreakTimer.textContent = breakTime
      displaySessionTimer.textContent = sessionTime

      countDownsessionTime.textContent = sessionTime.toString().padStart(2, "0")
      countDownSeconds.textContent = "00"

      document.getElementById("countDownTime").style.color = "white"
      timerHeaderText.style.color = "#4b4453"
    }, 2000)
    // unlock all buttons(buttons are locked during the Countdown unless paused)
    breakBtn_up.disabled = false
    breakBtn_down.disabled = false
    sesstionBtn_up.disabled = false
    sesstionBtn_down.disabled = false
    // reset countDown header
    timerHeaderText.textContent = "Session"

    // stops alarm if it playing
    alarm.pause()
    alarm.currentTime = 0
    // reset Global flags to default
    countDownRunning = false
    sessionCountRunning = true
    breakCountRunning = false

    // reset user timers to default
    userSession = 25
    userBreak = 5

    // reset default timers
    sessionTime = userSession
    seconds = 0
    breakTime = userBreak
    // reset all timers display to default
    displayBreakTimer.textContent = breakTime
    displaySessionTimer.textContent = sessionTime

    countDownsessionTime.textContent = sessionTime.toString().padStart(2, "0")
    countDownSeconds.textContent = seconds.toString().padStart(2, "0")

    // reset colors
    document.getElementById("countDownTime").style.color = "white"
    timerHeaderText.style.color = "#4b4453"
  })
}

export default controls
