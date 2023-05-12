const express = require("express")
const cors = require("cors")

const app = express()

//app.use(express.json)
app.use(cors())
app.use(express.urlencoded({extended:false})) 
app.use(express.json())


app.get("/",(req,res)=>{
    res.send(`
        <h1>Hello ${req.ip}<h1>
        <div style="background-color:pink;">Welcome to Home Page</div>
    `)
})


app.post('/redirect', (req, res) => {
    console.log(req.body)
    // const code = req.body.get("code");
    // const state = req.body.get("state");
    const code = 1
    const state = 2

    // i dont know about cookies, just copy from tiktok api docs
    // const { csrfState } = req.cookies;
    const csrfState = "1"

    console.log(`Get Query: ${code}, ${state}`)

    // currently dont have key and secret
    let CLIENT_KEY = "somewhat"
    let CLIENT_SECRET = "somewhat"

    // if (state !== csrfState) {
    //     res.status(422).send('Invalid state');
    //     return;
    // }

    let url_access_token = 'https://open-api.tiktok.com/oauth/access_token/';
    url_access_token += '?client_key=' + CLIENT_KEY;
    url_access_token += '&client_secret=' + CLIENT_SECRET;
    url_access_token += '&code=' + code;
    url_access_token += '&grant_type=authorization_code';

    // fetch(url_access_token, {method: 'post'})
    //     .then(res => res.json())
    //     .then(json => {
    //         res.send(json);
    //     });

    res.send("ok")
    res.status(200)
    
})


app.listen(3000,()=>{
    console.log("server on")
    console.log("http://127.0.0.1:3000/")
})