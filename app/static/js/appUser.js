//Usuario ******************************
let User = new Object

function listUsers(){
    let request = {function: 'listUsers'}        
    //send request to axios
    AxiosApi(request, function (response) {
        prepareList('user', response.data)
    })
}

function getDataUser(user_id){
    User['user_id'] = user_id
    let request = {function: 'getDataUser', user_id: user_id}
    //send request to axios
    AxiosApi(request, function (response) {
        let user = response.data
        $('#user_name').val(user.user_name)
        $('#user_email').val(user.user_email)
        $('#user_phone').val(user.user_phone)
        $('#user_type_profile').val(user.user_type_profile)
        
        $('#icon-photo-create-user').fadeOut(0)
        let photoFormUser = `background-image: url('/static/img/users/${user.user_img_profile}'); background-repeat: no-repeat; background-size: contain;`
        $('#photo-create-user').attr('style', photoFormUser)


        if (user.user_status == 'A') {
            $('#user_status_true').prop('checked', true)
        } else {
            $('#user_status_false').prop('checked', true)
        }
    })
}

function createUser(){
    let request = {}

    $('#form-user').find('input', 'select').each(function(i, field) {
        request[field.name] = field.value;
        request['function'] = request['form-user-function']
        delete request['form-user-function']
        let type_profile = id('user_type_profile')
        request['user_type_profile'] = type_profile.options[type_profile.selectedIndex].value
        request['user_status'] = $('.check_user_status:checked').val();
        request['user_img_profile'] = 'user.png'
    });
    //send request to apiAuth
    AxiosApi(request, function (response) {
        switch (response.status_code) {
            case 201:
                toastMsg(true, response.msg)
                $('#form-user')[0].reset()
                listUsers()
                $('#forms').fadeOut(1000)
            break;
            case 409:
                toastMsg(false, response.msg)                
            break;
        
            default:
                break;
        }
    })
}

function updateUser(){
    let request = {}

    $('#form-user').find('input', 'select').each(function(i, field) {
        request[field.name] = field.value;
        request['user_id'] = User.user_id;
        request['function'] = request['form-user-function']
        delete request['form-user-function']
        let type_profile = id('user_type_profile')
        request['user_type_profile'] = type_profile.options[type_profile.selectedIndex].value
        request['user_status'] = $('.check_user_status:checked').val()
        request['user_img_profile'] = 'user.png'
    });
    //send request to api
    AxiosApi(request, function (response) {
        switch (response.status_code) {
            case 201:

                toastMsg(true, response.msg)                
                listUsers()

                setTimeout(() => {
                    $('#forms').fadeOut()                    
                }, 2500);

            break;
            case 409:
                toastMsg(false, response.msg)                
            break;
        
            default:
                break;
        }
    })
}
//**************************************