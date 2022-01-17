const msConvert = {
	hours: 36e5,
	minutes: 6e4,
	seconds: 1e3
}

function Timer(input, output, stop, start, reset) {
	this.timerOutput = document.getElementById(output)

	this.timerID
	this.currentTime = 0
	this.startBtn = document.getElementById(start)
	this.resetBtn = document.getElementById(reset)
	this.stopBtn = document.getElementById(stop)

	this.buttonCtrl = (startDis, stopDis, resetDis) => {
		this.startBtn.disabled = startDis
		this.stopBtn.disabled = stopDis
		this.resetBtn.disabled = resetDis
	}

	this.buttonCtrl(false, true, true)

	const convertTime = (time, result) => {
		//output time in correct format
		if (time >= msConvert.hours) {
			result += Math.trunc(time / msConvert.hours) + 'h '
			time %= msConvert.hours
		} else {
			result += '00h '
		}

		if (time >= msConvert.minutes && time < msConvert.hours) {
			result += Math.trunc(time / msConvert.minutes) + 'm '
			time %= msConvert.minutes
		} else {
			result += '00m '
		}

		if (time >= msConvert.seconds && time < msConvert.minutes) {
			result += Math.trunc(time / msConvert.seconds) + 's '
			time %= msConvert.seconds
		} else {
			result += '00s '
		}

		result += time === 0 ? '00ms' : time + 'ms'
		return result
	}

	this.timerCount = (time) => {
		if (time >= 0) {
			this.timerOutput.innerText = convertTime(time, '')
			this.currentTime = time - 10
		}
	}

	this.timerStart = () => {
		const inputField = document.getElementById(input)

		/*without regular expressions*/
	}

	this.timerReset = () => {
		this.timerCount(0)
		clearInterval(this.timerID)
		this.currentTime = 0
		const inputField = document.getElementById(input)
		inputField.disabled = false
		inputField.value = ''
		this.buttonCtrl(false, true, true)
	}

	this.timerStop = () => {
		clearInterval(this.timerID)
		this.buttonCtrl(false, true, false)
	}

	document.getElementById(start).addEventListener('click', this.timerStart)
	document.getElementById(reset).addEventListener('click', this.timerReset)
	document.getElementById(stop).addEventListener('click', this.timerStop)
}

const fTimer = new Timer('f_input', 'f_output', 'f_stop', 'f_start', 'f_reset')
const sTimer = new Timer('s_input', 's_output', 's_stop', 's_start', 's_reset')
