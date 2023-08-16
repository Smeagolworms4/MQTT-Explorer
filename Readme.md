# MQTT Explorer NodeJS HTTP Server

[![pipeline status](https://github.com/Smeagolworms4/MQTT-Explorer/actions/workflows/build_images.yml/badge.svg)](https://github.com/Smeagolworms4/MQTT-Explorer/actions/workflows/build_images.yml)


[!["Buy Me A Coffee"](https://raw.githubusercontent.com/Smeagolworms4/donate-assets/master/coffee.png)](https://www.buymeacoffee.com/smeagolworms4)
[!["Buy Me A Coffee"](https://raw.githubusercontent.com/Smeagolworms4/donate-assets/master/paypal.png)](https://www.paypal.com/donate/?business=SURRPGEXF4YVU&no_recurring=0&item_name=Hello%2C+I%27m+SmeagolWorms4.+For+my+open+source+projects.%0AThanks+you+very+mutch+%21%21%21&currency_code=EUR)


Compile NodeJS version for MQTT explorer. You can use in browser

## Usage

Pull repository

```bash
docker pull smeagolworms4/mqtt-explorer
```


Run container:

```bash
docker run -p 4000:4000 -v$(pwd)/config:/mqtt-explorer/config smeagolworms4/mqtt-explorer
```

## Environment variables

```
HTTP_PORT=4000
CONFIG_PATH=/mqtt-explorer/config
HTTP_USER=
HTTP_PASSWORD=
SSL_KEY_PATH=
SSL_CERT_PATH=
INITIAL_CONFIG= # Initial json configuration for start
```


## Docker hub

https://hub.docker.com/r/smeagolworms4/mqtt-explorer

## Github

https://github.com/Smeagolworms4/MQTT-Explorer

## Home Assistant Addon

https://github.com/GollumDom/addon-repository
