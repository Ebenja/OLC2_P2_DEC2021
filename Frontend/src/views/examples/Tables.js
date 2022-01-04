
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  FormGroup,
  Input,
  CardImg,
  Button,
  Col,
  Row,
  Form,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";
import React, {useState} from 'react';
import * as CSV from 'csv-string';
import Swal from 'sweetalert2'
import  {services}  from '../../services/services.js';
import { PDFViewer, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import mammoth from "mammoth";
                                   
                          
// core components
// import Header from "components/Headers/Header.js";

const Tables = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [colHeaders, setColHeaders] = useState([]);
  const [colRepsOptions, setRepsOptions] = useState([]);
  const [textCsv, settextCsv] = useState("");

  const [bandPrediccion, setbandPrediccion] = useState(false);
  // Reportes
  const [repActual, setrepActual] = useState("");
  const [repActualTitle, setrepActualTitle] = useState("");
  const [descRepActual, setdescRepActual] = useState("");
  const [instrRepActual, setinstrRepActual] = useState("");
  const [imageActual, setimageActual] = useState("");
  // let imageActual; 

  const [headX, setheadX] = useState("");
  const [isDateheadX, setisDateheadX] = useState(false);
  const [headY, setheadY] = useState("");
  const [headFilter, setheadFilter] = useState("");
  const [search, setSearch] = useState("");
  const [predict, setPredict] = useState("");
  const [predictIsDate, setpredictIsDate] = useState(false);
  const [reports, setReports] = useState([
    { id: 1, report: "Tendencia de la infección por Covid-19 en un País.", completed: true},
    { id: 2, report: "Predicción de Infectados en un País.",completed: false},
    { id: 3, report: "Indice de Progresión de la pandemia.",completed: false},
    { id: 4, report: "Predicción de mortalidad por COVID en un Departamento.",completed: false},
    { id: 5, report: "Predicción de mortalidad por COVID en un País.",completed: false},
    { id: 6, report: "Análisis del número de muertes por coronavirus en un País.",completed: false},
    { id: 7, report: "Tendencia del número de infectados por día de un País.",completed: true},
    { id: 8, report: "Predicción de casos de un país para un año.",completed: false},
    { id: 9, report: "Tendencia de la vacunación de en un País.",completed: true},
    { id: 10, report: "Ánalisis Comparativo de Vacunaciópn entre 2 paises.",completed: false},
    { id: 11, report: "Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo",completed: false},
    { id: 12, report: "Ánalisis Comparativo entres 2 o más paises o continentes.",completed: false},
    { id: 13, report: "Muertes promedio por casos confirmados y edad de covid 19 en un País.",completed: false},
    { id: 14, report: "Muertes según regiones de un país - Covid 19.",completed: false},
    { id: 15, report: "Tendencia de casos confirmados de Coronavirus en un departamento de un País.",completed: true},
    { id: 16, report: "Porcentaje de muertes frente al total de casos en un país, región o continente.",completed: false},
    { id: 17, report: "Tasa de comportamiento de casos activos en relación al número de muertes en un continente.",completed: false},
    { id: 18, report: "Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País.",completed: false},
    { id: 19, report: "Predicción de muertes en el último día del primer año de infecciones en un país.",completed: false},
    { id: 20, report: "Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19",completed: false},
    { id: 21, report: "Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor",completed: false},
    { id: 22, report: "Tasa de mortalidad por coronavirus (COVID-19) en un país.",completed: false},
    { id: 23, report: "Factores de muerte por COVID-19 en un país.",completed: false},
    { id: 24, report: "Comparación entre el número de casos detectados y el número de pruebas de un país.",completed: false},
    { id: 25, report: "Predicción de casos confirmados por día",completed: false}
  ]);

  const [instr, setInstr] = useState( [
    {id: 1, reportDesc:"1. Seleccione  Variable Independiente X (Ya sea Fecha, o una Susesion de numero)\n2.Seleccione El NO CASOS como variable Dependiente Y\n3.Seleccione el Filtro Pais, y el Pais que va a FIltrar",},
    {id: 2, reportDesc:"1. Selecccione #Infectados como vaiable Y y como Variable X, los #Dias, Luego Filtre por pais \n2.  Ingrese Dato a Predecir"},
    {id: 3, reportDesc:"1.  \n2. "},
    {id: 4, reportDesc:"1. Se Selecciona como variable independiente X= #DIAS y como depndendientes Y=#CasosMortales \n2. Se seleccion #DEPARTAMENTO Ingrese Dato a Predecir"},
    {id: 5, reportDesc:"1. Se Selecciona como variable independiente X= #DIAS y como depndendientes Y=#CasosMortales \n2. Se seleccion #PAIS Ingrese Dato a Predecir"},
    {id: 6, reportDesc:"1.  \n2. "},
    {id: 7, reportDesc:"1. Seleccione  Variable Independiente X Fechha, y si es de tipo Date Seleccione en CheckBox\n2.Seleccione El NO CASOS como variable Dependiente Y\n3.Seleccione el Filtro Pais, y el Pais que va a Filtrar"},
    {id: 8, reportDesc:"1. InDependiente X => Año  \n2. Dependiente Y=> Casos, \n3. Se selecciono el Pais \n Ingrese Dato a Predecir"},
    {id: 9, reportDesc:"1. Seleccione  Variable Independiente X (Ya sea Fecha, o una Susesion de numero), y si es de tipo Date Seleccione en CheckBox\n2.Seleccione El #NO VACUNAS como variable Dependiente Y\n3.Seleccione el Filtro DEPARTAMENTO, y el Pais que va a Filtrar"},
    {id: 10, reportDesc:"1.  \n2. "},
    {id: 11, reportDesc:"1.  \n2. "},
    {id: 12, reportDesc:"1.  \n2. "},
    {id: 13, reportDesc:"1.  \n2. "},
    {id: 14, reportDesc:"1.  \n2. "},
    {id: 15, reportDesc:"1. Seleccione  Variable Independiente X (Ya sea Fecha, o una Susesion de numero), y si es de tipo Date Seleccione en CheckBox\n2.Seleccione El #CASOS CONFIRMADOS como variable Dependiente Y\n3.Seleccione el Filtro DEPARTAMENTO, y el Departamento que va a Filtrar"},
    {id: 16, reportDesc:"1.  \n2. "},
    {id: 17, reportDesc:"1.  \n2. "},
    {id: 18, reportDesc:"1.  \n2. "},
    {id: 19, reportDesc:"1.Variable X=> Fechas  \n2.Variable Y=> Muertes \n 3.Seleccion de Pais \n 4. Ingrese Dato a Predecir"},
    {id: 20, reportDesc:"1.  \n2. "},
    {id: 21, reportDesc:"1. Seleccione en X=> Casos \n2. Seleccione en Y=> Muertes \n 3. no Aplique filtro \n 4. Ingrese Dato a Predecir"},
    {id: 22, reportDesc:"1.  \n2. "},
    {id: 23, reportDesc:"1.  \n2. "},
    {id: 24, reportDesc:"1.  \n2. "},
    {id: 25, reportDesc:"1. Seleccione Variable Independiente X=>Dias(Fecha o Numero)  \n2. Seleccione Y=>Casos Confirmados \n 3.No se selecciona filtros \n 4. Ingrese Dato a Predecir"},
]);

const [descReport, setdescReport] = useState([
  {id: 1, reportDesc:"La tendencia en infeccion de un Pais puede verse representado por un modelo Polinomial el cual, se grafico utilizando las herramientas de ScikitLearn, Donde podemos observa el modelo Polinomial asi como sus Coeficientes a Continuacion."},
  {id: 2, reportDesc:"La PREDICCION De infecciones de un Pais, se representa por un modelo Polinomial con el cual, se llego a determinar el valor representado, en el area de resultados,  se grafico utilizando las herramientas de ScikitLearn, Donde podemos observa el modelo Polinomial asi como sus Coeficientes a Continuacion."},
  {id: 2, reportDesc:"Seleccionando el Departamento a Filtrar se realiza una seleccion utilizando Pandas, Luego se obtiene la Regresion Lineal y Polinomial con la cual se obtiene la ecuacio con sus coeficientes que mas adelante mostraran los datos de la prediccion. "},
  {id: 3, reportDesc:"1.  \n2. "},
  {id: 4, reportDesc:"Seleccionando el PAIS a Filtrar se realiza una seleccion utilizando Pandas, Luego se obtiene la Regresion Lineal y Polinomial con la cual se obtiene la ecuacio con sus coeficientes que mas adelante mostraran los datos de la prediccion."},
  {id: 5, reportDesc:"Seleccionando el DEPARTAMENTO a Filtrar se realiza una seleccion utilizando Pandas, Luego se obtiene la Regresion Lineal y Polinomial con la cual se obtiene la ecuacio con sus coeficientes que mas adelante mostraran los datos de la prediccion."},
  {id: 6, reportDesc:"1.  \n2. "},
  {id: 7, reportDesc:"Al analizar el numero de Infectados por un Pais, se analizaron tanto #Dias como la cantidad de #Casos positivos. El cual fueron filtrados por #Pais, y aplicados con una regresion lineal y una funcion Polinomial, el cual por el comportamiento que representa puede mostrarse como una recta desde nuestro punto de vista, pero al acercarnos en sus puntos se tienen fluctuaciones ya que es una regresion polinomial"},
  {id: 8, reportDesc:"1. InDependiente X => Año  \n2. Dependiente Y=> Casos, \n3. Se selecciono el Pais"},
  {id: 9, reportDesc:"La tendencia de Vacunacion por Pais, se calculo tomando en cuenta las variables Independiente en X como #sucesionDias, y como Dependiente el numero de #vacunados, para lo cual se aplico un filtro por #Pais, Con lo cual con R2, podemos obesrvar lo cercano que es nuestro resultado a lo aceptable"},
  {id: 10, reportDesc:"1.  \n2. "},
  {id: 11, reportDesc:"1.  \n2. "},
  {id: 12, reportDesc:"1.  \n2. "},
  {id: 13, reportDesc:"1.  \n2. "},
  {id: 14, reportDesc:"1.  \n2. "},
  {id: 15, reportDesc:"Se realizo un filtro de #Departamento por #Pais con lo cual se tiene los datos necesarios para analizar, Luego se utilizo como variable Independiente X, #Dias_Progresion, y como variable Dependiente Y: #Casos Confirmados"},
  {id: 16, reportDesc:"1.  \n2. "},
  {id: 17, reportDesc:"1.  \n2. "},
  {id: 18, reportDesc:"1.  \n2. "},
  {id: 19, reportDesc:"Predicción de muertes en el último día del primer año de infecciones en un país, con lo cual se selecciono el dia, en el determinado pais para obtener dicho resultado en una regresion polinomial de grado 10"},
  {id: 20, reportDesc:"1.  \n2. "},
  {id: 21, reportDesc:"Se grafica la dependencia del numero de Muertes con la cantidad de casos en el mundo ya que poseeen una dependencia, donde X es el numero de Casos, y en Y son los numeros de Muertes en el Mundo"},
  {id: 22, reportDesc:"1.  \n2. "},
  {id: 23, reportDesc:"1.  \n2. "},
  {id: 24, reportDesc:"1.  \n2. "},
  {id: 25, reportDesc:"Se seleccionan el numero de Casos Confirmados por dia, asi como el dato a predecir para obtenerlo en el area de resultados "},
])

const [concReport, setconcReport] = useState([
  {id: 1, reportDesc:"La tendencia en infeccion de un Pais puede verse representado por un modelo Polinomial el cual,  Donde podemos observa el modelo Polinomial asi como sus Coeficientes."},
  {id: 2, reportDesc:"Se calculo la prediccion de Infectados para el dato indicado durante esta fase, utilizando el filtro de Paises, asi como los casos por dias o fecha seleccionado para los ejes, y el grado de confianza nos los da r2."},
  {id: 3, reportDesc:"1.  \n2. "},
  {id: 4, reportDesc:"Predicción de mortalidad por COVID en un Departamento,se obtuvo  la Regresion Lineal y Polinomial con la cual se obtiene la ecuacio con sus coeficientes que mas adelante mostraran los datos de la prediccion. Lo cual se puede corroborar con r2"},
  {id: 5, reportDesc:"Predicción de mortalidad por COVID en un Pais, se obtuvo la Regresion Lineal y Polinomial con la cual se obtiene la ecuacio con sus coeficientes que mas adelante mostraran los datos de la prediccion.Corroborado de que tan aceptable es con r2"},
  {id: 6, reportDesc:"1.  \n2. "},
  {id: 7, reportDesc:"Se analizaron tanto #Dias como la cantidad de #Casos positivos. El cual fueron filtrados por #Pais, y aplicados con una regresion lineal y una funcion Polinomial, el cual por el comportamiento que representa puede mostrarse como una recta desde nuestro punto de vista, pero al acercarnos en sus puntos se tienen fluctuaciones ya que es una regresion polinomial"},
  {id: 8, reportDesc:"Se determino la prediccion, de casos para el pais seleccionado utilizando la regresion polinomial, con lo cual podemos obtener los valores que se pudieron observar en resultados, mas r2 que nos indica de que tan cercano y acertado fue con grado 10 dicha prueba"},
  {id: 9, reportDesc:"Las variables Independiente en X como #sucesionDias, y como Dependiente el numero de #vacunados, para lo cual se aplico un filtro por #Pais, Con lo cual con R2, podemos obesrvar lo cercano que es nuestro resultado a lo aceptable"},
  {id: 10, reportDesc:"1.  \n2. "},
  {id: 11, reportDesc:"1.  \n2. "},
  {id: 12, reportDesc:"1.  \n2. "},
  {id: 13, reportDesc:"1.  \n2. "},
  {id: 14, reportDesc:"1.  \n2. "},
  {id: 15, reportDesc:"Se realizo un filtro de #Departamento por #Pais con lo cual se tiene los datos necesarios para analizar, Luego se utilizo como variable Independiente X, #Dias_Progresion, y como variable Dependiente Y: #Casos Confirmados"},
  {id: 16, reportDesc:"1.  \n2. "},
  {id: 17, reportDesc:"1.  \n2. "},
  {id: 18, reportDesc:"1.  \n2. "},
  {id: 19, reportDesc:"Predicciones de casos y muertes en todo el mundo, dando como resultado "},
  {id: 20, reportDesc:"1.  \n2. "},
  {id: 21, reportDesc:"Al comparar casos y muertes en una misma grafica obtenemos la prediccion de muertes al estar alcanzando determinada cantidad de casos, avalado por r2 que nos da la confianza de este caso"},
  {id: 22, reportDesc:"1.  \n2. "},
  {id: 23, reportDesc:"1.  \n2. "},
  {id: 24, reportDesc:"1.  \n2. "},
  {id: 25, reportDesc:"1.  \n2. "},
])

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 10,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  t1: {
    fontSize: 12,
    textAlign: 'jutify',
    marginHorizontal: 90,
    marginRight: 90,
    paddingBottom: 15,
    fontFamily: 'Times-Roman',
    
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 90,
    paddingBottom: 5,
    fontFamily: 'Times-Roman',
    
  },
  h1: {
    fontSize: 13,
    textAlign: 'center',
    paddingBottom: 16,
    fontFamily: 'Times-Roman',
    fontWeight: 'bolder'
  },
  h2: {
    fontSize: 12,
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 16,
    fontFamily: 'Times-Roman',
    fontWeight: 'bolder'
  },
  h3: {
    fontSize: 10,
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 16,
    fontFamily: 'Times-Roman',
    fontWeight: 'bolder'
  },

  subtitle: {
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    fontStyle: 'italic'
  },
  text: {
    // margin: 10,
    paddingBottom: 85,
    margin: 12,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  text2: {
    // margin: 10,
    paddingBottom: 55,
    margin: 12,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 100,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Times-Roman',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  },
  left: {
    width: '50%',//<- working alternative
    flexGrow: 0,
    flexShrink: 1,
  },

  right: {
    padding: 5,
     width: '50%', //<- working alternative
    flexShrink: 1,
    flexGrow: 2,
  },
});

  // DATOS RETORNADOS
  // const [imagenRep1, setimagenRep1] = useState("");
  const [imagenRep1, setimagenRep1] = useState({
    image64: "",
    rmse: 0,
    r2:0,
    coefL: [],
    pred: 0,
  });
  const [tableCoefs, settableCoefs] = useState("");


  // this.state = {
  //   title: "",
  //   text: ""
  // };
  let headers ="";
  let lines="";
  let delim ="";
  console.log(isDateheadX)

  // COLUMNAS ///
  // const optionCols = this.colHeaders.map(v => (
  //   <option >{v}</option>
  // )); 

  //// LOAD SELECT REPORTS ///
  const reps = reports.map((head)=>{
    // console.log(head);
    // const com = ""
    // if (head.completed == true)
    // {
    //   com = "bg-success"
    // }else{
    //   com = "bg-wrong"
    // }
    return (<option   value={head.id}>{`${head.id}. ${head.report}`}</option>)
  }); 




  /// CSV HEADERS ////

  function parseCSV(text) {
    // Obtenemos las lineas del texto\
    let text2 = text;
    settextCsv(text2);
    
    let lines = text.replace(/\r/g, '').split('\n');
    delim = CSV.detect(text);
    console.log("Delim: " + delim);
    // console.log(lines);

    headers = text2.slice(0,text2.indexOf('\n')).split(delim);
    headers = headers.map((head)=>{
      head = head.replace(/['"]+/g, '');
      // console.log(head);
      return head;
    });
    
    // console.log(headers);

    return lines.map(line => {
      // Por cada linea obtenemos los valores
      let values = line.split(delim);
      return values;
    });
  }

  function reverseMatrix(matrix){
    let output = [];
    // Por cada fila
    matrix.forEach((values, row) => {
      // Vemos los valores y su posicion
      values.forEach((value, col) => {
        // Si la posición aún no fue creada
        if (output[col] === undefined) output[col] = [];
        output[col][row] = value;
      });
    });
    return output;
  }


  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
    
    

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      // Cuando el archivo se terminó de cargar
      
      let lines = parseCSV(event.target.result);
      fillSelectFilters();
      // let output = reverseMatrix(lines);
      // console.log(lines);
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsBinaryString(file);
    

    // ARREGLO DE HEADER


    // console.log(reader);
	};

  function fillSelectFilters(){
    const colHeader = headers.map((head)=>{
      return (<option   value={head}>{head}</option>)
    });
    
    setColHeaders(colHeader);
  }


  function fillCoefs(){
    console.log("fill coefs")
    console.log(imagenRep1.coefL)
    let contador =-1;
    let data= JSON.parse(localStorage.getItem('currentData'))
    let coefl =JSON.parse(data.coefL)
    console.log(coefl)
    const ts = coefl.map((head)=>{

      

      if (contador == -1)
      {
        contador = contador + 1;
        return (<tr>
          <th scope="row">X<sup>{0}</sup>.</th>
          <td>{head}</td>
        </tr>)
      }
      contador = contador + 1;
      
      return (<tr>
        <th scope="row">X<sup>{contador}</sup>.</th>
        <td>{head}</td>
      </tr>)
      
    });
    settableCoefs(ts);
  }


  
	const handleSubmission = () => {
		const formData = new FormData();
    // console.log(repActual);
		formData.append('fileCsv', selectedFile);
    formData.append("repActual", repActual);
    formData.append("x", headX);
    formData.append("isDateX", isDateheadX);
    formData.append("y", headY);
    formData.append("headFilter", headFilter);
    formData.append("search", search);
    formData.append("predict", predict);
    formData.append("predictIsDate", predictIsDate);
    


		fetch(
			'http://localhost:5000/rep1',
			{
				method: 'POST',
				body: formData,
        // headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
      
			}
		)
			// .then((response) => {
      //   response.json()
      //   console.log(response)
      // })
			.then(async result => {
        const isJson = result.headers.get('content-type')?.includes('application/json');
        const data = isJson && await result.json();
        console.log(data);
        setimagenRep1({
          // image64: data.image64.replace(/['"]+/g, ''),
          image64: JSON.parse(data.image64),
          rmse: data.rmse,
          r2:data.r2,
          coefL: JSON.parse(data.coefL),
          pred: JSON.parse(data.pred),
        });
        setimageActual(JSON.parse(data.image64));
        localStorage.setItem('currentData', JSON.stringify(data))
        
        console.log(imagenRep1)
        fillCoefs();
				Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
			})
			.catch((error) => {
				Swal.fire({
          title: 'Error!',
          text: `Do you want to continue ${error}`,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
			});
	};

  function onDropX(e) {
      console.log("THE VAL", e.target.value);
    setheadX(e.target.value);
      //here you will see the current selected value of the select input
  }
  function onDropY(e) {
    console.log("THE VAL", e.target.value);
    setheadY(e.target.value);
  }

  function onDropReport(e) {

    setbandPrediccion(false);
    console.log("THE VAL");
    console.log(e.target.value);
   
    setrepActual(e.target.value);
    const result = reports.forEach((rep)=>{
      // console.log("value: ",  e.target.value, " rep.id:", rep.id);
      if (rep.id == e.target.value)
      {
        setrepActualTitle(rep.report);
      }
    });

    instr.forEach((rep)=>{
      // console.log("value: ",  e.target.value, " rep.id:", rep.id);
      if (rep.id == e.target.value)
      {
        console.log("INstr: " + rep.id)
        console.log(rep.reportDesc);
        setinstrRepActual(rep.reportDesc);
      }
    });

    descReport.forEach((rep)=>{
      // console.log("value: ",  e.target.value, " rep.id:", rep.id);
      if (rep.id == e.target.value)
      {
        setdescRepActual(rep.reportDesc);
      }
    });

    console.log(typeof(e.target.value));

    if (e.target.value=="1" || e.target.value=="7" || e.target.value=="9" || e.target.value=="15" )
    {
      setbandPrediccion(false);
      setbandPrediccion(false);
    }
    
    // if (repActual==1 || repActual==7 || repActual==9 || repActual==15 )
    // {
    //   setbandPrediccion(false);
    // }

    // Habilitando Prediccion
    // if (repActual == 2 || repActual == 2 || repActual == 4 || repActual == 5 || repActual == 8 || repActual == 19 || repActual == 21 || repActual == 25  )
    // {
    //   console.log("entre2")
    //   setbandPrediccion(true);
    // }
    if (e.target.value == 2 || e.target.value == 2 || e.target.value == 4 || e.target.value == 5   || e.target.value == 8 || e.target.value == 19 || e.target.value == 21 || e.target.value == 25  )
    {
      setbandPrediccion(true);
    }
    
    // console.log(result)
    
  }

  function getDatos(){
    let data= JSON.parse(localStorage.getItem('currentData'))
    let r2 =data.r2
    let rmse =data.rmse
    console.log(data.r2);
    return(<h2 className="display-2 text-white mb-0">{`ERROR: ${rmse} R2: ${r2}`}</h2>)
  }

  function getDatosPdf(){
    let data= JSON.parse(localStorage.getItem('currentData'))
    let r2 =data.r2
    let rmse =data.rmse
    console.log(data.r2);
    // return(<h2 className="display-2 text-white mb-0">{`ERROR: ${rmse} R2: ${r2}`}</h2>)
    return(<Text style={styles.h2}> 
      {`ERROR: ${rmse} R2: ${r2}`}
      {headY}
     </Text>)
  }
  function getDatosPdf(){
    let data= JSON.parse(localStorage.getItem('currentData'))
    let r2 =data.r2
    let rmse =data.rmse
    console.log(data.r2);
    // return(<h2 className="display-2 text-white mb-0">{`ERROR: ${rmse} R2: ${r2}`}</h2>)
    return(<Text style={styles.h3}> 
      {`ERROR: ${rmse} R2: ${r2}`}
      {headY}
     </Text>)
  }
  function getDatosCoefPdf(){
    let data= JSON.parse(localStorage.getItem('currentData'))
    let r2 =data.r2
    let rmse =data.rmse
    let contador = -1;
    // return(<h2 className="display-2 text-white mb-0">{`ERROR: ${rmse} R2: ${r2}`}</h2>)
    const ts = imagenRep1.coefL.map((head)=>{

      

      if (contador == -1)
      {
        contador = contador + 1;
        return (<Text style={styles.h3}> {head} X^0 </Text>)
      }
      contador = contador + 1;
      return (<Text style={styles.h3}> {head} X^{contador} </Text>)
      
      
    });
    return ts;
  }
  
  function onDropHeadFilter(e) {
    console.log("THE VAL", e.target.value);
    setheadFilter(e.target.value);
  }

  function onDropNameFilter(e) {
    console.log("THE VAL", e.target.value);
    setSearch(e.target.value);
  }

  const handleOnChangeDateHeadX = () => {
    setisDateheadX(!isDateheadX);
    // console.log("isDate: "+ isDateheadX)
  };
  const handleOnChangePredictIsDate = () => {
    setpredictIsDate(!predictIsDate);
    // console.log("isDate: "+ isDateheadX)
  };

  function genPdfData()
  {
    // const docPdf = (

    // )
  }

  

  return (
    <>
      {/* <Header /> */}
      <div className="header  pb-8 pt-5 pt-md-8">
        
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
          </div>
        </Row>
        <Row>
          
        </Row>
        {/* Dark table */}
        
        <Row >

        <div className="col">
          
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Carga CSV</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                  <h6 className="heading-small text-muted mb-4">
                    CSV Information
                  </h6>
                  <div className="pl-lg-4">

                    <div>
                      <Input  type="file" name="file" onChange={changeHandler} />
                      {isFilePicked ? (
                        <div>
                          <p>Filename: {selectedFile.name}</p>
                          <p>Filetype: {selectedFile.type}</p>
                          <p>Size in bytes: {selectedFile.size}</p>
                          <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <p>Select a file to show details</p>
                      )}
                     
                    </div>

                  </div>
                  <hr className="my-4" />

                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-X"
                  >
                    Report
                  </label><br></br>
                  <select class="custom-select   " onChange={onDropReport}  >
                    <option selected>Select your Column</option>
                      {reps }
                  </select>
                </FormGroup>
                <Row>
                  <Col className="col">
                    {/* <h1 className="display-2 text-white">Hello Jesse</h1> */}
                    <p className=" ">
                    <pre>
                      {instrRepActual}
                      </pre>
                    </p>
                  </Col>
                </Row>


                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Filter Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-X"
                          >
                            Header X
                          </label><br></br>
                          <select class="custom-select   " onChange={onDropX}  >
                            <option selected>Select your Column</option>
                              {colHeaders }
                          </select>
                          <div class="form-check mb-2">
                            <Input class="form-check-input" 
                              type="checkbox" id="autoSizingCheck" 
                              checked={isDateheadX}
                              onChange={handleOnChangeDateHeadX}
                            />
                            <label class="form-check-label" for="autoSizingCheck">
                              Is Date
                            </label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-Y"
                          >
                            Header Y
                          </label>
                          <select class="custom-select   " onChange={onDropY}  >
                            <option selected>Select your Column</option>
                              {colHeaders }
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Filter by:
                          </label>
                          <select class="custom-select   " onChange={onDropHeadFilter}  >
                            <option selected>Select your Column</option>
                              {colHeaders }
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Name to Filter
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nameFilter"
                            placeholder="Example: Guatemala"
                            type="text"
                            defaultValue=""
                            onChange={(event) => {/*search = event.target.value;*/ setSearch(event.target.value);console.log(search);}}
                            // required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        {bandPrediccion == true ? 
                          <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Predict
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-predict"
                            placeholder="500"
                            type="text"
                            defaultValue=""
                            onChange={(event) => {setPredict(event.target.value)}}
                            required
                          />
                          <div class="form-check mb-2">
                            <Input class="form-check-input" 
                              type="checkbox" id="autoSizingCheck" 
                              checked={predictIsDate}
                              onChange={handleOnChangePredictIsDate}
                            />
                            <label class="form-check-label" for="autoSizingCheck">
                              Is Date
                            </label>
                          </div>
                        </FormGroup>
                        :
                        <FormGroup></FormGroup>
                        }
                        
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Data name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div>
                        <Button type="button" color="primary" onClick={handleSubmission}>Submit</Button>
                      </div>
                  
                  {/* Address */}
                  
                  
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Data of CSV</h6>
                  <FormGroup>
                    
                    {/* <Input
                      id="exampleText"
                      name="text"
                      type="textarea"
                      value = {textCsv}
                      rows="10"
                    /> */}
                    <textarea class="form-control" value = {textCsv} id="exampleFormControlTextarea1" rows="10"></textarea>
                  </FormGroup>
                  
                </Form>
              </CardBody>
            </Card>
            </div>
        </Row>

        <Row className="mt-5">
        <div className="col">
          {
            repActual!= "" ? <Card className="bg-default shadow">
            <CardHeader className="bg-transparent border-0">
              <h3 className="text-white mb-0">Report Results</h3>
              <h2 className="display-2 text-white mb-0">{`${repActual}.${repActualTitle}`}</h2>
              <p className="text-white ">
                      {descRepActual}
                    </p>
              {/* <p className="text-white ">
                      {getDatos}
                    </p>
                  <h2 className="display-2 text-white mb-0">{`ERROR.${getDatos}`}</h2> */}
                  {getDatos()}
            </CardHeader>
            <CardBody>
            

              <Row className="mt-5">
                <Col className="mb-5 mb-xl-0" xl="8">
                  <CardImg
                    alt="Card image cap"
                    src={imagenRep1.image64}
                    top
                    width="100%"
                  />
                </Col>
                <Col xl="4">
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <div className="col">
                          <h3 className="mb-0">Coeficientes</h3>
                        </div>
                        <div className="col text-right">
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            See all
                          </Button>
                        </div>
                      </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Feature</th>
                          <th scope="col">Coef</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <th scope="row">Facebook</th>
                          <td>1,480</td>
                        </tr> */}
                        
                        {tableCoefs}
                        
                        
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
              <br></br>
              <Row>
                {bandPrediccion == true ?
                  <Col class="col">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            PREDICCION
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {imagenRep1.pred}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 
                        </span>{" "}
                        <span className="text-nowrap">{headY}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                :
                  <Col></Col>
                }
              </Row>

            </CardBody>
          </Card>
          :
          <div></div>
          }
          
        </div>
        </Row>

        <Row className="mt-5">
        <div className="col">
          {
            imageActual.length > 0? <Card className="bg-default shadow">
            <CardHeader className="bg-transparent border-0">
              <h1 className="text-white mb-0">Report PDF Results</h1>
              {/* <h2 className="display-2 text-white mb-0">{`${repActual}.${repActualTitle}`}</h2>
              <p className="text-white ">
                      {descRepActual}
                    </p> */}
              {/* <p className="text-white ">
                      {getDatos}
                    </p>
                  <h2 className="display-2 text-white mb-0">{`ERROR.${getDatos}`}</h2> */}
                  {/* {getDatos()} */}
            </CardHeader>
            <CardBody>
            

              {/* <Row className="mt-5"> */}
              {/* <div className="col"> */}
              {/* <Row className="mt-5"> */}
                <PDFViewer className="col"  height='1300'
                  showToolbar="true" >
                  <Document>
                    <Page style={styles.body}>
                        <Text style={styles.header} fixed>
                          ~ OLC2 - PROYECTO 2 ~
                        </Text>
                        <Text style={styles.title}>{`${repActual}.${repActualTitle}`}</Text>
                        <Text style={styles.author}>201504530 - Erick Benjamin Lopez Xajil</Text>
                        <Text style={styles.subtitle}>USAC Facultad Ingenieria - OLC2</Text>
                        <Text style={styles.t1}  >
                          Python es conocido como el lenguaje que logra dominar todas las estadísticas,
                          relacionadas con la minería de datos e incluso el aprendizaje automático,
                          es software libre, por lo que muchas personas han podido usarlo para desarrollar 
                          sus soluciones dando un lugar que ha Bibliotecas muy interesantes donde se pueden 
                          encontrar casi todas las técnicas de machine learning que existen actualmente, por 
                          supuesto, tiene su parte negativa, y es que derivada del hecho de que muchas personas 
                          han aportado, tiene su sintaxis específica para cada caso, lo que hace aprendizaje 
                          un poco complejo.</Text>
                          <View style="container">
                            <View style={[styles.row, { height: 600 }]}>
                              <View style={styles.left}>
                                <Text style={styles.h1}><b>I. Objetivos</b></Text>
                                <Text style={styles.h2}><b>A. General</b></Text>
                                <Text style={styles.text}  >
                                Aplicar Data Science donde los  conceptos de estadística, matemática y programación,
                                 entran en vigor con un conjunto de herramientas tecnológicas (ScikitLearn), para extraer información
                                   de los casos de COVID19 que ha afectado al mundo, utilizando los metodos de regresion polinomial y 
                                   lineal para determinar las Tendencias y Predicciones de los Casos en las diferentes regiones
                                </Text>
                                <br></br>
                                <Text style={styles.h1}><b>II. Marco Teorico</b></Text>
                                <Text style={styles.h2}><b>Regresion Lineal</b></Text>
                                <Text style={styles.text2}  >
                                El análisis de la regresión lineal se utiliza para predecir el valor de una variable según el valor de otra. La variable que desea predecir se denomina variable dependiente. La variable que está utilizando para predecir el valor de la otra variable se denomina variable independiente.
                                </Text>
                                <Text style={styles.h2}> 
                                Y = α +bX
                                </Text>
                                <Text style={styles.h2}><b>Regresion Polinomial</b></Text>
                                <Text style={styles.text}> 
                                  La Regresión Polinomial es un caso especial de la Regresión Lineal, extiende el modelo lineal al agregar predictores adicionales, obtenidos al elevar cada uno de los predictores originales a una potencia. Por ejemplo, una regresión cúbica utiliza tres variables, como predictores. Este enfoque proporciona una forma sencilla de proporcionar un ajuste no lineal a los datos.
                                  
                                  El método estándar para extender la Regresión Lineal a una relación no lineal entre las variables dependientes e independientes, ha sido reemplazar el modelo lineal con una función polinomial.
                                </Text>
                                <Text style={styles.h2}> 
                                  y = Bo + B1x + B2x^2 + Bz^3 + . ..+ Bn^n
                                </Text>

                              </View>
                              <View style={styles.right}>
                                <Text style={styles.h1}>III. Diseño Experimental</Text>
                                <Text style={styles.text2}> 
                                  {descRepActual}
                                </Text>
                                <Text style={styles.h2}> 
                                - Variable Independiente X:
                                 {headX}
                                </Text>
                                <Text style={styles.h2}> 
                                 - Variable Dependiente Y:
                                 {headY}
                                </Text>

                                <Text style={styles.h1}>IV. Resultados</Text>
                                
                                {getDatosPdf()}
                                <Text style={styles.h2}> 
                                Coeficientes
                                </Text>
                                {getDatosCoefPdf()}
                                <Text style={styles.text}> 
                                  
                                </Text>
                              </View>
                            </View>
                            
                          </View>
                          
                        
                      </Page>
                      <Page style={styles.body}>
                      <Text style={styles.h1}> Anexos: Grafica de Regresion</Text>
                              <Image
                                src={imageActual}
                                fixed={true}
                              ></Image>
                      </Page>
                  </Document>
                </PDFViewer>
                {/* </Row> */}
              {/* </div> */}
              {/* </Row>  */}
              

            </CardBody>
          </Card>
          :
          <div></div>
          }
          
        </div>
        </Row>
        
      </Container>
    </>
  );
};

export default Tables;
