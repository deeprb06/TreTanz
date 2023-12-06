const { OPENSSL_CONF } = require('../config/constants/common');
// const Pdf = require('html-pdf');

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const localize = (key, req, module = null, disableTitleCase = false) => {
    if (module) {
        return req.i18n
            .t(key)
            .replaceAll(
                '{module}',
                disableTitleCase ? module : _toTitleCase(module),
            );
    }
    return req.i18n.t(key);
};

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

/**
 *
 * @param {*} html string to generate pdf
 * @param {*} pdfName name of pdf
 * @param {*} id hex id
 * @returns this function create pdf and upload pdf in aws s3 bucket
 */

const createPdf = async (html, pdfName, id) => {
    try {
        const storeName = `documents/${id}/${pdfName}.pdf`;
        const options = {
            format: 'A4',
            phantomArgs: ['--ignore-ssl-errors=yes'],
            timeout: '100000',
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: OPENSSL_CONF,
                },
            },
        };

        return new Promise((resolve, reject) => {
            Pdf.create(html, options).toBuffer(async (error, response) => {
                if (error) {
                    logger.error('Error in create pdf buffer', error);
                    reject(error);
                }
                if (response) {
                    AWS.config.update({
                        accessKeyId: AWS_CONFIG.AWS_S3_ACCESS_KEY,
                        secretAccessKey: AWS_CONFIG.AWS_S3_SECRET_KEY,
                        ...(AWS_CONFIG.AWS_SESSION_TOKEN
                            ? { region: AWS_CONFIG.AWS_SESSION_TOKEN }
                            : {}),
                    });
                    const s3 = new AWS.S3();
                    const params = {
                        Bucket: AWS_CONFIG.AWS_S3_BUCKET_NAME,
                        Key: storeName,
                        Body: response,
                        ACL: 'public-read',
                        ContentType: 'application/pdf',
                    };
                    s3.upload(params, (error, data) => {
                        if (error) {
                            reject(error);
                        }
                        resolve({
                            fileUrl: `${AWS_CONFIG.AWS_S3_URL}/${storeName}`,
                            storeName,
                        });
                    });
                } else {
                    resolve(createPdf(html, pdfName, id));
                }
            });
        });
    } catch (error) {
        logger.error('Error - createPdf', error);
        throw error;
    }
};

function handleError (error, msg) {
    logger.error(msg, error);
    throw new Error(error?.message || error);
}

const getFilterQuery = async (query) => {
    if (query.search && query.search !== '') {
        query['$or'] = query.searchColumns.map((column) => {
            return {
                [column]: {
                    $regex: query.search
                        .replace(/[-[\]{}()*+?.,\\/^$|#]/g, '\\$&')
                        .trim(),
                    $options: 'i',
                },
            };
        });
    }
    delete query.search;
    delete query.searchColumns;
    return query;
};

module.exports = {
    pick,
    localize,
    toTitleCase,
    createPdf,
    handleError,
    getFilterQuery
};
