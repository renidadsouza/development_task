const express = require('express')
const fs = require("fs-extra");
const DB_data = require('./data');
const app = express()
const port = 3000

app.get('/', (req, res) => {

/* Section 1*/

    //Have a count greater than 3
    console.log(DB_data.send_log_data.filter(item => (item.count > 3)));  

    //Reason equals build error or send failure
    console.log(DB_data.send_log_data.filter(item => (item.count > 3 && item.reason === "buildError" || item.reason === "sendFailure")));  

     //If email name and count are the same value only return the send failure object
    const filteredData = DB_data.send_log_data.filter(item => (item.count > 3 && (item.reason === "buildError" || item.reason === "sendFailure") && (
        item.emailName
    )))
    const result = []
    for (var i = 1; i < filteredData.length; i++) {
        if (filteredData[0].emailName === filteredData[i].emailName && filteredData[0].count === filteredData[i].count && filteredData[i].reason === "sendFailure")
            result.push(filteredData[i])
        else
            result.push(filteredData[i])
    }
    console.log(result);   
    res.send(result)
})

/* Section 2*/

app.get('/sectiontwo', (req, res) => {
    fs.copy('prod', 'backup', function (err) {
        if (err) return console.error(err)
        console.log('prod copied into backup!')
    });
    fs.copy('dev/components/cta.txt', 'prod/components/cta.txt', function (err) {
        if (err) return console.error(err)
        console.log('dev_cta.txt copied into prod_cta.txt!')
    });
    res.send('prod copied into backup! && dev_cta.txt copied into prod_cta.txt!')
})

/* Section 3*/

app.get('/sectionthree', (req, res) => {
    const dev_tranactional_data = DB_data.template_data.dev_env[0].content;
    const prod_tranactional_data = DB_data.template_data.prod_env[0].content;

    fs.writeFile('dev/templates/transactional.html', dev_tranactional_data, function (err) {
        if (err) return console.error(err)
        console.log('development environment content copied into transactional.html')
    })
    fs.writeFile('prod/templates/transactional.html', prod_tranactional_data, function (err) {
        if (err) return console.error(err)
        console.log('production environment content copied into transactional.html')
    })
    res.send('development environment content copied into transactional.html && production environment content copied into transactional.html!')

})
app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)
})