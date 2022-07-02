# hasura load tests


## init  table

```code
CREATE TABLE demoapp (
    id integer PRIMARY KEY,
    name text NOT NULL
);
COMMENT ON TABLE demoapp IS 'demoapp';

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX demoapp_pkey ON demoapp(id int4_ops);

```

##  connect conf

*  hasura max_connections

```code
max_connections=300
```

* pg

```code
max_connections=2000
```

## load test

> with k6

```code
k6 run app.js
```

## prometheus metrics

* view result

```code
http://localhost:3000
```

* load dashboard 

> inside dash