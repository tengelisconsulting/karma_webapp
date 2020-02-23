#!/bin/sh

     # - run: $(docker inspect my_image --format={{.Id}})

     # - run: IMAGE_ID="sha256:b7edc14d85404580a3615575489a387dbb7a0f9dd053e84cd62cf6008046f836" \
     #          && PAYLOAD='{"updates":[{"type":"web","docker_image":"'"$IMAGE_ID"'"}]}' \
     #          && curl -n -X PATCH https://api.heroku.com/apps/karma-webapp-canary/formation \
     #          -d ${PAYLOAD} \
     #          -H "Content-Type: application/json" \
     #          -H "Accept: application/vnd.heroku+json; version=3.docker-releases"


echo "HEY!"
