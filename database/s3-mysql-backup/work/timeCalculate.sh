#!/bin/bash

echo "$(date +'(%s)')"






echo -----------------------
before="$(date +%s)"
today=`date +%Y-%m-%d`



sleep 2




# Calculating time
after="$(date +%s)"
elapsed="$(expr $after - $before)"
hours=$(($elapsed / 3600))
elapsed=$(($elapsed - $hours * 3600))
minutes=$(($elapsed / 60))
seconds=$(($elapsed - $minutes * 60))

echo "[`date +%d/%m/%Y" "%H:%M:%S`] - STATS: Total time of backup: $hours hours $minutes minutes $seconds seconds"
echo "[`date +%d/%m/%Y" "%H:%M:%S`] - END BKP-FULL"
