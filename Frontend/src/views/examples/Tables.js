
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
// import mammoth from "mammoth";
                                   
                          
// core components
// import Header from "components/Headers/Header.js";

const Tables = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [colHeaders, setColHeaders] = useState([]);
  const [colRepsOptions, setRepsOptions] = useState([]);
  const [textCsv, settextCsv] = useState("");
  const [repActual, setrepActual] = useState("");
  const [headX, setheadX] = useState("");
  const [isDateheadX, setisDateheadX] = useState(false);
  const [headY, setheadY] = useState("");
  const [headFilter, setheadFilter] = useState("");
  const [search, setSearch] = useState("");
  const [predict, setPredict] = useState("");
  const [reports, setReports] = useState([
    { id: 1, report: "Tendencia de la infección por Covid-19 en un País."},
    { id: 2, report: "Predicción de Infectados en un País."},
    { id: 3, report: "Indice de Progresión de la pandemia."},
    { id: 4, report: "Predicción de mortalidad por COVID en un Departamento."},
    { id: 5, report: "Predicción de mortalidad por COVID en un País."},
    { id: 6, report: "Análisis del número de muertes por coronavirus en un País."},
    { id: 7, report: "Tendencia del número de infectados por día de un País."},
    { id: 8, report: "Predicción de casos de un país para un año."},
    { id: 9, report: "Tendencia de la vacunación de en un País."},
    { id: 10, report: "Ánalisis Comparativo de Vacunaciópn entre 2 paises."},
    { id: 11, report: "Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo"},
    { id: 12, report: "Ánalisis Comparativo entres 2 o más paises o continentes."},
    { id: 13, report: "Muertes promedio por casos confirmados y edad de covid 19 en un País."},
    { id: 14, report: "Muertes según regiones de un país - Covid 19."},
    { id: 15, report: "Tendencia de casos confirmados de Coronavirus en un departamento de un País."},
    { id: 16, report: "Porcentaje de muertes frente al total de casos en un país, región o continente."},
    { id: 17, report: "Tasa de comportamiento de casos activos en relación al número de muertes en un continente."},
    { id: 18, report: "Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País."},
    { id: 19, report: "Predicción de muertes en el último día del primer año de infecciones en un país."},
    { id: 20, report: "Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19"},
    { id: 21, report: "Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor"},
    { id: 22, report: "Tasa de mortalidad por coronavirus (COVID-19) en un país."},
    { id: 23, report: "Factores de muerte por COVID-19 en un país."},
    { id: 24, report: "Comparación entre el número de casos detectados y el número de pruebas de un país."},
    { id: 25, report: "Predicción de casos confirmados por día"}
  ]);



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
      console.log(lines);
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsBinaryString(file);
    

    // ARREGLO DE HEADER


    // console.log(reader);
	};

  function fillSelectFilters(){
    console.log("entre");
    const colHeader = headers.map((head)=>{
      // console.log(head);
      return (<option   value={head}>{head}</option>)
    });
    
    setColHeaders(colHeader);
  }





  
	const handleSubmission = () => {
		const formData = new FormData();

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
			}
		)
			.then((response) => response.json())
			.then((result) => {
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
    console.log("THE VAL", e.target.value);
    setrepActual(e.target.value);
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
                  <hr className="my-4" />
                  {/* Address */}
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
                    <div>
                      <Button type="button" color="primary" onClick={handleSubmission}>Submit</Button>
                    </div>
                  </div>



                  
                  </div>
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
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Card tables</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Users</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("../../assets/img/theme/bootstrap.jpg")
                                .default
                            }
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Argon Design System
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$2,500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip731399078"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-1-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip731399078"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip491083084"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-2-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip491083084"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip528540780"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-3-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip528540780"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip237898869"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-4-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip237898869"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-warning"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("../../assets/img/theme/angular.jpg")
                                .default
                            }
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$1,800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip188614932"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-1-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip188614932"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip66535734"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-2-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip66535734">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip427561578"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-3-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip427561578"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip904098289"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-4-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip904098289"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("../../assets/img/theme/sketch.jpg")
                                .default
                            }
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">Black Dashboard</span>
                        </Media>
                      </Media>
                    </th>
                    <td>$3,150 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        delayed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip707904950"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-1-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip707904950"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip353988222"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-2-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip353988222"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip467171202"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-3-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip467171202"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip362118155"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-4-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip362118155"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">72%</span>
                        <div>
                          <Progress
                            max="100"
                            value="72"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("../../assets/img/theme/react.jpg")
                                .default
                            }
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            React Material Dashboard
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$4,400 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        on schedule
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip226319315"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-1-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip226319315"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip711961370"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-2-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip711961370"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip216246707"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-3-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip216246707"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip638048561"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-4-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip638048561"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">90%</span>
                        <div>
                          <Progress
                            max="100"
                            value="90"
                            barClassName="bg-info"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              require("../../assets/img/theme/vue.jpg").default
                            }
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Vue Paper UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$2,200 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip781594051"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-1-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip781594051"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip840372212"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-2-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip840372212"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip497647175"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-3-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip497647175"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip951447946"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-4-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip951447946"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <Progress
                            max="100"
                            value="100"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
