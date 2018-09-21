import Zya from './zya.js'
import PointerEvents from './processes/zya-pointer-events.js'

const Pointer = Zya(PointerEvents)

new Pointer()

customElements.define('test-comp', Zya(
	class extends HTMLElement {
		constructor () {
			super ()
		}

		get info () {
			return 'BOOOOO'
		}

		wtf (data) {
			console.log('wtf')

			return { callbk: 'Good?', wtf: data }
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
				<button onclick=${() => this.$dispatch({ wtf: 'google ' })}>${ this.dataset.id }</botton>
			`
		}
	}
))

