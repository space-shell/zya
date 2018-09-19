let Zya

export default Zya = (Component) => class extends Component {
	constructor () {
		super()

		Zya.NODES.push(this.stream.bind(this))

		;(async () => {
			for await(const i of Zya.NODES.reduce((stream, f) =>
				f(stream), Zya.STREAMER));
		})().then(after => console.log)
	}

	$dispatch (action) {
		Zya.RESOLVE && Zya.RESOLVE()

		Zya.STREAM.push(action)
	}

	async * stream (data) {
		for await(const obj of data) {
			yield Object.keys(obj).reduce(async (streamback, key) => {
				try {
					// this[key](obj[key])

					const prom = await this[key](obj[key])
				} catch (e) {
					console.log(e)
				}

			}, {})

			// yield { obj, ...promises }
		}
	}
}


Object.assign(Zya, {
	RESOLVE: null,

	STREAM: [],

	ARCHIVE: [],

	NODES: [],

	STYLES: {},

	STREAMER: {
		async * [Symbol.asyncIterator] () {
			while (true) {
				while(Zya.STREAM.length)
					yield Zya.STREAM.shift()

				await new Promise(res => Zya.RESOLVE = res)

				Zya.RESOLVE = null

				// Loop end
			}
		}

	}
})

