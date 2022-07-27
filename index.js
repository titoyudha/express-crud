const express = require('express');
const bodyParser = require('body-parser');
const connection = require ('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 


app.post('/api/bootcamp', (req, res) => {
    const data = {...req.body};
    const querySQL = 'INSERT INTO bootcamp SET ?';

    connection.query(querySQL, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                'message':'Failed to insert data',
                 error: err
            })
        }
        res.status(200).json({
            success: true,
            message: 'Success inserting data'
        })
    });
});


app.get('/api/bootcamp', (req, res) => {
    const queryGet = 'SELECT * FROM bootcamp';

    connection.query(queryGet, (err, rows, field) => {
        if (err) {
            return res.status(500).json({
                'message': 'Error getting all data',
                error: err
            })
        }
        res.status(200).json({
            sucess: true,
            message: 'Success get all data',
            data: rows
        })
    })
});

app.put('/api/bootcamp/:id', (req, res) => {
    const data = {...req.body};
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryupdate = 'UPDATE bootcamp SET ? WHERE id = ?';

    //query serch data
    connection.query(querySearch, req.params.id,  (err, rows, field) => {
        if (err) {
            res.status(500).json({
                message: 'Error while searching bootcamp with id',
                error: err
            });
        }
        if (rows.length) {
            connection.query(queryupdate, [data, req.params.id], (err, rows, field) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error occured when updating',
                        error: err
                    })
                }
                res.status(200).json({
                    success: true,
                    message: 'Success update data'
                })
            });
        }else {
            res.status(404).json({
                success: false,
                message: 'Data not found'
            })
        }        
    })
    
});

app.delete('/api/bootcamp/:id', (req, res) => {
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryDelete = 'DELETE FROM bootcamp WHERE id = ?';

    connection.query(querySearch, req.params.id, (err, rows, field) => {
        if (err) {
            res.status(500).json({
                message: 'An error occured while search data with this id',
                error: err
            })
        }
        if (rows.length){
            connection.query(queryDelete, req.params.id, (err, rows, field) => {
                if (err) {
                    res.status(500).json({
                        message: 'Error while deleting data',
                        error: err
                    })
                }
                res.status(200).json({
                    success: true,
                    message: 'Successful deleting bootcamp'
                })
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Data not found'
            })
        }
    })
});


app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});
