import Zya from './zya.js'

customElements.define('test-comp', class extends Zya {
	constructor () {
		super ()

		this.logClick = id => this.dispatch({ wtf: 'Is going on? ' + this.dataset.id })

		this.messgage = this.dataset.is
	}

	async * stream (stream) {
		for await(const i of stream) {
			console.log(i)

			yield i
		}
	}

	connected () {
		this.render({})
	}

	render({ message }) {
		hyperHTML.bind(this)`
			<button onclick=${() => this.logClick()}>${ this.dataset.id }</botton>
		`
	}
})

