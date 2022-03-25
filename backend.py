import psycopg2
from flask import Flask, make_response, request,jsonify
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'
cors = CORS(app)
conn = psycopg2.connect(database = "postgres", user = "postgres", password = "testpwd", host = "127.0.0.1", port = "5432")
cur = conn.cursor()

def datadict(data):
    data_list=[]
    for i in data:
        dic = {}
        dic['id'] = i[0]
        dic['department']=i[1]
        dic['review'] = i[2]
        dic['status'] = i[3]
        data_list.append(dic)
    #print(data_list)
    return data_list

def userdict(data):
    user_list=[]
    for i in data:
        dic={}
        dic['id'] = i[0]
        dic['firstname'] = i[1] 
        dic['lastname'] = i[2]
        dic['username'] = i[3]   
        dic['password'] = i[4]    
        user_list.append(dic)
    return user_list      

@app.route('/auth', methods=["POST"])
def auth():
    req = request.get_json()
    eusername = req['username']
    epassword = req['password']
    cur.execute("select username, password from userdb where username='{}' and password='{}'".format(eusername, epassword))
    rows = cur.fetchone()
    print(rows)   
    if  rows != None:
        auth = 'True'
    else:
        auth = 'False'   
    data = {"auth":auth}        
    res = make_response(jsonify(data), 200)
    return (res)


def avghrrat():
    cur.execute("select count(Status) from reviewdb where status='Happy' and department='HR'")
    num1 = cur.fetchone()
    cur.execute("select count(Status) from reviewdb where department='HR'")
    total1 = cur.fetchone()
    avgrat = num1[0]/total1[0]
    avg = round(avgrat, 2)
    return avg

def avgaccrat():
    cur.execute("select count(Status) from reviewdb where status='Happy' and department='Accounts'")
    num1 = cur.fetchone()
    cur.execute("select count(Status) from reviewdb where department='Accounts'")
    total1 = cur.fetchone()
    avgrat = num1[0]/total1[0]
    avg = round(avgrat, 2)
    return avg    

def avgitrat():
    cur.execute("select count(Status) from reviewdb where status='Happy' and department='IT'")
    num1 = cur.fetchone()
    cur.execute("select count(Status) from reviewdb where department='IT'")
    total1 = cur.fetchone()
    avgrat = num1[0]/total1[0]
    avg = round(avgrat, 2)
    return avg

def avgsuprat():
    cur.execute("select count(Status) from reviewdb where status='Happy' and department='Support'")
    num1 = cur.fetchone()
    cur.execute("select count(Status) from reviewdb where department='Support'")
    total1 = cur.fetchone()
    avgrat = num1[0]/total1[0]
    avg = round(avgrat, 2)
    return avg


@app.route('/getdata')   
def getdata():
    cur.execute("select * from reviewdb")
    rows = cur.fetchall()  
    data = datadict(rows)

    avghr = avghrrat()
    avgacc = avgaccrat()
    avgit = avgitrat()
    avgsup = avgsuprat()

    data = {
        'data':data,
        'avghr':avghr,
        'avgacc':avgacc,
        'avgit':avgit,
        'avgsup':avgsup
    }
    # print(data)
    res = make_response(jsonify(data), 200)
    # print(res)
    return res


@app.route('/alluser')  
def alluser():
    cur.execute("select * from userdb")
    rows = cur.fetchall()
    data = userdict(rows)
    res = make_response(jsonify(data), 200)
    return res

@app.route('/newuser', methods=['POST'])
def newuser():
    req = request.get_json()
    firstname = req['firstname']
    lastname = req['lastname']
    username = req['username']
    password = req['password']
    cur.execute("insert into userdb (firstname, lastname, username, password) values (%s, %s, %s, %s)", (firstname, lastname, username, password))
    conn.commit()
    cur.execute("select * from userdb")
    rows = cur.fetchall()
    tasks = userdict(rows)
    res = make_response(jsonify(tasks), 200)
    return res



@app.route('/addnew', methods=['POST'])
def addnew():
    req = request.get_json()
    department = req['department']
    review = req['review']
    status = req['status']

    cur.execute("insert into reviewdb (department, review, status) values (%s, %s, %s)", (department, review, status))
    conn.commit()
    cur.execute("select * from reviewdb")
    rows = cur.fetchall()
    tasks = datadict(rows)
    res = make_response(jsonify(tasks), 200)
    return res

@app.route('/allusername', methods=['POST'])    
def allusername():
    req = request.get_json()
    eusername = req['username']
    cur.execute("select username from userdb where username='{}'".format(eusername))
    rows = cur.fetchone()
    if rows != None:
        # return true when username exists
        auth = True
    else:
        # returns false when username does not exist
        auth = False
    data = {"auth":auth}
    res = make_response(jsonify(data), 200)
    return res        

if __name__ == "__main__":
    app.run(debug = True)
