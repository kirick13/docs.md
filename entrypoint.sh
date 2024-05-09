#!/bin/bash

mkdir -p /var/docs.md/build \
&& bun run calpis markdown \
&& bun run calpis html \
&& bun run calpis css \
&& bun run calpis content
