$cssAttach (style) {
	const compiler = less ? less.render(style) : Promise.resolve({ css: style })

	compiler.then(({ css }) =>
		document.head.insertAdjacentHTML('beforeend', `
			<style id=${ this.name }>
				${ css }
			</style> `) )
}
