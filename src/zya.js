// NOTE - JN - ℤ !== Z
//
// TODO - JN - Check for Class or Function for prototypal inheritance
// http://www.stackoverflow.com/questions/45747646/what-is-the-es5-way-of-writing-web-component-classes

const Zya = (Component) => class extends Component {
	constructor () {
		super()

		this['ℤ'] = Math
			.random()
			.toString(36)
			.substring(2)

		Zya.NODES.push(this.stream.bind(this))

		Zya.restart()
	}

	$dispatch (action, route = true) {
		Zya.RESOLVE && Zya.RESOLVE()

		if (Object.keys(action).length !== 0 && action.constructor === Object)
			Object.assign(action, { origin: this['ℤ'] })

		Zya.STREAM.push({ ...action, route })
	}

	async * stream (data) {
		for await(const { route, origin, ...obj } of data) {
			if (origin === this['ℤ'])
				Zya.ARCHIVE.push({ [origin || 'process']: { ...obj, route } })

			if ( route || (route === false && origin === this['ℤ']) )
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
}


Object.assign(Zya, {
	use (...args) {
		// TODO - JN - Assign unique identifier to process, eg: Constructor name
	
		Zya.PROCESSES.push(...args)

		return Zya.restart()
	},

	async restart () {
		const preprocessors = Zya.PROCESSES.map(proc => stream => proc(stream, Zya.dispatch))

		const process = [ ...preprocessors, ...Zya.NODES ]
			.reduce((stream, f) => f(stream), Zya.STREAMER)

		for await(const i of process);

		return
	},

	dispatch (action) {
		Zya.RESOLVE && Zya.RESOLVE()

		Zya.STREAM.push({ ...action, route: true })
	},

	RESOLVE: null,

	STREAM: [],

	ARCHIVE: [],

	PROCESSES: [],

	NODES: [],

	STREAMER: {
		async * [Symbol.asyncIterator] () {
			while (true) {
				while(Zya.STREAM.length)
					yield Zya.STREAM.shift()

				await new Promise(resolve => Zya.RESOLVE = resolve)

				Zya.RESOLVE = null
			}
		}

	}
})

export default Zya
