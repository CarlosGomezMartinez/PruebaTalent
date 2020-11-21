const puppeteer = require('puppeteer')

async function run(){
    const browser = await puppeteer.launch(  );
    const page = await browser.newPage();
    await page.goto('https://www.arrivia.com/careers/job-openings/');

    const array = await page.evaluate(() => {
        const $empleos = document.querySelectorAll('.row.job-search-result');
        const array =[];
        $empleos.forEach((empleo) => {
            array.push({
                titulo: empleo.querySelector('.col-xs-12.col-sm-8 h3').textContent,
                locacion: empleo.querySelector('.col-xs-12.col-sm-8 p').textContent,
                url: empleo.querySelector('.btn.btn-lg.btn-primary.btn-job-apply').href
            }) 
        })
        return {empleos: array};
    })
    console.log(array);
    await browser.close();
}
run();