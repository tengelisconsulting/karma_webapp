#!/bin/sh

IMAGE_NAME="registry.heroku.com/${1}/web"
IMAGE_ID=$(docker inspect ${IMAGE_NAME} --format={{.Id}})
PAYLOAD='{"updates":[{"type":"web","docker_image":"'"$IMAGE_ID"'"}]}'
curl -n -X PATCH https://api.heroku.com/apps/${1}/formation \
     -d ${PAYLOAD} \
     -H "Content-Type: application/json" \
     -H "Accept: application/vnd.heroku+json; version=3.docker-releases"
