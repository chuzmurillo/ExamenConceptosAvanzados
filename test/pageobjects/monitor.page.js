class MonitorPage{
    
    get _getServiceLink()
    {
        return(`https://javito-prod.herokuapp.com/v1/`);
    }

    get getFirstProfileLink()
    {
        return $(`.btn_listing`);
    }

    async navigateToFirstProfile()
    {
        const btn_profile = await this.getFirstProfileLink;
        btn_profile.click();
    }

    async getExpectedURL(attribute)
    {
        const info = await (await this.getFirstProfileLink).getAttribute(attribute); 
        return this._getServiceLink + info.split('/').slice(-2).join('/');
    }

    async startIntercept()
    {
        return await browser.setupInterceptor();
    }

    async establishRequests(request)
    {
        return await browser.expectRequest(request.method, request.url, request.statusCode);
    }

    async getRequests()
    {
        //pause is here to give the intercept a chance to gather all the information from the website
        await browser.pause(1000);
        return await browser.getRequests();
    }

    async evaluateRequests()
    {
        return await browser.assertExpectedRequestsOnly();
    }
    
    async open () {
        return await browser.url('/#/search');
    }

}

module.exports = new MonitorPage();
