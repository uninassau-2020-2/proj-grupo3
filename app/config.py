import os
from flask import Flask
from datetime import datetime, timedelta
import pymysql

app = Flask(__name__)
app.config["HOST"] = '0.0.0.0'
app.config["PORT"] = 5000
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = '89P_W}81bs%@7wLhw-1(~ek'
app.config["REMEMBER_COOKIE_DURATION"] = timedelta(minutes=30)


# Singleton -----------------------------------------------
def Dao(daoRequest = dict):
    Dao = pymysql.connect(
    	host = 'localhost',
    	user = 'root',
    	passwd = '',
        database = 'rdc'
    )
    dao = Dao.cursor(pymysql.cursors.DictCursor)
    try:
        if 'data' in daoRequest: 
            dao.execute(daoRequest['sql'], daoRequest['data'])
        else: 
            dao.execute(daoRequest['sql'])
        Dao.commit()
        return dao
    except pymysql.InternalError as error:
        code, message = error.args
        return code, message
#----------------------------------------------------------

