#! /usr/bin/python
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(27,GPIO.IN)
state = GPIO.input(27);
print(state)
