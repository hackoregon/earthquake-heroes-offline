echo "Setting up AWS"

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

echo "Accessing ECR"

eval $(aws ecr get-login --no-include-email --region us-west-2)

echo "Building docker container"

docker build -t earthquake-heroes-offline .
docker tag earthquake-heroes-offline:latest $REMOTE_IMAGE_URL/earthquake-heroes-offline:latest
docker tag earthquake-heroes-offline:latest $REMOTE_IMAGE_URL/earthquake-heroes-offline:$TRAVIS_BUILD_NUMBER

echo "Pushing docker container ($TRAVIS_BUILD_NUMBER)"

docker push $REMOTE_IMAGE_URL/earthquake-heroes-offline:latest
docker push $REMOTE_IMAGE_URL/earthquake-heroes-offline:$TRAVIS_BUILD_NUMBER
