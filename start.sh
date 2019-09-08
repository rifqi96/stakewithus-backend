bold=$(tput bold)
normal=$(tput sgr0)

echo "${bold}Running ...${normal}"

# Copy the env file if doesn't exist
cp -n example.env .env

for arg in "$@"
do
    # Force set FORCE_NPM_I to true
    if [ "$arg" == "--npm-i" ]; then
        grep -qF 'FORCE_NPM_I' .env || echo 'FORCE_NPM_I=true' >> .env
    fi
done

# FORCE_NPM_I setter fallback
grep -qF 'FORCE_NPM_I' .env || echo 'FORCE_NPM_I=false' >> .env

if [[ $1 = "build" ]]; then
    docker-compose up --build -d
else
    docker-compose up -d
fi