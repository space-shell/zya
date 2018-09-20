import Hyper from 'https://cdn.jsdelivr.net/npm/hyperhtml@latest/esm.js'

export dafault class {
	constructor () {
		console.log(this.constructor)
	}

	render (vars, node) {
		const element = isNaN(node)
			? node
			: this.constructor.ELEM[node]

		Hyper.bind(element)(this.template(vars))
	}
}
