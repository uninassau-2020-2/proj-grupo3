class User(object):

    def __init__(self, user_name, user_phone, user_email, user_pass, user_img_profile, user_type_profile, user_status):
        self._user_name = user_name
        self._user_phone = user_phone
        self._user_email = user_email
        self._user_pass = user_pass
        self._user_img_profile = user_img_profile
        self._user_type_profile = user_type_profile
        self._user_status = user_status

    #----  Getter and Setter  ----#
    @property
    def user_name(self):
        return self._user_name
    @user_name.setter
    def user_name(self, user_name):
        self._user_name = user_name

    @property
    def user_phone(self):
        return self._user_phone
    @user_phone.setter
    def user_phone(self, user_phone):
        self._user_phone = user_phone        

    @property
    def user_email(self):
        return self._user_email
    @user_email.setter
    def user_email(self, user_email):
        self._user_email = user_email        

    @property
    def user_pass(self):
        return self._user_pass
    @user_pass.setter
    def user_pass(self, user_pass):
        self._user_pass = user_pass        

    @property
    def user_img_profile(self):
        return self._user_img_profile
    @user_img_profile.setter
    def user_img_profile(self, user_img_profile):
        self._user_img_profile = user_img_profile        

    @property
    def user_type_profile(self):
        return self._user_type_profile
    @user_type_profile.setter
    def user_type_profile(self, user_type_profile):
        self._user_type_profile = user_type_profile        

    @property
    def user_status(self):
        return self._user_status
    @user_status.setter
    def user_status(self, user_status):
        self._user_status = user_status        
    #-----------------------------#

        

