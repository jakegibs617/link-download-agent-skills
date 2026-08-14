-- Fixture 01: orders schema for the postgres-standards audit evaluation.
-- Seeded with known defects. The defect key lives in evaluations/README.md.
-- Do not add a comment here naming a defect; the fixture is the input under test.

CREATE TABLE tenants (
    id          serial PRIMARY KEY,
    name        varchar(255) NOT NULL,
    created_at  timestamp NOT NULL DEFAULT now()
);

CREATE TABLE customers (
    id          serial PRIMARY KEY,
    tenant_id   integer NOT NULL REFERENCES tenants (id),
    email       varchar(255) NOT NULL,
    full_name   varchar(255),
    created_at  timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX customers_email_idx ON customers (email);

CREATE TABLE orders (
    id           serial PRIMARY KEY,
    tenant_id    integer NOT NULL REFERENCES tenants (id),
    customer_id  integer NOT NULL REFERENCES customers (id),
    total        float8 NOT NULL,
    currency     char(3) NOT NULL DEFAULT 'USD',
    placed_at    timestamp NOT NULL DEFAULT now(),
    metadata     json
);

CREATE INDEX orders_placed_at_idx ON orders (placed_at);

CREATE TABLE order_lines (
    id          serial PRIMARY KEY,
    order_id    integer NOT NULL REFERENCES orders (id),
    sku         varchar(255) NOT NULL,
    quantity    integer NOT NULL,
    unit_price  float8 NOT NULL
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY orders_tenant_isolation ON orders
    USING (tenant_id = current_setting('app.tenant_id')::integer);

CREATE FUNCTION recalculate_order_total(p_order_id integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE orders
       SET total = (SELECT sum(quantity * unit_price) FROM order_lines WHERE order_id = p_order_id)
     WHERE id = p_order_id;
END;
$$;

GRANT ALL ON ALL TABLES IN SCHEMA public TO PUBLIC;
