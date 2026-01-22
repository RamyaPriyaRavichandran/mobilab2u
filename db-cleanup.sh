#!/bin/bash

# Directory containing the dump files
BACKUP_DIR="/db-backups"

# Change to the backup directory
cd "$BACKUP_DIR" || exit

# Find and remove all but the latest 10 dump files
ls -t *.dump | tail -n +11 | sudo xargs rm -f
