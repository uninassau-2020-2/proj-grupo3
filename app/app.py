from flask import render_template, request, session, jsonify, redirect, url_for
from facade import Facade
from config import app

@app.route("/", methods=['GET','POST'])
def appLogin():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        clientRequest = {'function': 'confirmAuth', 'email': email, 'senha': senha}

        facade = Facade(clientRequest)
        user = facade.serverResponse()

        if user['status'] == True:
            return render_template("app.html",user=user['data'])
        else:
            return render_template("login.html")
    else:
        return render_template("login.html") 


@app.route("/RDCapi", methods=['POST'])
def appApi():
    aux_a = request.get_json(force=True)
    aux_b = jsonify(aux_a)
    clientRequest = aux_b.get_json()
    
    facade = Facade(clientRequest)
    return jsonify(facade.serverResponse()), facade.serverResponse()['status_code']


if __name__ == '__main__':
    app.run(app.config['HOST'], app.config['PORT'])