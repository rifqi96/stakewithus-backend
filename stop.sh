bold=$(tput bold)
normal=$(tput sgr0)

echo "${bold}Stopping ...${normal}"
docker-compose down -v