export default async function * (stream, dispatch) {
	let currentTarget

	const mouseMove = ({ target, x, y, movementX, movementY }) => {
		if (target !== currentTarget) {
			currentTarget = target

			dispatch({ pointerTarget: { target } })
		}
	}

	window.onmousedown = ({ target, x, y }) =>
		dispatch({ pointerDown: { target, x, y } })

	window.ontouchstart = ({ target }) =>
		dispatch({ pointerDown: { target } })

	window.onmouseMove = ({ target, x, y, movementX, movementY }) =>
		dispatch({ pointerMove: { target, x, y, movementX, movementY } })

	window.ontouchMove = ({ target }) =>
		dispatch({ pointerMove: { target } })

	window.onmouseup = ({ target, x, y }) =>
		dispatch({ pointerUp: { target, x, y } })

	window.ontouchend = ({ target }) =>
		dispatch({ pointerUp: { target } })

	yield * stream

	// for await (const { pointerDown, ...rest } of stream) {
	// 	if (pointerDown) {
	// 		for await (const { pointerMove, pointerUp, ...rest } of stream) {
	// 			if (pointerMove)
	// 				yield {
	// 					drag: {
	// 						target: pointerDown.target,

	// 						start: {
	// 							x: pointerDown.screenX,
	// 							y: pointerDown.screenY,
	// 						},

	// 						current: {
	// 							x: pointerMove.screenX,
	// 							y: pointerMove.screenY,
	// 						},

	// 						delta: {
	// 							x: pointerMove.screenX - pointerDown.screenX,
	// 							y: pointerMove.screenY - pointerDown.screenY,
	// 						}
	// 					}
	// 				}

	// 			if (pointerUp) {
	// 				yield { drop: pointerUp }

	// 				break
	// 			}

	// 			yield { pointerMove, pointerUp, ...rest }
	// 		}
	// 	}

	// 	yield { pointerDown, ...rest }
	// }
}

