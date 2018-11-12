// NOTE - JN - ℤ !== Z

// TODO - JN - Zya constructor to differentiate between Async functions, Class constructore and functions / Objects

const RESOLVE = null

const STREAM = []

const ARCHIVE = []

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

const dispatch = (action = {}, route = true) => {
	RESOLVE && RESOLVE()

	if (Object.keys(action).length !== 0 && action.constructor === Object)
		action.origin = this['ℤ']

	STREAM.push({ ...action, route })
}

const stream = async function * (data) {
	for await(const { route, origin, ...obj } of data) {
		if (origin === this['ℤ'])
			ARCHIVE.push({ [origin || 'process']: { ...obj, route } })

		if (route || (route === false && origin === this['ℤ']))
			yield * Object.keys(obj).map(key => {
				if (this[key])
					try {
						const backStream = this[key](obj[key]) || { [key]: obj[key] }

						return {
							...backStream,
							origin,
							route
						}
					} catch (e) {
						console.log(e)

						return { [key]: obj[key], origin, route }
					}
				else
					return { [key]: obj[key], origin, route }
			})
		else
			yield { ...obj, origin, route }
	}
}

const use = (...args) => {
	// TODO - JN - Assign unique identifier to process, eg: Constructor name

	Zya.PROCESSES.push(...args)

	return Zya.restart()
}

const restart = async () => {
	const preprocessors = PROCESSES.map(proc => stream => proc(stream, dispatch))

	const process = [ ...preprocessors, ...NODES ]
		.reduce((stream, f) => f(stream), STREAMER)

	for await(const i of process);

	return
}

const generateClass = (base, methods) => class extends base {
	constructor () {
		super()

		this['ℤ'] = Math
			.random()
			.toString(36)
			.substring(2)

		if (methods)
			Object.keys(methods).forEach(method => {
				if (typeof methods[method] === 'function')
					this[method] = methods[method]
			})

		NODES.push(this.stream.bind(this))

		Zya.restart()
	}
}

export default function Zya (base, methods) {
	console.log(base)

	if (typeof base === 'function' && base instanceof HTMLElement)
		generateClass(base, methods)

	if (typeof Zya === 'function' && base.constructer.name === 'AsyncGeneratorFunction')
		generatorIterator(base, methods)
}
