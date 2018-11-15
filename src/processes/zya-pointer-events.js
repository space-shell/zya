const upstream = elem => {
	if (elem['ℤ'])
		return elem['ℤ']

	if (elem.parentElement)
		return upstream(elem.parentElement)

	return false
}

export default async function * (stream, dispatch) {
	let currentTarget

	const pointerMoveTarget = ({ target, route }) => {
		if (target !== currentTarget) {
			currentTarget = target

			dispatch({ pointerTarget: { target } })

			const parent = upstream(target)

			if (parent)
				dispatch({ pointerTargeted: { target } }, parent)
		}
	}

	window.onmousedown = ({ target, x, y }) => {
		dispatch({ pointerDown: { target, x, y } })

		const parent = upstream(target)

		if (parent)
			dispatch({ pointerClicked: { target } }, parent)
	}

	window.ontouchstart = ({ target }) => {
		dispatch({ pointerDown: { target } })

		const parent = upstream(target)

		if (parent)
			dispatch({ pointerClicked: { target } }, parent)
	}

	window.onmousemove = ({ target, x, y, movementX, movementY }) =>
		dispatch({ pointerMove: { target, x, y, movementX, movementY } })

	window.ontouchmove = ({ target }) =>
		dispatch({ pointerMove: { target } })

	window.onmouseup = ({ target, x, y }) =>
		dispatch({ pointerUp: { target, x, y } })

	window.ontouchend = ({ target }) =>
		dispatch({ pointerUp: { target } })

	for await (const stop of stream) {
		if (stop.pointerMove)
			pointerMoveTarget(stop.pointerMove)

		yield stop
	}

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

