#!/bin/sh

set -e

TARGET_SHA1="${1}"
docker pull registry.heroku.com/karma-webapp-canary/web:${TARGET_SHA1}
docker tag registry.heroku.com/karma-webapp-canary/web:${TARGET_SHA1} registry.heroku.com/karma-webapp/web:${TARGET_SHA1}
docker push registry.heroku.com/karma-webapp/web:${TARGET_SHA1}
./bin/deploy-heroku.sh karma-webapp "${TARGET_SHA1}"
docker rmi registry.heroku.com/karma-webapp-canary/web:${TARGET_SHA1}
