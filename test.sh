bold=$(tput bold)
normal=$(tput sgr0)

echo "${bold}Start integration test ...${normal}"
docker exec nodejs sh -c "npm run test"