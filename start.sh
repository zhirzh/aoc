#!/usr/bin/env bash

day=$1
nodemon -e ts -w . -x "tsx $day/solve.ts"
