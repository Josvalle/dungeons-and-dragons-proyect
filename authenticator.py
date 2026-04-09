import jwt

class JWT_Manager:
    def __init__(self):
        with open('private_key.pem', 'rb') as private:
            self.private_key = private.read()
        with open('public_key.pem', 'rb') as public:
            self.public_key = public.read()

    
    def encode(self, data):
        try:
            encoded = jwt.encode(data, self.private_key, algorithm="RS256")
            return encoded
        except Exception as e:
            print(f"Error: {e}")
            return None

    def decode(self, token):
        try:
            decoded = jwt.decode(token, self.public_key, algorithms=["RS256"])
            return decoded
        except Exception as e:
            print(e)
            return None