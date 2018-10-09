export default async function * (stream, dispatch) {
	let currentTarget

	const mouseMove = ({ target, x, y, movementX, movementY }) => {
		if (target !== currentTarget) {
			currentTarget = target

			dispatch({ pointerTarget: { target } })
		}
	}

	document.onmousedown = ({ target, x, y }) =>
		dispatch({ pointerDown: { target, x, y } })

	document.ontouchstart = ({ target }) =>
		dispatch({ pointerDown: { target } })

	document.onmouseMove = ({ target, x, y, movementX, movementY }) =>
		dispatch({ pointerMove: { target, x, y, movementX, movementY } })

	document.ontouchMove = ({ target }) =>
		dispatch({ pointerMove: { target } })

	document.onmouseup = ({ target, x, y }) =>
		dispatch({ pointerUp: { target, x, y } })

	document.ontouchend = ({ target }) =>
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

