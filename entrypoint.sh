#!/bin/bash

mkdir -p /var/docs.md/build \
&& npx browserslist@latest --update-db \
&& npx gulp build
