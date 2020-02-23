#!/bin/sh


TARGET_SHA1="${1}"
docker tag registry.heroku.com/karma-webapp-canary/web:${TARGET_SHA1} registry.heroku.com/karma-webapp/web:${TARGET_SHA1}
