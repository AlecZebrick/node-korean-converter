const usNumber = require('./utils/engNum')
const korNumber = require('./utils/korNum')
const address = process.argv[2]
const express = require('express')
const hbs = require('hbs')
const path = require('path')


const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Sets up handlebars engine and views loc
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup statis directory to serve
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Korean Number Converter',
        title2: '숫자 변환기',
        name: 'Alec Zebrick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        info: 'This is a number converter for both English and Sino Korean. As an expat living in Korea I find Korean numbers to be difficult for me as well as english numbers to be confusing for Koreans. I created this app as a resource to help me with this, and I hope you find it helpful too! I created this website using Javascript code in NodeJS. The code has been deployed onto a linux AMI provisioned in the AWS cloud.',
        picture: "/img/headshot2.png",
        name: 'Alec Zebrick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'At the moment all you need to do is input a number and it will convert it into both English and Sino Korean. My hope is to add additional features such as the ability to convert currencies.',
        title:'Help',
        name: 'Alec Zebrick'
    })
})


//wired up accepting query string from local host
app.get('/number', (req, res) => {
    if (!req.query.number) {
        return res.send({
            error: 'You must provide a number'
        }) 
    } else if (!/^[0-9]{1,}(?:,[0-9]{1,3})*$/.test(req.query.number)) {
        return res.send({
            error: 'Only whole numbers are accepted'
        })
    } else if (req.query.number.length > 19) {
        return res.send({
            error: ' Number is too long'
        })
    }

    let red = korNumber(req.query.number)
    res.send({
           korean: red.replace(/일([백|십|만|천|경]{1})/g, '$1'),
           english: usNumber(req.query.number)
    })
}) 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alec Zebrick',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alec Zebrick',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000);





// console.log(korNumber)
// console.log(usNumber)


