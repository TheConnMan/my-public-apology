docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
VERSION=`node -e "console.log(require('./package.json').version);"`;
if [ "$TRAVIS_BRANCH" != "master" ]; then
  sed -i "s/$VERSION/$VERSION-${TRAVIS_COMMIT}/g" package.json;
fi
docker build -t theconnman/my-public-apology .;
if [ "$TRAVIS_BRANCH" == "master" ]; then
  docker tag theconnman/my-public-apology theconnman/my-public-apology:$VERSION;
  docker push theconnman/my-public-apology:latest;
  docker push theconnman/my-public-apology:$VERSION;
elif [ "$TRAVIS_BRANCH" == "dev" ]; then
  docker tag theconnman/my-public-apology theconnman/my-public-apology:latest-dev;
  docker push theconnman/my-public-apology:latest-dev;
else
  docker tag theconnman/my-public-apology theconnman/my-public-apology:${TRAVIS_BRANCH#*/};
  docker push theconnman/my-public-apology:${TRAVIS_BRANCH#*/};
fi
