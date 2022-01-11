const msConvert = {
	hours: 36e5,
	minutes: 6e4,
	seconds: 1e3
}

const convertTime = (time, result) => {
	while (time >= msConvert.seconds) {
		if (+time === msConvert.hours) return result + '1h '
		if (+time === msConvert.minutes) return result + '1m '
		if (+time === msConvert.seconds) return result + '1s '

		if (time > msConvert.hours) {
			result += Math.trunc(time / msConvert.hours) + 'h '
			time %= msConvert.hours
		}

		if (time > msConvert.minutes && time < msConvert.hours) {
			result += Math.trunc(time / msConvert.minutes) + 'm '
			time %= msConvert.minutes
		}

		if (time > msConvert.seconds && time < msConvert.minutes) {
			result += Math.trunc(time / msConvert.seconds) + 's '
			time %= msConvert.seconds
		}
	}

	result += time + 'ms'
	return result
}

function Timer(input, output, stop, start, reset) {
	this.timerOutput = document.getElementById(output)

	this.timerID
	this.currentTime = 0

	this.timerCount = (time) => {
		if (time >= 0) {
			this.timerOutput.innerText = convertTime(time, '')
			this.currentTime = time - 10
		}
	}

	this.timerStart = () => {
		if (this.currentTime === 0) {
			const inputField = document.getElementById(input)
			this.currentTime = inputField.value
			inputField.disabled = true
		}
		this.timerID = setInterval(() => this.timerCount(this.currentTime), 10)
	}

	this.timerReset = () => {
		this.timerOutput.innerText = '00h 00m 00s 00ms'
		clearInterval(this.timerID)
		this.currentTime = 0
		const inputField = document.getElementById(input)
		inputField.disabled = false
		inputField.value = ''
	}

	this.timerStop = () => {
		clearInterval(this.timerID)
	}

	document.getElementById(start).addEventListener('click', this.timerStart)
	document.getElementById(reset).addEventListener('click', this.timerReset)
	document.getElementById(stop).addEventListener('click', this.timerStop)
}

const fTimer = new Timer('f_input', 'f_output', 'f_stop', 'f_start', 'f_reset')
const sTimer = new Timer('s_input', 's_output', 's_stop', 's_start', 's_reset')

console.log(fTimer)
