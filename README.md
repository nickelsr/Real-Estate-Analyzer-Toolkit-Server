<!-- prettier-ignore-start -->
# Real Estate Analyzer Toolkit API


## Description

This repository hosts the code that drives the API that the [associated web app](https://github.com/nickelsr/Real-Estate-Analyzer-Toolkit-Client) depends on. The source code is available to everyone under the standard [MIT license](https://github.com/nickelsr/Real-Estate-Calculator/blob/main/LICENSE.txt).

## Features Under Development 

- Swagger UI  Documentation
- JWT refresh tokens

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
