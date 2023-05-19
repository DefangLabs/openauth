#!/bin/bash

(cd kratos && docker-compose build &)
(cd oathkeeper && docker-compose build &)

wait