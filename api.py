from flask import Flask, request,jsonify, Response
from flask_cors import CORS
from database_manager import User
from authenticator import JWT_Manager


app = Flask(__name__)
CORS(app)
user_info = User()
mask_jwt = JWT_Manager()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        exist_user = user_info.look_for_existing(data.get('username'),data.get('email'))
        if ( exist_user is None):
            result = user_info.insert_new_user(data.get('name'),data.get('lastname'),data.get('email'),data.get('username'),data.get('password'))
            user_id = result[0]
            role = result[1]
            token = mask_jwt.encode({'id':user_id,'role':role})
            return jsonify(token=token), 200
        else:
            return Response(status=409)
    except Exception as e:
        return Response(status=500)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        result = user_info.user_login(data.get('username'),data.get('password'))
        if (result ==None):
            return Response(status=403)
        else:
            user_id = result[0]
            role = result[6]
            token = mask_jwt.encode({'id':user_id,'role':role})

            return jsonify(token=token),200
    except Exception as e:
        print(e)


@app.route('/users')
def obtain_user_info():
    try:
        token = request.headers.get('Authorization')
        if(token is not None):
            token = token.replace("Bearer ","")
            decoded = mask_jwt.decode(token)
            user_id = decoded['id']
            user_details = user_info.user_infomartion(user_id)
            if  (user_details == None):
                return Response(status=404)
            else:
                return user_details
        else:
            return Response(status=503)
    except:
        return Response(status=503)

@app.route ('/user/password/change', methods=['POST'])
def change_password():
    
    try:
        token = request.headers.get('Authorization')
        if(token is not None):
            token = token.replace("Bearer ","")
            decoded = mask_jwt.decode(token)
            user_id = decoded['id']
            data = request.get_json()
            change_user_password = user_info.change_password(user_id,data.get('old'),data.get('new'))
            if (change_user_password == None):
                return Response(status=403)
            else:
                return Response(status=200)
        else:
            Response(status=503)
    except Exception as e:
        return Response(status=500)


@app.route ('/users/update', methods=['POST'])
def update_information():
    
    try:
        token = request.headers.get('Authorization')
        if(token is not None):
            data = request.get_json()
            token = token.replace("Bearer ","")
            decoded = mask_jwt.decode(token)
            user_id = decoded['id']
            update_user = user_info.update_user_information(user_id,data)
            if (update_user == None):
                return Response(status=401)
            else:
                return Response(status=200)
        else:
            return Response(status=503)
    except Exception as e:
        return Response(status=500)


    


if __name__ == "__main__":
    
    app.run(host='localhost', debug=True)