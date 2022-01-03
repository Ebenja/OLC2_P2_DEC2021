
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
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
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import mammoth from "mammoth";
                                   
                          
// core components
// import Header from "components/Headers/Header.js";

const Tables = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [colHeaders, setColHeaders] = useState([]);
  const [colRepsOptions, setRepsOptions] = useState([]);
  const [textCsv, settextCsv] = useState("");
  // Reportes
  const [repActual, setrepActual] = useState("");
  const [repActualTitle, setrepActualTitle] = useState("");
  const [descRepActual, setdescRepActual] = useState("");
  const [instrRepActual, setinstrRepActual] = useState("");

  const [headX, setheadX] = useState("");
  const [isDateheadX, setisDateheadX] = useState(false);
  const [headY, setheadY] = useState("");
  const [headFilter, setheadFilter] = useState("");
  const [search, setSearch] = useState("");
  const [predict, setPredict] = useState("");
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
    {id: 2, reportDesc:"1.  \n2. "},
    {id: 2, reportDesc:"1.  \n2. "},
    {id: 3, reportDesc:"1.  \n2. "},
    {id: 4, reportDesc:"1.  \n2. "},
    {id: 5, reportDesc:"1.  \n2. "},
    {id: 6, reportDesc:"1.  \n2. "},
    {id: 7, reportDesc:"1. Seleccione  Variable Independiente X Fechha, y si es de tipo Date Seleccione en CheckBox\n2.Seleccione El NO CASOS como variable Dependiente Y\n3.Seleccione el Filtro Pais, y el Pais que va a Filtrar"},
    {id: 8, reportDesc:"1.  \n2. "},
    {id: 9, reportDesc:"1. Seleccione  Variable Independiente X (Ya sea Fecha, o una Susesion de numero), y si es de tipo Date Seleccione en CheckBox\n2.Seleccione El #NO VACUNAS como variable Dependiente Y\n3.Seleccione el Filtro Pais, y el Pais que va a Filtrar"},
    {id: 10, reportDesc:"1.  \n2. "},
    {id: 11, reportDesc:"1.  \n2. "},
    {id: 12, reportDesc:"1.  \n2. "},
    {id: 13, reportDesc:"1.  \n2. "},
    {id: 14, reportDesc:"1.  \n2. "},
    {id: 15, reportDesc:"1. Seleccione  Variable Independiente X (Ya sea Fecha, o una Susesion de numero), y si es de tipo Date Seleccione en CheckBox\n2.Seleccione El #CASOS CONFIRMADOS como variable Dependiente Y\n3.Seleccione el Filtro DEPARTAMENTO, y el Departamento que va a Filtrar"},
    {id: 16, reportDesc:"1.  \n2. "},
    {id: 17, reportDesc:"1.  \n2. "},
    {id: 18, reportDesc:"1.  \n2. "},
    {id: 19, reportDesc:"1.  \n2. "},
    {id: 20, reportDesc:"1.  \n2. "},
    {id: 21, reportDesc:"1.  \n2. "},
    {id: 22, reportDesc:"1.  \n2. "},
    {id: 23, reportDesc:"1.  \n2. "},
    {id: 24, reportDesc:"1.  \n2. "},
    {id: 25, reportDesc:"1.  \n2. "},
]);

const [descReport, setdescReport] = useState([
  {id: 1, reportDesc:"La tendencia en infeccion de un Pais puede verse representado por un modelo Polinomial el cual, se grafico utilizando las herramientas de ScikitLearn, Donde podemos observa el modelo Polinomial asi como sus Coeficientes a Continuacion."},
  {id: 2, reportDesc:""},
  {id: 2, reportDesc:"1.  \n2. "},
  {id: 3, reportDesc:"1.  \n2. "},
  {id: 4, reportDesc:"1.  \n2. "},
  {id: 5, reportDesc:"1.  \n2. "},
  {id: 6, reportDesc:"1.  \n2. "},
  {id: 7, reportDesc:"Al analizar el numero de Infectados por un Pais, se analizaron tanto #Dias como la cantidad de #Casos positivos. El cual fueron filtrados por #Pais, y aplicados con una regresion lineal y una funcion Polinomial, el cual por el comportamiento que representa puede mostrarse como una recta desde nuestro punto de vista, pero al acercarnos en sus puntos se tienen fluctuaciones ya que es una regresion polinomial"},
  {id: 8, reportDesc:"1.  \n2. "},
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
  {id: 19, reportDesc:"1.  \n2. "},
  {id: 20, reportDesc:"1.  \n2. "},
  {id: 21, reportDesc:"1.  \n2. "},
  {id: 22, reportDesc:"1.  \n2. "},
  {id: 23, reportDesc:"1.  \n2. "},
  {id: 24, reportDesc:"1.  \n2. "},
  {id: 25, reportDesc:"1.  \n2. "},
])

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 90,
    paddingBottom: 5,
    fontFamily: 'Times-Roman'
  },

  subtitle: {
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
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
    coefL: []
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
          image64: data.image64.replace(/['"]+/g, ''),
          // image64: data.image64,
          rmse: data.rmse,
          r2:data.r2,
          coefL: JSON.parse(data.coefL)
        });

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

    
    // console.log(result)
    
  }

  function getDatos(){
    let data= JSON.parse(localStorage.getItem('currentData'))
    let r2 =data.r2
    let rmse =data.rmse
    console.log(data.r2);
    return(<h2 className="display-2 text-white mb-0">{`ERROR: ${rmse} R2: ${r2}`}</h2>)
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

  function genPdf()
  {
    const docPdf = (<Document>

    </Document>)
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
                            value = {predict}
                            
                            onChange={(event) => predict = event.target.value}
                            required
                          />
                        </FormGroup>
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
            repActual!= "" ? <Card className="bg-default shadow">
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
                <PDFViewer className="col"  height='700'
                  showToolbar="true" >
                  <Document>
                    <Page style={styles.body}>
                        <Text style={styles.header} fixed>
                          ~ OLC2 - PROYECTO 2 ~
                        </Text>
                        <Text style={styles.title}>{`${repActual}.${repActualTitle}`}</Text>
                        <Text style={styles.author}>201504530 - Erick Benjamin Lopez Xajil</Text>
                        <Text style={styles.subtitle}>USAC Facultad Ingenieria - OLC2</Text>
                        <Text style={styles.author}  >Python es conocido como el lenguaje que logra dominar todas las estadísticas,
                         relacionadas con la minería de datos e incluso el aprendizaje automático,
                          es software libre, por lo que muchas personas han podido usarlo para desarrollar 
                          sus soluciones dando un lugar que ha Bibliotecas muy interesantes donde se pueden 
                          encontrar casi todas las técnicas de machine learning que existen actualmente, por 
                          supuesto, tiene su parte negativa, y es que derivada del hecho de que muchas personas 
                          han aportado, tiene su sintaxis específica para cada caso, lo que hace aprendizaje 
                          un poco complejo.</Text>
                          <View style="container">
                            <View style={[styles.row, { height: 700 }]}>
                              <View style={styles.left}>
                                <Text style={styles.title}>Buenasss</Text>

                              </View>
                              <View style={styles.right}>
                                <Text style={styles.title}>Buenasssssssssssssssss</Text>
                              </View>
                            </View>
                          
                          </View>
                        
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
