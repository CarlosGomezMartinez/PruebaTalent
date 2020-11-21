const puppeteer = require('puppeteer')

async function run(){
    const browser = await puppeteer.launch(  );
    const page = await browser.newPage();
    await page.goto('https://www.arrivia.com/careers/job-openings/');

    const links = await page.evaluate(() => {
        const $elements = document.querySelectorAll('.row.job-search-result');
        const links =[];
        $elements.forEach((element) => {
            links.push({
                titulo: element.querySelector('.col-xs-12.col-sm-8 h3').textContent,
                locacion: element.querySelector('.col-xs-12.col-sm-8 p').textContent,
                url: element.querySelector('.btn.btn-lg.btn-primary.btn-job-apply').href
            }) 
        })
        return {elements: links};
    })
    console.log(links);
    await browser.close();
}
run();