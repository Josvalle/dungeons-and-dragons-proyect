from sqlalchemy import create_engine, MetaData,Table, insert, select,update, delete, and_,or_ 


engine = create_engine('postgresql://postgres:!23J0$ue@localhost:5432/games')
metadata_obj = MetaData()

class User():
    def __init__(self):
        self.users_table = Table('users', metadata_obj, autoload_with=engine, schema='dyd',)
    

    def insert_new_user(self, user_name, last_name, user_email,username, password):
        try:
            stmt = insert(self.users_table).values(name=user_name, lastname=last_name, email=user_email, username=username, password=password,role_id=2)
            with engine.connect() as conn:
                result = conn.execute(stmt)
                conn.commit()
        except Exception as e:
            print(e)
            return None


    def user_login(self,username,password):
        try:
            stmt = select(self.users_table).where(self.users_table.c.username == username).where(self.users_table.c.password == password)
            with engine.connect() as conn:
                result = conn.execute(stmt)
                users = result.all()
                if(len(users)==0):
                    return None
                else:
                    return users[0]

        except:
            return('Something when wrong!')
    

    def look_for_existing(self,username,email):
        stmt = select(self.users_table).where(or_(self.users_table.c.username == username, self.users_table.c.email == email))
        with engine.connect() as conn:
                result = conn.execute(stmt)
                exist_users = result.first()
                if(exist_users is None):
                    return None
                else:
                    return exist_users[0]


    def change_password(self,id, old_password, new_password):
        try:
            change_password = (update(self.users_table).where(and_(self.users_table.c.id == id, self.users_table.c.password == old_password)).values(password = new_password ))
            with engine.begin() as conn:
                result = conn.execute(change_password)
                if result.rowcount == 0:
                    return None
                else:
                    return ('All good')
            
        except:
            pass
    

    def user_infomartion(self,id):
        stmt = select(self.users_table).where(self.users_table.c.id == id)
        with engine.begin() as conn:
            result = conn.execute(stmt)
            user_info = [dict(user_info._mapping) for user_info in result]
            if(len(user_info) == 0):
                return None
            else:
                return user_info[0]
            
    
    def update_user_information(self,id,data):
        stmt =  (update(self.users_table).where(self.users_table.c.id == id).values(**data))
        with engine.begin() as conn:
                result = conn.execute(stmt)
                if result.rowcount == 0:
                    return None
                else:
                    return ('All good')