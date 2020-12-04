/** @RDCapp
 *  By - Neylor Cesar.
 *  _________________________________________
 *  Execute background request and response.
 *  Based axios framework v0.18.0 | (c) 2018.
 *  Return Callbak Promise based HTTP client.
 ******************************************************************/
function AxiosApi(cRequest, sResponse) {

    let config = {
        method: cRequest.Method,
        url: 'http://localhost:5000/RDCapi',
        data: cRequest,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/x-www-form-urlencoded'
    },
        json: true
    };
    axios(config)
        .then((res) => {
            response = res.data
            sResponse(response);
        })
        .catch((error) => {
            // Error
            sResponse(error)
            if (error.response) {
                let process = {};
                process.action = 'close';
                modalProcess(process);
                toastMsg('CBapp API OFLINE.');
                
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.request);
                console.log(error.config);
                console.log('Error', error.message);
            } 
        })

}
/******************************************************************/

function checkAuth(){

    //get form prepare request
    let request = {}
    $('#login').find('input').each(function(i, field) {
        request[field.name] = field.value;
        request['Method'] = 'POST';
        request['function'] = 'checkAuth';
    });
    //send request to apiAuth
    AxiosApi(request, function (response) {
        console.log(response)
        if(response.status_code == 200){
            
            $('#msg-login').css('display', 'none')
            $('#msg-login').text('Usuário Credenciado!')
            $('#msg-login').removeClass('animate__animated animate__tada hvr-xpulse')

            setTimeout(() => {
                $('#msg-login').css('display', 'inherit')                
                $('#msg-login').addClass('animate__animated animate__rubberBand')                
            }, 500);
            setTimeout(() => {
                $('#submit').click()
            }, 2000);

        } else {
            
            $('#msg-login').css('display', 'none')
            $('#msg-login').text('Erro: Dados incorretos!')
            $('#msg-login').removeClass('animate__animated animate__tada hvr-xpulse')

            setTimeout(() => {
                $('#msg-login').css('display', 'inherit')                
                $('#msg-login').addClass('animate__animated animate__tada hvr-xpulse')                
            }, 500);
            setTimeout(() => {
                $('#msg-login').removeClass('animate__animated animate__tada hvr-xpulse')                
            }, 2500);

        }
    })
}