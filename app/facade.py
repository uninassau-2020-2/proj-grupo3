from controller.controllerUser import ControllerUser

class Facade():

    def __init__(self, clientRequest = dict):

        self.request  = clientRequest
        
        self.response = {'data': {}, 'status': False, 'status_code': 404}
        self.setController()

    def setController(self):

        function = self.request['function']

        #--------- Controller User ----------#
        if function == 'checkAuth':
           c = ControllerUser(self.request)
           self.response = c.checkAuth()
        
        elif function == 'confirmAuth':
           c = ControllerUser(self.request)
           self.response = c.confirmAuth()

        elif function == 'listUsers':
           c = ControllerUser(self.request)
           self.response = c.listUsers()

        elif function == 'createUser':
            c = ControllerUser(self.request)
            self.response = c.createUser()

        if function == 'getDataUser':
            c = ControllerUser(self.request)
            self.response = c.getDataUser()

        if function == 'updateUser':
            c = ControllerUser(self.request)
            self.response = c.updateUser()
        #------------------------------------#                

        else:
            pass

    def serverResponse(self):
        return self.response