// NOTE - JN - ℤ !== Z
//
// TODO - JN - Check for Class or Function for prototypal inheritance
// http://www.stackoverflow.com/questions/45747646/what-is-the-es5-way-of-writing-web-component-classes

const Zya = (Component) => class extends Component {
	constructor () {
		super()

		this.$state = {}

		this['ℤ'] = Math
			.random()
			.toString(36)
			.substring(2)

		Zya.ELEMS[this['ℤ']] = this

		Zya.NODES.push(this.stream.bind(this))

		;(async () => {
			for await(const i of Zya.NODES.reduce((stream, f) =>
				f(stream), Zya.STREAMER));
		})().then(console.log)
	}

	get $routed () {
		return 
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
				Zya.ARCHIVE.push({ [origin]: { ...obj, route } })

			if ( route || (route === false && origin === this['ℤ']) )
				yield * Object.keys(obj).map(key => {
					this.$state[key] = obj[key]

					if (this[key])
						try {
							const backStream = this[key](obj[key]) || {}

							return {
								...backStream,
								[key]: obj[key],
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
	RESOLVE: null,

	STATE: {},

	STREAM: [],

	ARCHIVE: [],

	PROCESSES: [], // AKA Plugins

	NODES: [],

	ELEMS: {},

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
