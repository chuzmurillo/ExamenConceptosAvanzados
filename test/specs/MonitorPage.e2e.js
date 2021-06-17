const monitorPage = require('../pageobjects/monitor.page');
const MonitorPage = require('../pageobjects/monitor.page');

let attribute_to_search = "href";

//condicion a testear
let request = {
    method: 'GET',
    url: '',
    statusCode: 200
}

describe('Monitor Page', () => {
    
    before(async ()=> {
        await MonitorPage.open();
    });

    beforeEach("Establish the intercept requests for each 'it' available",async ()=> {
        await MonitorPage.startIntercept();
    });
    
    it('Should be able to get the correct service', async () => {
        //Consigue el url necesario para el request
        request.url = await MonitorPage.getExpectedURL(attribute_to_search);

        //establece las condiciones necesarias para evaluar el request
        await MonitorPage.establishRequests(request);

        //Navega hacia el primer perfil disponible
        await MonitorPage.navigateToFirstProfile();
        
        //Obtiene todos los requests generados despues de navegar al perfil deseado
        await MonitorPage.getRequests();

        //verifica las condiciones del request previamente establecidas 
        await MonitorPage.evaluateRequests();
    });

});