# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /workspace
COPY pom.xml .
RUN mvn -B -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -B -q -DskipTests clean package

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built application
COPY --from=builder /workspace/target/quarkus-app/lib/ /deployments/lib/
COPY --from=builder /workspace/target/quarkus-app/*.jar /deployments/
COPY --from=builder /workspace/target/quarkus-app/app/ /deployments/app/
COPY --from=builder /workspace/target/quarkus-app/quarkus/ /deployments/quarkus/

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV QUARKUS_HTTP_PORT=8080

# Run the application
CMD ["java", "-jar", "/deployments/quarkus-run.jar"]
