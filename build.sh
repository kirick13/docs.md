
#!/bin/sh

if [ -x "$(command -v node)" ]; then
	echo '[DOCS.MD BUILD] found Node.js'

	cd package

	echo '[DOCS.MD BUILD] checking/installing dependencies...'
	npm install 1> /dev/null

	echo '[DOCS.MD BUILD] running build...'
	npx gulp build 1> /dev/null

	echo '[DOCS.MD BUILD] complete.'
elif [ -x "$(command -v docker)" ]; then
	echo '[DOCS.MD BUILD] found Docker'

	echo '[DOCS.MD BUILD] checking/creating an image...'
	docker build \
		-f $(pwd)/Dockerfile \
		-t docs.md \
		. \
		1> /dev/null

	echo '[DOCS.MD BUILD] running build...'
	docker run \
		--rm \
		--name docsmd \
		-v $(pwd)/source:/var/docs.md/source \
		-v $(pwd)/build:/var/docs.md/build \
		docs.md \
		1> /dev/null

	echo '[DOCS.MD BUILD] complete.'
fi
