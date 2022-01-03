export const services = {
    setCurrentData,
    getCurrentData,
    removeCurrentData,
    instrucciones,
    descReport
}

const instrucciones = [
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
]

const descReport = [
    {id: 1, reportDesc:"1. Seleccione un Pais, como Variable Independiente X \n2.Seleccione El NO CASOS como variable Dependiente Y"},
    {id: 2, reportDesc:"1.  \n2. "},
    {id: 2, reportDesc:"1.  \n2. "},
    {id: 3, reportDesc:"1.  \n2. "},
    {id: 4, reportDesc:"1.  \n2. "},
    {id: 5, reportDesc:"1.  \n2. "},
    {id: 6, reportDesc:"1.  \n2. "},
    {id: 7, reportDesc:"1.  \n2. "},
    {id: 8, reportDesc:"1.  \n2. "},
    {id: 9, reportDesc:"1.  \n2. "},
    {id: 10, reportDesc:"1.  \n2. "},
    {id: 11, reportDesc:"1.  \n2. "},
    {id: 12, reportDesc:"1.  \n2. "},
    {id: 13, reportDesc:"1.  \n2. "},
    {id: 14, reportDesc:"1.  \n2. "},
    {id: 15, reportDesc:"1.  \n2. "},
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
]

const resp = [
    {id: 1, reportDesc:"1. Seleccione un Pais, como Variable Independiente X \n2.Seleccione El NO CASOS como variable Dependiente Y"},
    {id: 2, reportDesc:"1.  \n2. "},
    {id: 2, reportDesc:"1.  \n2. "},
    {id: 3, reportDesc:"1.  \n2. "},
    {id: 4, reportDesc:"1.  \n2. "},
    {id: 5, reportDesc:"1.  \n2. "},
    {id: 6, reportDesc:"1.  \n2. "},
    {id: 7, reportDesc:"1.  \n2. "},
    {id: 8, reportDesc:"1.  \n2. "},
    {id: 9, reportDesc:"1.  \n2. "},
    {id: 10, reportDesc:"1.  \n2. "},
    {id: 11, reportDesc:"1.  \n2. "},
    {id: 12, reportDesc:"1.  \n2. "},
    {id: 13, reportDesc:"1.  \n2. "},
    {id: 14, reportDesc:"1.  \n2. "},
    {id: 15, reportDesc:"1.  \n2. "},
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
]

const setCurrentData = (session) => {
    localStorage.setItem('currentData', JSON.stringify(session))

    console.log(`set current session`)
    // console.log(getCurrentData());
}

const getCurrentData = () => {
    let temp = localStorage.getItem('currentData')
    if (temp == null) {
        temp = "";
    }
    const currentSession = JSON.parse(temp);
    return currentSession;

}

const removeCurrentData = () => {
    localStorage.removeItem('currentData');
    // currentSession = null;
}

