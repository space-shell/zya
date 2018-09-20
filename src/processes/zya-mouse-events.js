export default async function * (stream, dispatch) {
	document.addEventListener('mousemove', evt => dispatch({ pointerMove: evt }), false)
	document.addEventListener('touchmove', evt => dispatch({ pointerMove: evt }), false)
	document.addEventListener('mouseup', evt => dispatch({ pointerUp: evt }), false)
	document.addEventListener('touchend', evt => dispatch({ pointerUp: evt }), false)
	document.addEventListener('mousedown', evt => dispatch({ pointerDown: evt }), false)
	document.addEventListener('touchstart', evt => dispatch({ pointerDown: evt }), false)

	for await (const { pointerDown, ...rest } of stream) {

		yield { pointerDown }

		if (pointerDown) {
			for await (const { pointerMove, pointerUp, ...rest } of stream) {
				if (pointerMove)
					yield {
						drag: {
							target: pointerDown.target,

							start: {
								x: pointerDown.screenX,
								y: pointerDown.screenY,
							},

							current: {
								x: pointerMove.screenX,
								y: pointerMove.screenY,
							},

							delta: {
								x: pointerMove.screenX - pointerDown.screenX,
								y: pointerMove.screenY - pointerDown.screenY,
							}
						}
					}

				if (pointerUp) {
					yield { drop: pointerUp }

					break
				}

				yield { pointerMove, pointerUp, ...rest }
			}
		}

		yield { pointerDown, ...rest }
	}
}

