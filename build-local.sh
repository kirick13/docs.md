#!/bin/bash

rm -rf docs/build/*

docker build -t local/docs.md .

docker run --rm \
           -v $PWD/docs/source:/var/docs.md/source:ro \
           -v $PWD/docs/build:/var/docs.md/build \
           local/docs.md
