// NOTE - JN - ℤ !== Z

// TODO - JN - Zya constructor to differentiate between Async functions, Class constructore and functions / Objects

export const ARCHIVE = []

let RESOLVE = null

const STREAM = []

const PROCESSES = []

const NODES = []

const STREAMER = {
	async * [Symbol.asyncIterator] () {
		while (true) {
			while(STREAM.length)
				yield STREAM.shift()

			await new Promise(resolve => RESOLVE = resolve)

			RESOLVE = null
		}
	}
}

const dispatch = function (action = {}, route = true) {
	RESOLVE && RESOLVE()

	if (Object.keys(action).length !== 0 && action.constructor === Object)
		action.origin = this['ℤ']

	STREAM.push({ ...action, route })
}

const stream = async function * (data) {
	for await(const { route, origin, ...obj } of data) {
		// TODO - JN - Split into archiver functuion
		if (origin === this['ℤ'])
			ARCHIVE.push({ [origin || 'process']: { ...obj, route } })

		if (route === true || route === this['ℤ'] || (route === false && origin === this['ℤ']))
			yield * Object.keys(obj).map(key => {
				if (this[key] && typeof this[key] === 'function')
					const backStream = this[key](obj[key]) || {}

					return {
						[key]: Object.assign(obj[key], backStream),
						origin,
						route
					}
				else
					return { [key]: obj[key], origin, route }
			})
		else
			yield { ...obj, origin, route }
	}
}

const uuid = () => Math
	.random()
	.toString(36)
	.substring(2)

const init = async function () {
	const preprocessors = PROCESSES.map(proc => stream => proc(stream, dispatch.bind(proc)))

	const process = [ ...preprocessors, ...NODES ]
		.reduce((stream, f) => f(stream), STREAMER)

	for await(const i of process);

	return
}

const methodsMerge = methods => {

}

const generateClass = (base, methods) => class extends base {
	constructor () {
		super()

		console.log('Generating Class', this)

		this['ℤ'] = uuid()

		if (methods)
			Object.keys(methods).forEach(method => {
				if (typeof methods[method] === 'function')
					this[method] = methods[method]
			})

		NODES.push(stream.bind(this))
	}

	get $dispatch() {
		return dispatch.bind(this)
	}
}

const generateIterator = (base, methods) => {
	console.log('Generating Iterator', base)

	// FIXME - JN - Sooo dirty
	const baseUpdate = Object.assign(base, methods)

	PROCESSES.unshift(baseUpdate)

}

const generateElement = (base, methods) => {
	console.log('Generating Element', base)

	// FIXME - JN - Sooo dirty
	const baseUpdate = Object.assign(
		base,
		methods,
		{
			['ℤ']: uuid(),
			dispatch
		})

	NODES.push(stream.bind(baseUpdate))
}

export default function Zya (base, methods) {
	if (typeof base === 'function' && Object.getPrototypeOf(base).name === 'HTMLElement')
		generateClass(base, methods)

	if (typeof Zya === 'function' && base.constructor.name === 'AsyncGeneratorFunction')
		generateIterator(base, methods)

	if (typeof base === 'object' && base instanceof HTMLElement)
		generateElement(base, methods)

	if (typeof base === 'string')
		generateElement(document.body.querySelector(base), methods)

	init()
}
