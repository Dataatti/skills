#!/bin/sh
pg_dump "$DATABASE_URL" | gzip > /tmp/brewbarn-$(date +%F).sql.gz
aws s3 cp /tmp/brewbarn-$(date +%F).sql.gz s3://brewbarn-backups/
