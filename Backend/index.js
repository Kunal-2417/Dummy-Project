//express seerver?
//express seerver?
const express = require('express')
const bodyPaser = require('body-parser')
const mongoose = require('mongoose')
const axios = require('axios')
const fs = require('fs')
const CartRouter = require('./Routes/Cart.js')
const CompareRouter = require('./Routes/Compare.js')
const dotenv = require('dotenv')
const cors = require("cors");
const cookieParser = require("cookie-parser");


const { PythonShell } = require('python-shell');

const { orders, verfiy } = require("./Controllers/paymentController.js")
// routers import
const authRoute = require("./routes/authRoute.js");


const info = {
    lists: []
}

// const  scrapeChannel = require('./scrapper.js')

const myScrapers1 = require('./scrapper');
const myScrapers2 = require('./scrapper2');
const myScrapers3 = require('./scrapper3');
const myScrapers4 = require('./scrapper4');
const myScrapers5 = require('./scrapper5');
const myScrapers6 = require('./scrapper6');
const myScrapers7 = require('./scrapper7');
const myScrapers8 = require('./scrapper8');
const myScrapers9 = require('./scrapper9');
const myScrapers10 = require('./scrapper10');
const myScrapers11 = require('./scrapper11');
const myScrapers12 = require('./scrapper12');
const myScrapers13 = require('./scrapper13');
// console.log(myScrapers)

const app = express()
// const port=3000
app.use(cors({ origin: 'http://localhost:5173' }));
dotenv.config();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log("Connect to mongobd");
    } catch (error) {
        throw error;
    }
};


app.use(bodyPaser.json())
app.use("/api/cart", CartRouter)
app.use("/api/compare", CompareRouter)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept')
    next()
})

app.get('/creators', function async(req, res) {
    // res.send('Hello World')
    const creators = [
        {
            name: localStorage.getItem('name'),
            img: localStorage.getItem('img')
        },
    ]
    res.send(creators)
})
// ... previous code ...

app.post('/creators', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data1 = JSON.parse(message);
            responseData = { Data1 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData) {
            res.json(responseData); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});

app.post('/creator2', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper2.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData2 = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data2 = JSON.parse(message);
            responseData2 = { Data2 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData2 = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData2) {
            res.json(responseData2); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});



// app.post('/creator2', async (req, res) => {
//     // res.send('Hello World')

//     console.log(req.body.product)
//     const url2 = "https://pinkblue.in/catalogsearch/result/?q=" + req.body.product;
//     const Data2 = await myScrapers2.scrapeChannel2(url2)

//     const responseData = { Data2 };

//     res.send(responseData);

// })
app.post('/creator3', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper3.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData3 = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data3 = JSON.parse(message);
            responseData3 = { Data3 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData3 = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData3) {
            res.json(responseData3); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});
// app.post('/creator3', async (req, res) => {
//     console.log(req.body.product)
//     const url3 = "https://www.libraltraders.com/catalogsearch/result/?q=" + req.body.product;
//     const Data3 = await myScrapers3.scrapeChannel3(url3)
//     const responseData = { Data3 };
//     res.send(responseData)
// })
app.post('/creator4', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper4.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData4 = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data4 = JSON.parse(message);
            responseData4 = { Data4 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData4 = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData4) {
            res.json(responseData4); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});
app.post('/creator5', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper5.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData5 = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data5 = JSON.parse(message);
            responseData5 = { Data5 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData5 = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData5) {
            res.json(responseData5); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});
app.post('/creator6', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper6.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData6 = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data6 = JSON.parse(message);
            responseData6 = { Data6 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData6 = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData6) {
            res.json(responseData6); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});
app.post('/creator7', async (req, res) => {
    console.log(req.body.product);
    const searchQuery = req.body.product;

    // Define the options for the Python script execution
    const options = {
        pythonPath: 'C:/Users/DELL/AppData/Local/Microsoft/WindowsApps/python.exe', // Assuming python3.11 is in your PATH
        scriptPath: './',
        args: [searchQuery], // Pass the search query as an argument
    };

    const pythonShell = new PythonShell('scrapper7.py', options);

    // Send data to the Python script
    pythonShell.send(searchQuery);

    let responseData7 = null;

    // Listen for Python script output
    pythonShell.on('message', (message) => {
        console.log('Python output:', message);
        try {
            const Data7 = JSON.parse(message);
            responseData7 = { Data7 };
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });

    // Handle Python script errors
    pythonShell.on('error', (error) => {
        console.error('Python script execution error:', error);
        responseData7 = { error: 'Internal Server Error' };
    });

    // Listen for script end event
    pythonShell.on('close', () => {
        if (responseData7) {
            res.json(responseData7); // Send the response only once
        } else {
            res.status(500).send('Internal Server Error'); // Send error response if responseData is not set
        }
    });
});
app.post('/creator8', async (req, res) => {
    console.log(req.body.product)
    const url8 = `https://www.mydentalstock.com/catalogsearch/result/?q=${req.body.product}`;
    const Data8 = await myScrapers8.scrapeChannel8(url8)
    const responseData = { Data8 };
    res.send(responseData)
})
app.post('/creator9', async (req, res) => {
    console.log(req.body.product)
    const url9 = `https://www.greenguava.in/search-products?q=${req.body.product}`;
    const Data9 = await myScrapers9.scrapeChannel9(url9)
    const responseData = { Data9 };
    res.send(responseData)
})
app.post('/creator10', async (req, res) => {
    console.log(req.body.product)
    const url10 = `https://www.thedentaldealer.com/index.php?route=product/search&search=${req.body.product}&description=true`;
    const Data10 = await myScrapers10.scrapeChannel10(url10)
    const responseData = { Data10 };
    res.send(responseData)
})
app.post('/creator11', async (req, res) => {
    console.log(req.body.product)
    const url11 = `https://www.dentaltix.com/en/search-results?keyword=${req.body.product}`;
    const Data11 = await myScrapers11.scrapeChannel11(url11)
    const responseData = { Data11 };
    res.send(responseData)
})
app.post('/creator12', async (req, res) => {
    console.log(req.body.product)
    const url12 = `https://dentalprod.com/search?options%5Bprefix%5D=last&q=${req.body.product}`;
    const Data12 = await myScrapers12.scrapeChannel12(url12)
    const responseData = { Data12 };
    res.send(responseData)
})
app.post('/creator13', async (req, res) => {
    console.log(req.body.product)
    const url13 = `https://dentalbasket.in/index.php?category_id=0&search=${req.body.product}&submit_search=&route=product%2Fsearch`;
    const Data13 = await myScrapers13.scrapeChannel13(url13)
    const responseData = { Data13 };
    res.send(responseData)
})

// middlewares
app.use(cors());
app.use(bodyPaser.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use(bodyPaser.json());

app.post("/orders", orders);
app.post("/verfiy", verfiy)
app.get('/getKey', (req, res) =>
    res.status(200).json({ key: process.env.KEY_ID }))

// entry point
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "API Testing",
    });
});

// error handling using middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "!Something went wrong!";

    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});



app.listen(process.env.Port, () => {
    // connect();
    console.log(`Example app listening on port ${process.env.Port}!`)
})