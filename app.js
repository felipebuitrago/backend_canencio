require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000
const app = express()
//public html
app.use(express.static('public'))
//cors
app.use(cors())
//lecture and parse of the body
app.use(express.json())

//routes
app.use('/api/auth', require('./app/routes/auth')) //auth and login

app.use('/api/products', require('./app/routes/productos')) // products crud

app.use('/api/proveedores', require('./app/routes/proveedor')) // proveedor crud

app.use('/api/pacientes', require('./app/routes/paciente')) // pacientes crud

app.use('/api/categorias', require('./app/routes/categoria')) // categoria crud

app.use('/api/almacenes', require('./app/routes/almacen')) // almacen crud

app.use('/api/inventario', require('./app/routes/inventario')) // inventario
                                    //  hacer movimiento, ver todos los movimientos

app.use('/api/usuarios', require('./app/routes/usuarios')) //administracion de usuarios

//end routes

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/index.html'));
})
//connects to db
dbConnect()
//starts server
app.listen(PORT, () => {
    let prompt = "|$$$$$$| API listenning on port: " +  PORT + " |$$$$$$|\n"

    console.log(prompt);

    console.log("                ____ ____ ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ \n               ||C |||A |||N |||E |||N |||C |||I |||O |||       |||A |||P |||I ||\n               ||__|||__|||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__||\n               |/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/_______\\|/__\\|/__\\|/__\\|\n               ")
    console.log("...........................)............)...........(.........)................(......(.........\n........(.......(.......(./(.........(./(.....(.....)\\.)...(./(........(.......)\\.)...)\\.)......\n........)\\......)\\......)\\())..(.....)\\())....)\\...(()/(...)\\()).......)\\.....(()/(..(()/(......\n......(((_)..((((_)(...((_)\\...)\\...((_)\\...(((_).../(_)).((_)\\.....((((_)(..../(_))../(_)).....\n......)\\___...)\\ _ )\\..._((_).((_)..._((_)..)\\___..(_)).....((_).....)\\ _ )\\..(_))...(_)).......\n.....((/ __|..(_/_\\(_).| \\| |.| __|.| \\| |.((/ __|.|_ _|.../ _ \\.....(_/_\\(_).| _ \\..|_ _|......\n......| (__..../ _ \\...|  ` |.| _|..|  ` |..| (__...| |...| (_) |...../ _ \\...|  _/...| |.......\n.......\\___|../_/.\\_\\..|_|\\_|.|___|.|_|\\_|...\\___|.|___|...\\___/...../_/.\\_\\..|_|....|___|......\n................................................................................................\n");
    //console.log("                      )        )       (       )            (   (     \n        (    (     ( /(     ( /(   (   )\\ ) ( /(      (     )\\ ))\\ )  \n        )\\   )\\    )\\())(   )\\())  )\\ (()/( )\\())     )\\   (()/(()/(  \n      (((_((((_)( ((_)\\ )\\ ((_)\\ (((_) /(_)((_)\\   ((((_)(  /(_)/(_)) \n      )\\___)\\ _ )\\ _((_((_) _((_))\\___(_))   ((_)   )\\ _ )\\(_))(_))   \n     ((/ __(_)_\\(_| \\| | __| \\| ((/ __|_ _| / _ \\   (_)_\\(_| _ |_ _|  \n      | (__ / _ \\ | .` | _|| .` || (__ | | | (_) |   / _ \\ |  _/| |   \n       \\___/_/ \\_\\|_|\\_|___|_|\\_| \\___|___| \\___/   /_/ \\_\\|_| |___|  \n ");
    //console.log("▄▀▄▄▄▄   ▄▀▀█▄   ▄▀▀▄ ▀▄  ▄▀▀█▄▄▄▄  ▄▀▀▄ ▀▄  ▄▀▄▄▄▄   ▄▀▀█▀▄   ▄▀▀▀▀▄       ▄▀▀█▄   ▄▀▀▄▀▀▀▄  ▄▀▀█▀▄   \n█ █    ▌ ▐ ▄▀ ▀▄ █  █ █ █ ▐  ▄▀   ▐ █  █ █ █ █ █    ▌ █   █  █ █      █     ▐ ▄▀ ▀▄ █   █   █ █   █  █  \n▐ █        █▄▄▄█ ▐  █  ▀█   █▄▄▄▄▄  ▐  █  ▀█ ▐ █      ▐   █  ▐ █      █       █▄▄▄█ ▐  █▀▀▀▀  ▐   █  ▐  \n  █       ▄▀   █   █   █    █    ▌    █   █    █          █    ▀▄    ▄▀      ▄▀   █    █          █     \n ▄▀▄▄▄▄▀ █   ▄▀  ▄▀   █    ▄▀▄▄▄▄   ▄▀   █    ▄▀▄▄▄▄▀  ▄▀▀▀▀▀▄   ▀▀▀▀       █   ▄▀   ▄▀        ▄▀▀▀▀▀▄  \n█     ▐  ▐   ▐   █    ▐    █    ▐   █    ▐   █     ▐  █       █             ▐   ▐   █         █       █ \n▐                ▐         ▐        ▐        ▐        ▐       ▐                     ▐         ▐       ▐ \n");

    let prompt1 = "LOG COLUMNS:\n |$$$$$$| WAY |$$$$$$| USER |$$$$$$| IP ADDRESS |$$$$$$| URL + METHOD |$$$$$$| TIME |$$$$$$|\n"
    console.log(prompt1);

    
})