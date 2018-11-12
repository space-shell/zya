import Zya from '../../zya.js'
import PointerEvents from '../../processes/zya-pointer-events.js'

Zya(PointerEvents)

class Main extends HTMLElement {
	constructor () {
		super ()

		this.innerHTML =`
			<button>${ this.dataset.id }</button>
		`
	}

	wtf (data) {
		console.log('wtf' + this.dataset.id)
	}
}

// customElements.define('test-comp', Zya(Main))

customElements.define('test-comp', Main)

Zya(document.body.querySelector('test-comp'), {
	onclick () {
		this.wtf()
	},

	pointerDown () {
		this.style.color = 'green'
	}
})

