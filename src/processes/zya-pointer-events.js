export default class {
	constructor () {
		document.addEventListener('mousemove', evt => this.mouseMove(evt), true)
		document.addEventListener('touchmove', evt => this.touchMove(evt), true)
		document.addEventListener('mousedown', evt => this.mouseDown(evt), true)
		document.addEventListener('touchstart', evt => this.touchStart(evt), true)
		document.addEventListener('mouseup', evt => this.mouseUp(evt), true)
		document.addEventListener('touchend', evt => this.touchEnd(evt), true)

		this.currentTarget = null
	}

	mouseMove ({ target, x, y, movementX, movementY }) {
		// TODO - JN - Craeat a tap into the stream

		// const stream = this.$dispatch({ pointerMove: { target, x, y, movementX, movementY } })

		// for await (const { pointerMove } of stream) {
		// 	console.log(pointerMove.target, target)
		// 	if (target !== pointerMove.target)
		// 		console.log(pointerMove.targetNew)
		// }

		this.$dispatch({ pointerMove: { target, x, y, movementX, movementY } })
		
		// TODO - JN - Remove State Management
		if (target !== this.currentTarget) {
			this.currentTarget = target

			this.$dispatch({ pointerTarget: { target } })
		}
	}

	touchMove ({ target }) {
		this.$dispatch({ pointerMove: { target } })
	}

	mouseDown ({ target, x, y }) {

		this.$dispatch({ pointerDown: { target, x, y } })
	}

	touchStart({ target }) {

		this.$dispatch({ pointerDown: { target } })
	}

	mouseUp ({ target, x, y }) {

		this.$dispatch({ pointerUp: { target, x, y } })
	}

	touchEnd ({ target }) {

		this.$dispatch({ pointerUp: { target } })
	}
}

