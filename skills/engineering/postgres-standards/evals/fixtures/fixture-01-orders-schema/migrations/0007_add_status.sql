-- Migration 0007. Applied against a production orders table of roughly 240 million rows.
-- Run inside the framework's default transaction wrapper.

BEGIN;

ALTER TABLE orders ADD COLUMN status varchar(255) DEFAULT 'pending';

UPDATE orders SET status = 'complete' WHERE placed_at < now() - interval '30 days';

ALTER TABLE orders ALTER COLUMN status SET NOT NULL;

CREATE INDEX orders_status_idx ON orders (status);

ALTER TABLE order_lines
    ADD CONSTRAINT order_lines_quantity_positive CHECK (quantity > 0);

COMMIT;
