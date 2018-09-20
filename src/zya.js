// http://www.stackoverflow.com/questions/45747646/what-is-the-es5-way-of-writing-web-component-classes

// NOTE - JN - ℤ !== Z
// TODO - JN - Check for Class or Function for prototypal inheritance
 
let Zya

export default Zya = (Component) => class extends Component {
	constructor () {
		super()

		this['ℤ'] = Math
			.random()
			.toString(36)
			.substring(2)

		Zya.ELEMS[this['ℤ']] = this

		Zya.NODES.push(this.stream.bind(this))

		;(async () => {
			for await(const i of Zya.NODES.reduce((stream, f) =>
				f(stream), Zya.STREAMER));
		})().then(after => console.log)
	}

	$dispatch (action, route) {
		Zya.RESOLVE && Zya.RESOLVE()

		Zya.STREAM.push(action)
	}

	async * stream (data) {
		for await(const obj of data) {
			Zya.ARCHIVE.push(obj)

			// TODO - JN - First key specifies destination eg self, global, <link id>

			yield * Object.keys(obj).map(key => {
				if (this[key])
					try {
						this[key](obj[key])
					} catch (e) {
						console.log(e)
					}
				else
					return obj
			})
		}
	}
}


Object.assign(Zya, {
	RESOLVE: null,

	STREAM: [],

	ARCHIVE: [],

	PROCESSES: [], // AKA Plugins

	NODES: [],

	ELEMS: {},

	STREAMER: {
		pause: null,

		async * [Symbol.asyncIterator] () {
			while (true) {
				while(Zya.STREAM.length)
					yield Zya.STREAM.shift()

				await new Promise(resolve => this.pause = resolve)

				this.pause = null
			}
		}

	}
})

