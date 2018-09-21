export default class {
	constructor () {
		document.addEventListener('mousemove', evt => this.mouseMove(evt), false)
		document.addEventListener('touchmove', evt => this.touchMove(evt), false)
		document.addEventListener('mousedown', evt => this.mouseDown(evt), false)
		document.addEventListener('touchstart', evt => this.touchStart(evt), false)
		document.addEventListener('mouseup', evt => this.mouseUp(evt), false)
		document.addEventListener('touchend', evt => this.touchEnd(evt), false)

		this.currentTarget = null
	}

	async mouseMove ({ target, x, y, movementX, movementY }) {
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
			console.log('Target is now ', target)
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

