const timerOutput = document.getElementById('output')

let timerID,
	currentTime = 0

const msConvert = {
	hours: 36e5,
	minutes: 6e4,
	seconds: 1e3
}

const convertTime = (time, result) => {
	if (+time === msConvert.hours) return result + '1h'
	if (+time === msConvert.minutes) return result + '1m'
	if (+time === msConvert.seconds) return result + '1s'

	if (time > msConvert.hours) {
		return convertTime(
			time % msConvert.hours,
			result + Math.trunc(time / msConvert.hours) + 'h'
		)
	}

	if (time > msConvert.minutes && time < msConvert.hours) {
		return convertTime(
			time % msConvert.minutes,
			result + Math.trunc(time / msConvert.minutes) + 'm'
		)
	}

	if (time > msConvert.seconds && time < msConvert.minutes) {
		return convertTime(
			time % msConvert.seconds,
			result + Math.trunc(time / msConvert.seconds) + 's'
		)
	}

	result += time + 'ms'
	return result
}

const timerCount = (time) => {
	if (time >= 0) {
		timerOutput.innerText = convertTime(time, '')
		currentTime = time
		return (timerID = setTimeout(() => timerCount(--time), 1))
	}
}

const timerStart = () => {
	if (currentTime > 0) {
		timerCount(currentTime)
	} else {
		const inputField = document.getElementById('input')
		timerCount(inputField.value)
		inputField.disabled = true
	}
}

const timerReset = () => {
	timerOutput.innerText = '00h 00m 00s 00ms'
	clearTimeout(timerID)
	currentTime = 0
	const inputField = document.getElementById('input')
	inputField.disabled = false
	inputField.value = ''
}

const timerStop = () => {
	clearTimeout(timerID)
}

document.getElementById('start').addEventListener('click', timerStart)
document.getElementById('reset').addEventListener('click', timerReset)
document.getElementById('stop').addEventListener('click', timerStop)
