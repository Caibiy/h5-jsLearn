# -*- coding: utf-8 -*-
#!/usr/bin/python

__author__ = 'yjd'

import RPi.GPIO as GPIO
import time

import Adafruit_DHT,os,time,datetime,sqlite3,uuid
conn,cursor=(None,None)

class base(object):
	global conn,cursor
	conn =  sqlite3.connect('../jiaohua.db')
	cursor = conn.cursor()
	#setup
	def __init__(self):
		cursor.execute('''CREATE TABLE IF NOT EXISTS setup(
			id int(11) PRIMARY key NOT NULL,
			danger_temp varchar(20),
			danger_soil_temp varchar(20),
			danger_soil_humidity varchar(20),
			enable_photo boolean default true,
			photo_time int(11) NOT NULL,
			
			''')
		#DHT 11 
		cursor.execute('''CREATE TABLE IF NOT EXISTS dht11(
			datetimes int unsigned primary key,
			temp varchar(20) NOT NULL,
			humidity varchar(20) NOT NULL 
			)
			''')
		#soil
		cursor.execute('''CREATE TABLE IF NOT EXISTS soil(
			datetimes int unsigned primary key,
			humidity varchar(20) NOT NULL
			)
			''')
		cursor.commit()

class soil(base):
	def insertHumidity(self,humidity):
		cursor.execute("INSERT INTO soil (datetimes,humidity) VALUES (NOW(),%s)" % (humidity) 
class dht11(base):
	def insertDht11