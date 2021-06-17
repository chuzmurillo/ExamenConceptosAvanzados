class SearchPage{

    get _getFirstItemText()
    {
        return $(`.strip_list h3`);
    }
    
    get title()
    {
        return $(`//*[contains(text(),"resultados")]`);
    }

    get getFirstItemName()
    {
        return $(`.strip_list h3`);
    }

    get getEspecialidadButton()
    {
        return $$(`.switch-field [type='button']`)
    }

    get getSearchField()
    {
        return $(`input[type='search']`);
    }

    get getSearchButton()
    {
        return $(`input[type='submit'][value='Buscar']`);
    }

    get getMapField()
    {
        return $(`#sidebar`);
    }

    //code copied from "https://desarrolloweb.com/faq/la-mejor-manera-de-eliminar-tildes-o-acentos-en-javascript"
    removeAccents(str){
        return str.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    getSpecificTitle(text)
    {
        return ("search?sp=all&q=" + text);
    }

    getSearchTextURL(text)
    {
        return ("search?q=" + text);
    }

    getSpecialitySearchURL(text)
    {
        return ("search?sp="+ text);
    }
    
    getHideAndShowButtons(position)
    {
        return $(`.layout_view a:nth-child(${position})`);
    }

    async ChangeMapStatus(option)
    {
        const btn_status = await this.getHideAndShowButtons(option);
        btn_status.click();
    }


    async fillSearchBar(text)
    {
        await (await this.getSearchField).setValue(text);
    }

    async performSearch()
    {
        const btn_buscar = await this.getSearchButton;
        await btn_buscar.waitUntil(async () => {
            return await btn_buscar.isClickable()
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        });
        btn_buscar.click();
    }

    async compareTextElement(text)
    {
        const element = await this._getFirstItemText;
        if(this.removeAccents(await element.getText()).includes(text))
            return element;
        else
            return null;
    }

    
    async open () {
        return await browser.url('/#/search');
    }

}

module.exports = new SearchPage();
