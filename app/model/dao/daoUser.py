from model.user import User
from config import Dao

class DaoUser():

    def __init__(self, data = {}):
        self._data = data

    #-------  Getter and Setter  -------#
    @property
    def data(self):
        return self._data
    @data.setter
    def data(self, data):
        self._data = data
    #-----------------------------------#

    def checkAuth(self):
        sql  = ("SELECT * FROM tbl_user WHERE user_email = %s AND user_pass = %s AND user_status = 'A' LIMIT 1;")
        data = (self.data['email'], self.data['senha'])
        daoRequest  = {'sql': sql, 'data': data}
        daoResponse = Dao(daoRequest)
        return daoResponse


    def checkUserExist(self):
        if(self.data['function'] == 'createUser'):
            sql  = ("SELECT * FROM tbl_user WHERE user_email = %s LIMIT 1;")
            data = (self.data['user_email'])
        else:
            sql  = ("SELECT * FROM tbl_user WHERE user_email = %s AND user_id != %s LIMIT 1;")
            data = (self.data['user_email'], str(self.data['user_id']))

        daoRequest  = {'sql': sql, 'data': data}
        daoResponse = Dao(daoRequest)
        return daoResponse


    def getDataUser(self):
        sql  = ("SELECT * FROM tbl_user WHERE user_id = %s;")
        data = (self.data['user_id'])
        daoRequest  = {'sql': sql, 'data': data}
        daoResponse = Dao(daoRequest)
        return daoResponse


    def confirmAuth(self):
        return self.checkAuth()

        
    def listUsers(self):
        sql  = ("SELECT user_id, user_name, user_email, user_type_profile, user_status FROM tbl_user;")
        daoRequest  = {'sql': sql}
        daoResponse = Dao(daoRequest)
        return daoResponse
        

    def createUser(self, User=User):        
        sql  = ("""INSERT INTO tbl_user (user_name, user_phone, user_email, user_pass, user_img_profile, user_type_profile, user_status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s);""")
        data = (str(User.user_name), self.data['user_phone'], self.data['user_email'], self.data['user_pass'], self.data['user_img_profile'], self.data['user_type_profile'], self.data['user_status'])


        daoRequest  = {'sql': sql, 'data': data}
        daoResponse = Dao(daoRequest)
        return daoResponse

    def updateUser(self, User=User):
        sql  = ("""UPDATE tbl_user SET user_name=%s, user_phone=%s, user_email=%s, user_type_profile=%s, user_status=%s WHERE user_id=%s""")
        data = (str(User.user_name), self.data['user_phone'], self.data['user_email'], self.data['user_type_profile'], self.data['user_status'], self.data['user_id'])

        daoRequest  = {'sql': sql, 'data': data}
        daoResponse = Dao(daoRequest)
        return daoResponse
