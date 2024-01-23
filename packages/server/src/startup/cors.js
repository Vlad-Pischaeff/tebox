'use strict';

const cors = require('cors');


const corsOptions = {
    origin: [
        "http://tebox.mooo.com",
        "https://tebox.mooo.com",
        "http://tebox.mooo.com:5001",
        "https://tebox.mooo.com:5001",
    ],
    optionSuccessStatus: 200, // для старых браузеров и SmartTV
    credentials: true,
};

module.exports = app => {
    app.use(cors(corsOptions));
};
