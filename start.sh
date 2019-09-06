bold=$(tput bold)
normal=$(tput sgr0)

echo "${bold}Running ...${normal}"
if [[ $1 = "build" ]]; then
    cp -n example.env .env
    docker-compose up --build -d
else
    docker-compose up -d
fi