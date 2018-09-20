export default class {
	constructor () {
		console.log(this)

		document.addEventListener('mousemove', evt => this.$dispatch({ pointerMove: evt }), false)
		document.addEventListener('touchmove', evt => this.$dispatch({ pointerMove: evt }), false)
		document.addEventListener('mouseup', evt => this.$dispatch({ pointerUp: evt }), false)
		document.addEventListener('touchend', evt => this.$dispatch({ pointerUp: evt }), false)
		document.addEventListener('mousedown', evt => this.$dispatch({ pointerDown: evt }), false)
		document.addEventListener('touchstart', evt => this.$dispatch({ pointerDown: evt }), false)
	}
}

