#!/bin/sh
if [ -n "$INITIAL_CONFIG" ] && [ ! -f $CONFIG_PATH/settings.json ]; then
    echo "$INITIAL_CONFIG" > $CONFIG_PATH/settings.json
fi
exec "$@"