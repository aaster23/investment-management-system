#!/usr/bin/env bash
while true
do
    echo "Called"
    sh ts-node ./src/setup/generate-gap-data.ts
    sleep 5
done