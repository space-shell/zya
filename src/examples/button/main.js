import Zya from '../../zya.js'
import PointerEvents from '../../processes/zya-pointer-events.js'

Zya.use(PointerEvents)

customElements.define('test-comp', Zya(
	class extends HTMLElement {
		constructor () {
			super ()
		}

		wtf (data) {
			console.log('wtf' + this.dataset.id)
		}

		pointerDown (data) {
			console.log('Data', data)
		}

		connectedCallback () {
			this.render({})
		}

		render({ message }) {
			hyperHTML.bind(this)`
				<button onclick=${() => this.$dispatch({ wtf: 'google' })}>${ this.dataset.id }</botton>
				<button onclick=${() => this.$dispatch({ wtf: 'google' }, false)}>${ this.dataset.id } - Me</botton>
			`
		}
	}
))

