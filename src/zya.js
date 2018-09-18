export default class Zya extends HTMLElement {
	constructor () {
		super()
	}

	dispatch (action) {
		Zya.RESOLVE && Zya.RESOLVE()

		Zya.STREAM.push(action)
	}

	async * stream (stream) {
		yield * stream
	}

	connectedCallback() {
		Zya.NODES.push(this.stream.bind(this))

		const streaming = (async() => {
			for await(const i of Zya.NODES.reduce((stream, f) =>
				f(stream), Zya.STREAMER)) { /* console.log(i) */ }
		})().then(after => console.log)

		this.connected()
	}
}


Object.assign(Zya, {
	RESOLVE: null,

	STREAM: [],

	ARCHIVE: [],

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
}

