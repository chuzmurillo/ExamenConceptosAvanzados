const HomePage = require('../pageobjects/home.page');
const SearchPage = require('../pageobjects/search.page');

let tag = {
    fisica: "phisical",
    lenguaje: "language",
    ocupacional: "ocupational"
};

let pregunta = "¿Buscas a alguien o algo en específico?";
let attribute = "placeholder";
let text_to_find = "Maria";

describe('Home Page', () => {
    
    before(async ()=> {
        await HomePage.open();
    });

    beforeEach(async ()=> {
        await browser.refresh();
    });
    

    it('Should be able to stay in the home page', async () => {
        //encuentra y hace click en el boton
        await (await HomePage.getBuscarButton).click();

        //verificar que url actual no ha cambiado de la configuarion incial
        await expect(await HomePage.title).toBeDisplayed();
    });

    it('Should be able to change placeholder when selecting the first speciality', async () => {
        //da click en el boton fisica
        await (await HomePage.getSpeciality).click();

        //verifica que el placeholder contiene la pregunta
        await expect(await HomePage.getSearchField).toHaveAttributeContaining(attribute, pregunta);
    });

    it('Should be able to change placeholder when selecting Fisica', async () => {
        //da click en el boton fisica
        await (await HomePage.getTagButton(tag.fisica)).click();

        //verifica que el placeholder contiene la pregunta
        await expect(await HomePage.getSearchField).toHaveAttributeContaining(attribute, pregunta);
    });

    it('Should be able to change placeholder when selecting Lenguaje', async () => {
        //da click en el boton lenguaje
        await (await HomePage.getTagButton(tag.lenguaje)).click();

        //verifica que el placeholder contiene la pregunta
        await expect(await HomePage.getSearchField).toHaveAttributeContaining(attribute, pregunta);
    });

    it('Should be able to change placeholder when selecting Ocupacional', async () => {
        //da click en el boton ocupacional
        await (await HomePage.getTagButton(tag.ocupacional)).click();

        //verifica que el placeholder contiene la pregunta
        await expect(await HomePage.getSearchField).toHaveAttributeContaining(attribute, pregunta);
    });
    

    it('Should be able to search and change the url', async () => {
        //llena la barra de busqueda y la realiza
        await HomePage.fillSearchBar(text_to_find);
        await HomePage.performSearch();

        //verifica que el url actual contenga los datos de busqueda
        await expect(browser).toHaveUrlContaining(SearchPage.getSpecificTitle(text_to_find));
        //verifica que el primer elemento de la pagina contenga el text buscado
        await expect(await SearchPage.compareTextElement(text_to_find)).toBeDisplayed();

    });

});


