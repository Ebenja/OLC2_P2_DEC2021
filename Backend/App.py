from flask import Flask, render_template, request, url_for, redirect,  jsonify,make_response
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import io
import base64

fileCsv = None
rmse = 0 
r2 = 0
image64 = io.BytesIO()

app = Flask(__name__)
# CORS (app) # Comment on deploy
CORS(app, resources={r"/*": {"origins": "*"}})
# api = Api(app)
app.config['CORS HEADERS'] = 'Content-Type' 

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
    search=request.form['search']

    df = pd.read_csv(fileCsv)
    print("Es Fecha")
    print(isDateX)
    
    try:
        if (  not (len(headFilter) == 0  and len(search)==0)  ):
            print("funciona?")
            print("head: " + headFilter + " name: " + search)
            df= df.loc[df[headFilter] == search,]
        
        if ( isDateX =="true" ):
            print("ES Fecha X")
            df[headX] = pd.DatetimeIndex(df[headX])
            # df[headX] = df[headX].map(pd.Timestamp.toordinal)

        regrPolinomial(headX, headY,df)

        res = {
            "image64": image64,
            "rmse": rmse,
            "r2": r2,
        }
        # return jsonify({"isCorrect": True, "api": "python"})
        return make_response(jsonify(res), 200)
    except :
        return jsonify({'error': 'Admin access is required'}), 400
        # return make_response(jsonify({}), 400)


def regrPolinomial(headX, headY, df):
    global rmse
    global r2
    global image64

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

    plt.scatter(x, y, color='green')
    plt.plot(x, y_pred, color='blue')
    plt.show()
    # plt.savefig()

    s = io.BytesIO()
    plt.savefig(s, format='png', bbox_inches="tight")
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    image64 = s

if __name__ == "__main__":
    # global readEntrada
    # f = open("./entrada.txt", "r")
    # readEntrada = f.read()
    app.run(debug=True)