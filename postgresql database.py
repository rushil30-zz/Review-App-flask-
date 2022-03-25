import psycopg2
conn = psycopg2.connect(database = "postgres", user = "postgres", password = "testpwd", host = "127.0.0.1", port = "5432")
print("Opened database successfully")

cur = conn.cursor()
# cur.execute('''create table reviewdb
#                 (id serial primary key,
#                 department text ,
#                 review text not null,
#                 status text);''')
cur.execute('''create table userdb
            (id serial primary key,
            firstname text,
            lastname text,
            username text,
            password text);''')

print("Table created successfully")



