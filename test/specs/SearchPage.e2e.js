const SearchPage = require('../pageobjects/search.page');

let esp = {
    Fisica: {
        text: "phisical",
        position: 0
    },
    Lenguaje: {
        text: "language",
        position: 1
    },
    Ocupacional: {
        text: "ocupational",
        position: 2
    }
};

let text_to_find = "Maria";

let view = 
{
    Hide: 1,
    Show: 2   
}

let searchInfo = {
    attribute: "class",
    valid: "col-lg-5",
    invalid: "d-none"
}

describe('Search Page', () => {
    
    beforeEach(async ()=> {
        await SearchPage.open();
    });

    it('Should be able to change speciality', async () => {
        //obtiene todos los valores presentes en la barra de busqueda
        const btn_esp = await SearchPage.getEspecialidadButton;

        //cambia el filtro de busqueda a fisica (hardcoded values)
        await btn_esp[esp.Fisica.position].click();
        await expect(browser).toHaveUrlContaining(await SearchPage.getSpecialitySearchURL(esp.Fisica.text));

        //cambia el filtro de busqueda a lenguaje (hardcoded values)
        await btn_esp[esp.Lenguaje.position].click();
        await expect(browser).toHaveUrlContaining(await SearchPage.getSpecialitySearchURL(esp.Lenguaje.text));

        //cambia el filtro de busqueda a ocupacional (hardcoded values)
        await btn_esp[esp.Ocupacional.position].click();
        await expect(browser).toHaveUrlContaining(await SearchPage.getSpecialitySearchURL(esp.Ocupacional.text));

    });

    
    it('Should be able to search and change the website', async () => {
        //llena la barra de busqueda y la realiza
        await SearchPage.fillSearchBar(text_to_find);
        await SearchPage.performSearch();

        //verifica que el url actual contenga los datos de busqueda
        await expect(browser).toHaveUrlContaining(SearchPage.getSearchTextURL(text_to_find));
        //verifica que el primer elemento de la pagina contenga el text buscado
        await expect(await SearchPage.compareTextElement(text_to_find)).toBeDisplayed();

    });

    it('Should be able to hide and show the map', async () => {
        //obtiene el mapa
        const fld_map = await SearchPage.getMapField;

        //oculta el mapa
        await (await SearchPage.getHideAndShowButtons(view.Hide)).click();
        //verifica que el mapa esta oculto
        await expect(fld_map).toHaveAttributeContaining(searchInfo.attribute, searchInfo.invalid);

        //muestra el mapa
        await (await SearchPage.getHideAndShowButtons(view.Show)).click();
        //verifica que el mapa es visible
        await expect(fld_map).toHaveAttributeContaining(searchInfo.attribute, searchInfo.valid);


    });
    

});


