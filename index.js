function Timer(input, output, stop, start, reset) {
	this.inputField = document.querySelector(input)
	this.timerOutput = document.querySelector(output)
	this.startBtn = document.querySelector(start)
	this.resetBtn = document.querySelector(reset)
	this.stopBtn = document.querySelector(stop)

	this.timerID
	this.currentTime = 0

	this.msConvert = {
		hours: 36e5,
		minutes: 6e4,
		seconds: 1e3
	}

	this.buttonCtrl = (startDis, stopDis, resetDis) => {
		this.startBtn.disabled = startDis
		this.stopBtn.disabled = stopDis
		this.resetBtn.disabled = resetDis
	}

	this.convertTime = (time) => {
		//output time in correct format
		let result = ''

		if (time >= this.msConvert.hours) {
			result += Math.trunc(time / this.msConvert.hours) + 'h '
			time %= this.msConvert.hours
		} else {
			result += '00h '
		}

		if (time >= this.msConvert.minutes && time < this.msConvert.hours) {
			result += Math.trunc(time / this.msConvert.minutes) + 'm '
			time %= this.msConvert.minutes
		} else {
			result += '00m '
		}

		if (time >= this.msConvert.seconds && time < this.msConvert.minutes) {
			result += Math.trunc(time / this.msConvert.seconds) + 's '
			time %= this.msConvert.seconds
		} else {
			result += '00s '
		}

		result += time === 0 ? '00ms' : time + 'ms'
		return result
	}

	this.timerCount = (time) => {
		this.timerOutput.innerText = this.convertTime(time)
		if (time >= 0) {
			this.currentTime = time - 10
		} else {
			alert('Time is over')
			this.timerReset()
		}
	}

	this.timerStart = () => {
		if (
			(this.inputField.value + ' ').replace(/([\d]+(h|ms|m|s)\s+)+/, '')
				.length === 0
		) {
			if (this.currentTime === 0) {
				this.convertTimeToMs()
				this.inputField.disabled = true
			}

			this.buttonCtrl(true, false, false)

			this.timerID = setInterval(
				() => this.timerCount(this.currentTime),
				10
			)
		} else {
			alert('Wrong input value')
		}
	}

	this.convertTimeToMs = () => {
		this.currentTime = this.inputField.value
			.split(' ')
			.filter((el) => el !== '')
			.reduce((prev, item) => {
				const num = parseInt(item) //convert all time values at milliseconds

				switch (item.replace(/\d+/, '')) {
					case 'h':
						return prev + num * this.msConvert.hours
					case 'm':
						return prev + num * this.msConvert.minutes
					case 's':
						return prev + num * this.msConvert.seconds
					case 'ms':
						return prev + num

					default:
						return prev + 0
				}
			}, 0)
	}

	this.timerReset = () => {
		this.timerCount(0)
		clearInterval(this.timerID)
		this.currentTime = 0
		this.inputField.disabled = false
		this.inputField.value = ''
		this.buttonCtrl(false, true, true)
	}

	this.timerStop = () => {
		clearInterval(this.timerID)
		this.buttonCtrl(false, true, false)
	}

	this.timerInit = () => {
		this.buttonCtrl(false, true, true)
		this.startBtn.addEventListener('click', this.timerStart)
		this.resetBtn.addEventListener('click', this.timerReset)
		this.stopBtn.addEventListener('click', this.timerStop)
	}

	this.timerInit()
}

const fTimer = new Timer(
	'#f_input',
	'#f_output',
	'#f_stop',
	'#f_start',
	'#f_reset'
)
const sTimer = new Timer(
	'#s_input',
	'#s_output',
	'#s_stop',
	'#s_start',
	'#s_reset'
)
