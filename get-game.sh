# AWS credentials SECRET DO NOT SHARE
export AWS_ACCESS_KEY_ID="";
export AWS_SECRET_ACCESS_KEY="";
export AWS_REGISTRY="";

if [ "$AWS_ACCESS_KEY_ID" == "" ] || [ "$AWS_SECRET_ACCESS_KEY" == "" ]; then
  echo "You must first edit this script to include your AWS credentials";
  exit 1;
fi

# Clone the project that contains the docker-compose file
git clone https://github.com/hackoregon/earthquake-heroes-offline.git earthquake-heroes
cd earthquake-heroes;

# Authenticate with ECR
eval $(aws ecr get-login --no-include-email --region us-west-2);

# Start the tile server and the game!
docker-compose up
