#!/bin/sh
if [ -n "$INITIAL_CONFIG" ] && [ ! -f $CONFIG_PATH/setting.json ]; then
    echo "$INITIAL_CONFIG" > $CONFIG_PATH/setting.json
fi
exec "$@"