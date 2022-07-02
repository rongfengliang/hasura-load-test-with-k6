FROM  hasura/graphql-engine:v2.8.3
RUN apt update -y  && apt-get install -y linux-perf