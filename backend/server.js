const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

const jsonFile = './data/books.json'
const csvFile = './data/books.csv'

function loadJson(){
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFile, 'utf-8', (err, data) => {
            if(err){
                return reject(err)
            }
            resolve(JSON.parse(data));
        });
    });
}

function loadCSV(){
    return new Promise((resolve, reject) =>{
        const results= [];
        fs.createReadStream(csvFile).pipe(csvParser())
            .on('data', (row) => results.push(row))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

async function mergeData(){
    try{
        const jsonData = await loadJson();
        const csvData = await loadCSV();

        const jsonMap = new Map();
        jsonData.forEach((item) => {
            jsonMap.set(String(item.id), item);
        });

        const mergedData = csvData.map((csvRow) => {
            const id = String(csvRow.id);
            const jsonRow = jsonMap.get(id) || {};
            return{
                ...csvRow,
                ...jsonRow,
            };
        });

        return mergedData;
    }

    catch (error){
        console.log('Error merging data: ', error);
        throw error;
    }
}

app.get('/books', async(req, res) => {
    try{
        const mergedData = await mergeData();
        res.json(mergedData);
    }
    catch (error){
        res.status(500).json({message: 'Error fetching books, ', error});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})