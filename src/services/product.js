const Product = require('../models/product');
const excel = require('exceljs');
const dbService = require('../utils/dbService');

async function parseExcel(filePath) {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const headers = worksheet.getRow(1).values;

    const dataArray = [];

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex > 1) {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
                const header = headers[colIndex];
                const value = cell.value;
                if (header && value !== null) {
                    rowData[header] = value;
                }
            });
            dataArray.push(rowData);
        }
    });

    return dataArray;
}

const importProduct = async (req, res) => {
    try {
        if (req.file == undefined) {
            throw new Error(_localize('file.valid', req, 'xlsx'));
        }

        const data = await parseExcel(req.file.path);
        if (data) {
            await Product.insertMany(data);
            return true;
        }
        return false;
    } catch (error) {
        handleError(error, 'Something went wrong during import');
    }
};

const getAllProduct = async (req) => {
    try {
        return dbService.getAllDocuments(Product, req.body?.query || {}, req.body?.options || {})
    } catch (error) {
        handleError(error, 'Error in get all products service');
    }
}

module.exports = {
    importProduct,
    getAllProduct
};
