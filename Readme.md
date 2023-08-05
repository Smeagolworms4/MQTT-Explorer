# MQTT Explorer NodeJS HTTP Server

[![pipeline status](https://github.com/Smeagolworms4/MQTT-Explorer/actions/workflows/build_images.yml/badge.svg)](https://github.com/Smeagolworms4/MQTT-Explorer/actions/workflows/build_images.yml)

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
```


## Docker hub

https://hub.docker.com/r/smeagolworms4/mqtt-explorer

## Github

https://github.com/Smeagolworms4/MQTT-Explorer

## Home Assistant Addon

https://github.com/GollumDom/addon-repository
