import Zya from '../../zya.js'
import PointerEvents from '../../processes/zya-pointer-events.js'

const Pointer = Zya(PointerEvents)

// new Pointer()

customElements.define('test-comp', Zya(
	class extends HTMLElement {
		constructor () {
			super ()
		}

		wtf (data) {
			console.log('wtf' + this.dataset.id)

			return {}
		}

		callbk () {
			console.log('Called')

			return {}
		}

		pointerMove (data) {
			// console.log(data)

			return {}
		}


		connectedCallback () {
			this.render({})
		}

		render({ message }) {
			hyperHTML.bind(this)`
				<button onclick=${() => this.$dispatch({ wtf: 'google' }, 'one|')}>${ this.dataset.id }</botton>
			`
		}
	}
))

