#!/bin/bash

PACK_DIR=package;
NPM_BIN="$(pwd)/node_modules/.bin/npm";

publish() {
    cd $PACK_DIR
    echo 'Publishing to npm...'
    $NPM_BIN publish *.tgz --access public
}

./pack.sh && publish