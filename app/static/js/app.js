/** @RDCapp
 *  By - Neylor Cesar.
 *  _________________________________________
 *  Execute background request and response.
 *  Based axios framework v0.18.0 | (c) 2018.
 *  Return Callbak Promise based HTTP client.
 ******************************************************************/
function AxiosApi(cRequest, sResponse) {

    let config = {
        method: 'POST',
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
            sResponse(error.response.data)
            if (error.response) {
                
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

/****************** Abstract Select ID Element ********************/
function id(el) { return document.getElementById(el); }
/******************************************************************/

/****** msg toas all sistem ******/
//--------------------------------
function toastMsg(status, msg) {
    $('#block-level-1').fadeIn(0)
    if(status ? 'fa fa-check' : 'fa fa-exclamation-triangle');
    if(status){
       Icon = 'fa fa-check'
    } else {
       Icon = 'fa fa-exclamation-triangle'
    }
    iziToast.show({
        timeout: 2500,
        position: 'center',
        theme: 'dark',
        color: 'rdc',
        pauseOnHover: false,
        close: false,
        //title: 'RDCapp:',
        message: `<table style="width: 100%;">
                      <tr>
                          <td style="width: 15%;"><span style="float: left; font-size: 1.5em;" class="`+Icon+`"></span></td>
                          <td style="width: 85%;"><span style="font-weight: 500; font-size: 1.2em;">`+msg+`</span></td>
                      </tr>
                  </table>`
    });
    setTimeout(() => {
        $('#block-level-1').fadeOut(0)        
    }, 2700);
}//-------------------------------
/*********************************/

function prepareSection(entity){
    
    switch (entity) {

        case 'bt-usuario':
            
            //nome do ambiente
            $('#name-home').text('USUÁRIOS')
            
            //nome da 1 coluna da tabela
            $('#list-first-column-title').text('NOME DO USUÁRIO')
            
            //nome da 2 coluna da tabela
            $('#list-second-column-title').text('PERFIL')
            
            //set function add create
            $('#add').attr('onclick', "prepareCreate('user')")
            
            // set text placeholder input find
            $('#find').attr('placeholder', 'Localizar por Nome ou E-mail')

            //iniciar a listagem
            listUsers()

            //abrir o ambiente ja preparado
            openAmb()
            
        break;
    
        default:
        break;
    }
}

function openAmb(){
    $('#master-buttons').fadeOut()
    $('#buttons-separator').fadeIn(300)
    $('#master-amb').fadeIn(500)
}

function closeAmb(){
    $('#buttons-separator').fadeOut(100)
    $('#master-amb').fadeOut(300)
    $('#master-buttons').fadeIn()
}

function closeForms(){

    $('#form-user')[0].reset();
    $('#form-user').fadeOut(0)

    $('#icon-title-modal').removeAttr('class')
}

function prepareCreate(entity){

    closeForms();

    switch (entity) {
        case 'user':
            $('#icon-photo-create-user').fadeIn(0);
            $('#photo-create-user').removeAttr('style');
            $('#form-user').fadeIn(0);
            $('#icon-title-modal').attr('class', 'fa fa-user');
            $('#form-user-function').val('createUser');
            $('#title-modal').text('CADASTRO DE USUÁRIO');
            $('#submit-user').text('CADASTRAR');
            $('#user_pass').attr('required', 'true');
            $('#confirm_pass').attr('required', 'true');
            $('#user_status_true').prop('checked', true);
            $('#form-'+entity).fadeIn(0);
            $('#f-user').fadeIn(0);
            $('#forms').fadeIn();
        break;
    
        default:
            break;
    }

}

function prepareUpdate(Entity){

    closeForms()

    let data = Entity.split("-");
    let entity = data[0]
    let entity_id = data[1]

    switch (entity) {
        case 'user':
        
            $('#form-user').fadeIn(0)
            $('#icon-title-modal').attr('class', 'fa fa-user')
            $('#form-user-function').val('updateUser')
            $('#title-modal').text('ALTERAÇÃO DE USUÁRIO')
            $('#submit-user').text('ALTERAR')
            //$('#submit-user').attr('onclick', `updateUser('${entity_id}')`)
            $('#user_pass').removeAttr('required')
            $('#confirm_pass').removeAttr('required')
            $('#form-user').fadeIn(0)
            $('#f-user').fadeIn(0)
            $('#forms').fadeIn(1000)
            getDataUser(entity_id)
            break;

        default:
            break;
    }

}

function prepareList(entity, list){

        //limpar lista
        $("#master_list").empty();

    switch (entity) {
        case 'user':
            list.forEach((user, i) => {
                let styleBgList = '';
                styleBlockList = ''
                
                if(user.user_status == 'A'){
                    styleBgList = `style="width: 96%; margin-left: 0%; color: brown; border: solid 1px brown; background-color: white;  border-radius: 5px; height: 30px;"`
                } else {            
                    styleBgList = `style="width: 96%; margin-left: 0%; border: solid 1px gray; background-color: #ccc;  border-radius: 5px; height: 30px; color: gray;"`
                    styleBlockList = '<span class="fa fa-ban"></span>'
                }
                
                view = `<div id="user-${user.user_id}" style="margin-top: 0.35em;" onclick="prepareUpdate(this.id)">
                            <section id="list-${i}" onmouseover="efectBtBgHover(this.id, 'add')" onmouseout="efectBtBgHover(this.id, 'remove')" class="cp hvr-wobble-top" ${styleBgList}>
                                <div style="width: 55%; margin-top: 0.3em; display: inline; float: left; text-transform: capitalize; text-align: left; padding-left: 8px;">
                                    ${styleBlockList} ${user.user_name}
                                </div>
                                <div id="list-${i}-second-column" style="width: 30%; margin-top: 0.3em; display: inline; float: right; text-align: left; padding-left: 8px; border-left: 1px solid brown;">
                                    ${user.user_type_profile}
                                    <span style="display: none;">${user.user_name} ${user.user_type_profile} ${user.user_email}</span>
                                </div>
                            </section>
                        </div>`;
                        master_list.innerHTML += view
            });
        break;
    
        default:
            break;
    }

}

$(document).ready(function () {
    /** Search User ****/
    $("#bt-find").on("click", function () {
        var value = $('#find').val().toLowerCase();
        $("#master_list section").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    /*******************/
    $('#form-user').each(function(){
        $(this).submit(function(e){
            e.preventDefault();
            if($('#form-user-function').val() == 'createUser'){
                createUser()
            } else {
                updateUser()
            }
            return  false;
        })
    })
})


function efectBtBgHover(id, action){
    if(action == 'add'){
        $('#'+id).addClass('bg-button-hover');
        if (id.indexOf('list') > -1){
            $('#'+id).css('color', 'white');
            $('#'+id+'-second-column').css('border-left', '1px solid white')
        }
    } else {
        $('#'+id).removeClass('bg-button-hover');
        if (id.indexOf('list') > -1){
            $('#'+id).css('color', 'brown');
            $('#'+id+'-second-column').css('border-left', '1px solid brown')
        }
    }
}