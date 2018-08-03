web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 ./node_modules/json-server/lib/cli/bin.js --watch stats.json -p $PORT
worker: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 dist/main.js -p $PORT
