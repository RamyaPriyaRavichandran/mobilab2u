#!/bin/bash
# db-backup.sh

# Backup command
docker exec mongodb mongodump --db m4u --archive=/db-backups/$1.dump


# Restore command
# mongorestore --archive="x.dump" --nsFrom="m4u.*" --nsTo="exampledb.*"