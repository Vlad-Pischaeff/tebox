'use strict';

const ba64 = require('ba64');
const { randomString } = require('make-random');

const checkBase64 = string => {
    const B64_REGEX = /^data:.*;base64,([0-9a-zA-Z+\\/]{4})*(([0-9a-zA-Z+\\/]{2}==)|([0-9a-zA-Z+\\/]{3}=))?$/i;
    return B64_REGEX.test(string);
};

const uploadController = () => {
    /** *********************************************
     * получаем base64 кодированный файл photo
     * генерим имя и сохраняем в /upload
     * возвращаем имя файла
     ********************************************** */
    // eslint-disable-next-line
    const upload = async (req, res, next) => {
        const { photo } = req.body;
        const name = await randomString(15);

        // check if it's correctly formatted Base64 Data URI
        if (checkBase64(photo)) {
            ba64.writeImageSync(`./upload/${name}`, photo);
        }

        res.status(200).send({ name });
    };

    return {
        upload
    };
};

module.exports = uploadController;
