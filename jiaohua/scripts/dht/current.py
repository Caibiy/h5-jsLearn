#! /usr/bin/python
# -*- coding: UTF-8 -*-
import Adafruit_DHT
sensor = Adafruit_DHT.DHT11

pin = 18

humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

if humidity is not None and temperature is not None:
    print('success\n{0:0.1f},{1:0.1f}'.format(temperature, humidity))
else:
    print('error\nNone')
