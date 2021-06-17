class HomePage{   

    get title () { return $('//*[text()="¿Buscas un Terapeuta?"]') }

    get getBuscarButton()
    {
        return $('.btn_search');
    }

    get getSearchField()
    {
        return $(`[id='search-input']`);
    }

    get getSpeciality()
    {
        return $(`#custom-search-input li label`);
    }
    
    getTagButton(field)
    {
        return $(`label[for='${field}']`);
    }

    async fillSearchBar(text)
    {
        await (await this.getSearchField).setValue(text);
    }

    async performSearch()
    {
        const btn_buscar = await this.getBuscarButton;
        await btn_buscar.waitUntil(async () => {
            return await btn_buscar.isClickable()
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        });
        btn_buscar.click();
    }

    async open () {
        return await browser.url('/');
    }

}

module.exports = new HomePage();
