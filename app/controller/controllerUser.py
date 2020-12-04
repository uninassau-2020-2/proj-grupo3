from flask import jsonify
from model.user import User
from model.dao.daoUser import DaoUser

class ControllerUser():

    def __init__(self, data = dict):
        self._data = data
        self._response = {}
        
    #----  Getter and Setter  ----#
    @property
    def data(self):
        return self._data
    @data.setter
    def data(self, data):
        self._data = data

    @property
    def response(self):
        return self._response
    @response.setter
    def response(self, response):
        self._response = response        
    #-----------------------------#

    def checkAuth(self):
        # Dao Request and Response -----------
        daoRequest = DaoUser(self.data)
        daoResponse = daoRequest.checkAuth()
        #-------------------------------------        
        if daoResponse.rowcount == 1:
            response = {'msg': True, 'status_code': 200}
            return response
        else:
            response = {'msg': False, 'status': 'Unauthorized', 'status_code': 401} #401 Unauthorized
            return response
            
    def confirmAuth(self):
        # Dao Request and Response -----------
        daoRequest = DaoUser(self.data)
        daoResponse = daoRequest.confirmAuth()
        #-------------------------------------
        dataUser = daoResponse.fetchall()[0]
        del dataUser['user_pass']
        if daoResponse.rowcount == 1:
            dataUser['user_name'] = dataUser['user_name'].split(' ')[0]
            response = {'status': True, 'data': dataUser}
            return response
        else:
            response = {'status': False}
            return response

    def listUsers(self):
        # Dao Request and Response -----------
        daoRequest = DaoUser(self.data)
        daoResponse = daoRequest.listUsers()
        #-------------------------------------        
        if daoResponse.rowcount > 0:
            response = {'msg': True, 'data': daoResponse.fetchall(), 'status_code': 200}
            return response
        else:
            response = {'msg': False, 'status_code': 204} #204 No Content
            return response

    def checkUserExist(self):
        # Dao Request and Response -----------
        daoRequest = DaoUser(self.data)
        daoResponse = daoRequest.checkUserExist()
        if daoResponse.rowcount > 0:
            return True
        else:
            return False
        #-------------------------------------
    
    def createUser(self):

        if self.checkUserExist():
            response = {'data': False, 'msg': 'E-mail já cadastrado para outro usuário.', 'status': 'Conflict', 'status_code': 409} #409 Conflict
            return response
        else:
            u = self.data
            user = User(u['user_name'], u['user_phone'], u['user_email'], u['user_pass'], u['user_img_profile'], u['user_type_profile'], u['user_status'])

            if user.user_pass != u['confirm_pass']:
                response = {'msg': 'Erro: Senhas não conferem!', 'status': 'Conflict', 'status_code': 409} #409 Conflict
                return response
            
            # Dao Request and Response ---------------
            daoRequest = DaoUser(self.data)
            daoResponse = daoRequest.createUser(user)
            #-----------------------------------------        
            if daoResponse.rowcount > 0:
                response = {'msg': 'Cadastro realizado com sucesso!', 'status': 'Created', 'status_code': 201} #201 Created
                return response
            else:
                response = {'msg': 'Erro Interno', 'status': 'Internal server error', 'status_code': 500} #500 Internal server error
                return response
    
    def getDataUser(self):
            
        # Dao Request and Response -----------
        daoRequest = DaoUser(self.data)
        daoResponse = daoRequest.getDataUser()
        #-------------------------------------

        if daoResponse.rowcount == 1:
            
            dataUser = daoResponse.fetchall()[0]
            del dataUser['user_pass']
            response = {'status': True, 'data': dataUser}
            response = {'data': dataUser, 'status_code': 200} #200 Ok
            return response
        else:
            response = {'data': False}
            return response

    def updateUser(self):

        if self.checkUserExist():
            response = {'data': False, 'msg': 'E-mail já cadastrado para outro usuário.', 'status': 'Conflict', 'status_code': 409} #409 Conflict
            return response
        else:
            u = self.data
            user = User(u['user_name'], u['user_phone'], u['user_email'], u['user_pass'], u['user_img_profile'], u['user_type_profile'], u['user_status'])

            if user.user_pass != u['confirm_pass']:
                response = {'msg': 'Erro: Senhas não conferem!', 'status': 'Conflict', 'status_code': 409} #409 Conflict
                return response
            
            # Dao Request and Response ---------------
            daoRequest = DaoUser(self.data)
            daoResponse = daoRequest.updateUser(user)
            #-----------------------------------------        
            if daoResponse.rowcount > 0:
                response = {'msg': 'Alteração realizada com sucesso!', 'status': 'Created', 'status_code': 201} #201 Created
                return response
            else:
                response = {'msg': 'Erro Interno', 'status': 'Internal server error', 'status_code': 500} #500 Internal server error
                return response

    