# Credit Score

Application with decision engine which takes in personal code, loan amount, loan period in
months and returns a decision (negative or positive) and the amount. Personal data mocked as a hard coded result for
certain personal codes.

## How to run?

To run with Docker use
```shell 
docker compose up -d
```

### Front-End
To run manually

```shell
yarn install
yarn dev
```

or build & run for production

```shell
yarn build
serve -S dist
```

### Back-End

To run manually
```shell
./gradlew :bootRun
```


## Test Data

| Personal Code | Has debt | Credit Modifier |
|---------------|----------|-----------------|
| 49002010965   | true     | 1000            |
| 49002010976   | false    | 100             |
| 49002010987   | false    | 300             |
| 49002010998   | false    | 1000            |


## Technologies

Front-End:
* React with TypeScript
* Vite
* Ant Design + Sass

Back-End:
* Spring Boot with Java
* Hibernate
* H2 Database

## Tests

Use `./gradlew test` in initial directory to run tests on Back-End.