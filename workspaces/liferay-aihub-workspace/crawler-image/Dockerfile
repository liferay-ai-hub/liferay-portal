FROM docker.elastic.co/integrations/crawler:1.0.0

USER root

COPY entrypoint.sh    /opt/liferay/entrypoint.sh
COPY quota_wrapper.rb /opt/liferay/quota_wrapper.rb

RUN chmod +x /opt/liferay/entrypoint.sh

USER app

WORKDIR /home/app

ENTRYPOINT ["/opt/liferay/entrypoint.sh"]
