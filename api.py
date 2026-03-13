from flask import Flask, request,jsonify, Response
from flask_cors import CORS
from database_manager import User

app = Flask(__name__)
CORS(app)
user_info = User()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        exist_user = user_info.look_for_existing(data.get('username'),data.get('email'))
        if ( exist_user is None):
            result = user_info.insert_new_user(data.get('name'),data.get('lastname'),data.get('email'),data.get('username'),data.get('password'))
            return Response(status=200)
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
            return Response(status=200)
    except Exception as e:
        print(e)


@app.route('/users/<user_id>')
def obtain_user_info(user_id):
    user_details = user_info.user_infomartion(user_id)
    if  (user_details == None):
        return Response(status=404)
    else:
        return user_details
    

if __name__ == "__main__":
    
    app.run(host='localhost', debug=True)