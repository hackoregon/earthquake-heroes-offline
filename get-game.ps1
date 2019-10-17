# AWS credentials SECRET DO NOT SHARE
Set-Item -Path Env:AWS_ACCESS_KEY_ID -Value
Set-Item -Path Env:AWS_SECRET_ACCESS_KEY -Value
Set-Item -Path Env:AWS_REGISTRY -Value

# Clone the project that contains the docker-compose file
git clone https://github.com/hackoregon/earthquake-heroes-offline.git earthquake-heroes
Set-Location -Path earthquake-heroes

# Authenticate with ECR
Invoke-Expression -Command (aws ecr get-login --no-include-email --region us-west-2)

# Start the tile server and the game!
docker-compose pull
docker-compose up
