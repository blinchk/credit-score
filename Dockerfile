FROM gradle:8.7.0 AS builder

COPY --chown=gradle:gradle . /home/gradle/src

WORKDIR /home/gradle/src

RUN gradle build --no-daemon -x test

FROM openjdk:21-jdk-slim

EXPOSE 8080

RUN mkdir /app

COPY --from=builder /home/gradle/src/build/libs/*.jar /app/backend.jar

CMD ["java", "-jar", "/app/backend.jar"]