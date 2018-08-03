web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 ./node_modules/serve/bin/serve -p $PORT
worker: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 dist/main.js -p $PORT
