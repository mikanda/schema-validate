
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

test: build
	# open test/index.html in your browser

clean:
	rm -fr build components

.PHONY: clean test
