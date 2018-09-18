export default class Zya extends HTMLElement {
	constructor ({ css } = {}) {
		super()

		this.name = 
			this.constructor.name === 'Zya'
				? Math.random()
					.toString(36)
					.substring(2)
				: this.constructor.name

		css
			&& !Zya.STYLES[this.name]
			&& this.cssAttach(css)
	}

	cssAttach (style) {
		const compiler = less ? less.render : css => Promise.resolve({ css })

		Zya.STYLES[this.name] = !!((
				less && less.render
				|| (css => Promise.resolve({ css }))
			)(style).then(({ css }) =>
				document.head.insertAdjacentHTML('beforeend', `
					<style id=${ this.name }>
						${ css }
					</style> `) ) )
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

