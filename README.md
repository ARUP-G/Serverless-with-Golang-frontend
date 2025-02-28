# Serverless Function for Frontend

This repository contains a frontend application that works with serverless function. The function is built using AWS Lambda and API Gateway. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Usage

To invoke the function locally, use the following command:

```bash
npm run local
```

## Configuration

Ensure you have the following environment variables set up:

- `API_URL`: Your AWS api gateway link for the APP [(`Serverless-with-Golang`)](https://github.com/ARUP-G/Serverless-with-Golang).


## Deployment

To deploy the function to AWS, use the following command:

```bash
npm run deploy
```

This will package and deploy your function using the Serverless Framework.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
