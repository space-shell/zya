export default const ZYA = (base, methods) => class extends base {
  static get VEIN = []

	constructor (...args) {
		super(...args)

    Object.assign(this.prototype, methods)

    process()
	}
}
