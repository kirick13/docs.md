
#!/bin/sh

if [ -x "$(command -v node)" ]; then
	cd package

	echo '[DOCS.MD BUILD] found Node.js'
	echo
	echo '[DOCS.MD BUILD] checking/installing dependencies...'
	echo
	npm install
	echo
	echo '[DOCS.MD BUILD] running build...'
	echo
	npx gulp build
	echo
	echo '[DOCS.MD BUILD] complete.'
elif [ -x "$(command -v docker)" ]; then
	echo '[DOCS.MD BUILD] found Docker'
	echo
	echo '[DOCS.MD BUILD] checking/creating an image...'
	echo
	docker build \
		-f $(pwd)/Dockerfile \
		-t docs.md \
		.
	echo
	echo '[DOCS.MD BUILD] running build...'
	echo
	docker run \
		--rm \
		--name docsmd \
		-v $(pwd)/source:/var/docs.md/source \
		-v $(pwd)/build:/var/docs.md/build \
		docs.md
	echo
	echo '[DOCS.MD BUILD] complete.'
fi
