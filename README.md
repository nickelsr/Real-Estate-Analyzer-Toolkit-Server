<!-- prettier-ignore-start -->
# Real Estate Analyzer Toolkit API


## Description

This repository hosts the code that drives the web server responsible for providing the API consumed by the [web client](https://github.com/nickelsr/Real-Estate-Analyzer-Toolkit-Client). Visit the live OpenAPI documentation [here](http://nicklazaga.com/api-docs) and test it! The source code is available to everyone under the standard [MIT license](https://github.com/nickelsr/Real-Estate-Calculator/blob/main/LICENSE.txt).

## Features

- REST API
- Cookie Authentication for protected endpoints with express sessions
- OpenAPI 3.0 documentation

## Deployment

- Docker container deployed to an ECS cluster running on an EC2 launch type
- Amazon Relational Database Service integration and Parameter Store fetching enabled via ECS container level IAM role
- CICD through CodePipeline linked to this repository, triggered by new commits
- Production docker builds automatically pushed to Amazon Elastic Container Registry via CodeBuild, enabled by EC2 level IAM role
- Mitigated server downtime with an EC2 Auto Scaling Group and automatic Elastic IP reconfiguration upon EC2 instance crashes

## Under Development 

- TLS

## Development Environment

This project includes a Docker-Compose yaml file for containerized development. To setup the development environment, the following steps should be taken:

- Install Docker Desktop following the [official guide](https://docs.docker.com/desktop/)

- Start the Docker daemon (the docker desktop application)

- Clone the project to a directory of your choice on your local machine using the following command

    ```
    git clone git@github.com:nickelsr/Real-Estate-Analyzer-Toolkit-Server.git <Target-Directory-Path>
    ```

- Create a docker development container by using the following command

    ```
    docker-compose up --build
    ```

After completing the following steps, the development container will be created, dependencies will be installed, and the server can be reached at http://localhost:4000/ 


## License

Copyright (c) Nick Lazaga. All rights reserved.

Licensed under the [MIT](https://github.com/nickelsr/Real-Estate-Calculator/blob/main/LICENSE.txt) license.
<!-- prettier-ignore-end -->
