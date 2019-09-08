# StakeWithUs
> StakeWith.Us Fullstack Engineer Technical Test Backend Solution

### Getting Started
- Please install docker and docker-compose first if they're not installed on your machine. [Click here](https://www.docker.com/get-started) !
- The main app source files are under *src/* folder.

### To Build
```bash
$ ./start.sh build
```
*It is recommended to build on first time. It will build all the containers, and create an environment file if it doesn't exist.*

### To Run
```bash
$ ./start.sh
```

### Shut Down
```bash
$ ./stop.sh
```

### To Test
Please make sure to run the app first before running the integration test
```bash
$ ./test.sh
```

### How-To`s
- Access the app from http://localhost:3000
- PostgreSQL is accessible through port *5432*
- It opens port *3000*, *9229*, and *5432* once it is run. Hence, please make sure you don't have anything runs on those ports. However, you can change the exposed ports from *docker-compose.yml*.

### Routes
- POST http://localhost:3000/api/v1/validators (CREATE)
  - Sample data body request:
    ```
    {
      "jsonrpc": "2.0",
      "id": "",
      "result": {
        "block_height": "3363042",
        "validators": [
          {
            "address": "00B587BAA478C3FCD0A1AE34658764BCE01A2A41",
            "pub_key": {
              "type": "tendermint/PubKeyEd25519",
              "value": "H/T2zkDfFx7ZKgDCXP+WvxscARiptSNEBxPQkXRXIIM="
            },
            "voting_power": "4180308150000000",
            "proposer_priority": "41378266209084499"
          },
          {
            "address": "0DAB679E5C4DB1F407F3B79FDBD1D5DE4AD054D9",
            "pub_key": {
              "type": "tendermint/PubKeyEd25519",
              "value": "OtQ6fErTMHtOZA40G2jMa8mTQmwmOrV0J5IR7CoUKiw="
            },
            "voting_power": "1815430500000000",
            "proposer_priority": "-28471297322249822"
          },
        ]
      }
    }
    ```
  - Field descriptions:
    - *blockHeight* (int)
    - *validators* (array of objects):
      - *address* (string)
      - *pub_key* (object)
      - *voting_power* (int)
      - *proposer_priority* (int)
- GET http://localhost:3000/api/v1/validators (READ ALL)
- GET http://localhost:3000/api/v1/validators/<validator_address> (READ ONE)

Thank you!

*(P.S. Please check out [Docker documentation](https://www.docker.com/get-started) to figure out more how it works)*