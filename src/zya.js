// http://www.stackoverflow.com/questions/45747646/what-is-the-es5-way-of-writing-web-component-classes

// TODO - JN - Check for Class or function for prototypal inheritance
 
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
			Zya.ARCHIVE.push(obj)

			yield * Object.keys(obj).map(key => {
				if (this[key])
					this[key](obj[key])
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

	PROCESSORS: [], // AKA Plugins

	NODES: [],

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

