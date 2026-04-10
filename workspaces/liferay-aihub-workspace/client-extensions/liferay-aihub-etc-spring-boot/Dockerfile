FROM jruby:9.4.12.0-jdk21@sha256:5641622b488d298362b96fdaea0f328248ce55962e68e224118be11ddb48d16e AS crawler-builder

WORKDIR /opt/crawler

COPY crawler/ ./

RUN gem install --no-document bundler -v "$(cat .bundler-version)" && \
    bundle config set --local path vendor/bundle && \
    bundle install && \
    bundle exec script/vendor_jars

FROM liferay/jar-runner:latest

USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends libicu-dev netbase make && \
    rm -rf /var/lib/apt/lists/*

COPY --from=crawler-builder /opt/jruby /opt/jruby

ENV PATH="/opt/jruby/bin:${PATH}"

COPY --from=crawler-builder /opt/crawler /opt/liferay/crawler

RUN chown -R liferay:liferay /opt/liferay/crawler && \
    chmod +x /opt/liferay/crawler/bin/crawler

COPY --chown=liferay:liferay build/liferay-client-extension-build/liferay-sample-etc-spring-boot.jar /opt/liferay/jar-runner.jar

USER liferay

ENV LIFERAY_JAR_RUNNER_JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,address=*:5005,suspend=n -Xmx512m"

EXPOSE 5005