import Zya from './zya.js'

customElements.define('test-comp', Zya(
	class extends HTMLElement {
		constructor () {
			super ()
		}

		get info () {
			return 'BOOOOO'
		}

		wtf (data) {
			// console.log(this, this.info, this.info)

			return { callbk: 'Good?' }
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

