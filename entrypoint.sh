#!/bin/bash

npx browserslist@latest --update-db \
&& npx gulp build
