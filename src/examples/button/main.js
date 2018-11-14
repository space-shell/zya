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

const elems = document.body.querySelectorAll('test-comp')

Zya(elems[0], {
	onclick () {
		this.wtf()
	},

	pointerDown () {
		this.style.color = 'green'
	}
})

Zya(elems[1], {
	onclick () {
		this.wtf()
	},

	pointerClicked () {
		console.log('CLOCKED')
		this.style.color = 'green'
	}
})

Zya(elems[2], {
	onclick () {
		this.wtf()
	},

	pointerTargeted () {
		console.log('Target')
		this.style.backgroundColor = 'red'
	}
})
