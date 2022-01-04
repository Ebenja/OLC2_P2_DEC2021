import datetime
from flask import Flask, render_template, request, url_for, redirect,  jsonify,make_response
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from sklearn import linear_model
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import io
import base64
import json

fileCsv = None
rmse = 0 
r2 = 0
image64 = io.BytesIO()
coefL = 0
coefReg = 0
pred = 0
app = Flask(__name__)
CORS (app) # Comment on deploy
# CORS(app, resources={r"/*": {"origins": "*"}})
# api = Api(app)
# app.config['CORS HEADERS'] = 'Content-Type' 

@app.route("/")
@cross_origin()
def home():
    return "hola"

@app.route('/rep1', methods=['GET','POST'])
@cross_origin()
def rep1():
    global fileCsv 
    global image64
    global rmse
    global r2
    global coefL
    global pred
    fileCsv = None
    repActual=request.form['repActual'] #id
    fileCsv = request.files['fileCsv']
    headX=request.form['x']
    headY=request.form['y']
    isDateX = request.form['isDateX']
    
    # columna=request.form['columna']
    # valor=request.form['valor']
    # grado=request.form['grado']
    headFilter=request.form['headFilter']
    predict=request.form['predict']
    predictIsDate=request.form['predictIsDate']
    search=request.form['search']

    df = pd.read_csv(fileCsv)
    df.fillna(0)
    df.info
    print("Es Fecha")
    print(isDateX)
    fechaOriginal = []
    fechaO = []
    
    try:
        if (  not (len(headFilter) == 0  and len(search)==0)  ):
            print("funciona?")
            print("head: " + headFilter + " name: " + search)
            df= df.loc[df[headFilter] == search,]
        
        if ( isDateX =="true" ):
            print("ES Fecha X")
            print(headX)
            df[headX] = pd.DatetimeIndex(df[headX])
            # fechaO = pd.DatetimeIndex(df[headX])
            # fechaOriginal = df[headX].astype('category').cat.codes

        print(int(repActual))

        if (int(repActual )== 2 or int(repActual )== 4 or int(repActual )== 5 or int(repActual )== 8 or int(repActual )== 19 or int(repActual )== 21 or int(repActual )== 25  ):
            print("isdatePredict")
            # regrPolinomial(headX, headY,df)
            regrPolinomialpREDICCION(headX, headY, df, predict)
            # x= np.asarray(df[headX] ).reshape(-1, 1)
            # y = df[headY]
            
            # regr = LinearRegression()
            # regr.fit(x,y)
            # print("predict ")
            # print(fechaO)
            # y_pred = regr.predict(x)
            
            # plt.scatter(fechaO, y, color='black')
            # plt.plot(fechaO, y_pred, color='blue', linewidth=3)
            # # plt.ylim(0,1)
            # # plt.show()
            # print("regresion lineal")
            # coefL=regr.coef_
            
            # # print(regr.predict([[50]]))
            # # 


            # # ultimo =  df[headX].len()
            # # datoUltimo = df[headX][-1]
            # # xx[date] = xx[date].astype('category').cat.codes
            # if (isinstance(predict, datetime.datetime)):
            #     print("aquiiii")
            #     predict = predict.astype('category').cat.codes
            # pred = regr.predict([[predict]])

            # s = io.BytesIO()
    
            # plt.savefig(s, format='png', bbox_inches="tight")
            # plt.close()
            # s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
            # image64 ="data:image/png;base64," + s

            # if predictIsDate == "true":
            #     # datoFehca = pd.DatetimeIndex(predict)
            #     # fechaaa = datetime.strptime(predict, '%d/%m/%Y')
            # #  fechaaa.toordinal()
            #     print()
           
                # print(fechaaa.toordinal())
                # regrPolinomialpREDICCION(headX, headY,df,fechaaa.toordinal())
            # if predictIsDate == "false":
            #     regrPolinomialpREDICCION(headX, headY,df,predict)
        if (int(repActual )== 1 or int(repActual )== 7 or int(repActual )== 9 or int(repActual )== 15 or int(repActual )== 3 or int(repActual )== 6 or int(repActual )== 7 or int(repActual )== 15   ):
            print("entre polinomial")
            regrPolinomial(headX, headY,df)

        print(coefL)
        print(r2)
        print(rmse)
        print(pred)
        # print(coefL)

        # res = {
        #     "image64": json.dumps(image64),
        #     "rmse": json.dumps(rmse),
        #     "r2": json.dumps(r2),
        #     "coefL": json.dumps(coefL)
        # }
        if(isinstance(pred, list)):
            pred.tolist()

        res = {
            'resultStatus': 'SUCCESS',
            "image64": json.dumps(image64),
            "rmse": json.dumps(rmse),
            "r2": json.dumps(r2),
            "coefL": json.dumps(coefL.tolist()),
            "pred": json.dumps(pred),
        }
        # print(res)
        # return jsonify(res)
        return res
    except :
        return jsonify({'error': 'Admin access is required'}), 400
        # return make_response(jsonify({}), 400)


def regrPolinomial(headX, headY, df):
    global rmse
    global r2
    global image64
    global coefL
    global coefReg

    x = np.asarray(df[headX]).reshape(-1, 1)
    y = df[headY]

    # --- Regresion Lineal ---
    pf = PolynomialFeatures(degree = 10)
    x_trans = pf.fit_transform(x)

    regr = LinearRegression()
    regr.fit(x_trans, y)

    y_pred = regr.predict(x_trans)
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    r2 = r2_score(y, y_pred)

    coefL = regr.coef_

    plt.scatter(x, y, color='green')
    plt.plot(x, y_pred, color='blue')
    # plt.show()
    # plt.savefig()

    s = io.BytesIO()
    figure = plt.gcf()
    figure.set_size_inches (8, 6)
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    image64 ="data:image/png;base64," + s
    # print(image64)



def regrPolinomialpREDICCION(headX, headY, df, datoPred):
    global rmse
    global r2
    global image64
    global coefL
    global coefReg
    global pred

    # 


    # 

    x = np.asarray(df[headX]).reshape(-1, 1)
    y = df[headY]


    # regr = LinearRegression()
    # regr.fit(x, y)
    # y_pred = regr.predict(x)

    # """Graficos"""

    # plt.scatter(x, y, color='green')
    # plt.plot(x, y_pred, color='blue')

    # """Predicciones"""
    # print(datoPred)
    # print(regr.predict([[datoPred]]))



    # --- Regresion Lineal ---
    pf = PolynomialFeatures(degree = 10)
    x_trans = pf.fit_transform(x)

    regr = LinearRegression()
    regr.fit(x_trans, y)

    y_pred = regr.predict(x_trans)
    # pred = regr.predict([[datoPred]])
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    r2 = r2_score(y, y_pred)

    coefL = regr.coef_

    plt.scatter(x, y, color='green')
    plt.plot(x, y_pred, color='blue')
    # plt.show()
    # plt.savefig()



    s = io.BytesIO()
    figure = plt.gcf()
    figure.set_size_inches (8, 6)
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    image64 ="data:image/png;base64," + s
    # print(image64)

    




if __name__ == "__main__":
    # global readEntrada
    # f = open("./entrada.txt", "r")
    # readEntrada = f.read()
    app.run(debug=True,host='0.0.0.0', port=5000)