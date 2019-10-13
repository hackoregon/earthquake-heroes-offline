NAME="2019-earthquake-heroes-offline"

echo "Setting up AWS"

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

echo "Accessing ECR"

eval $(aws ecr get-login --no-include-email --region us-west-2)

echo "Building docker container"

docker build -t $NAME .
docker tag $NAME:latest $REMOTE_IMAGE_URL/$NAME:latest
docker tag $NAME:latest $REMOTE_IMAGE_URL/$NAME:$TRAVIS_BUILD_NUMBER

echo "Pushing docker container ($TRAVIS_BUILD_NUMBER)"

docker push $REMOTE_IMAGE_URL/$NAME:latest
docker push $REMOTE_IMAGE_URL/$NAME:$TRAVIS_BUILD_NUMBER
