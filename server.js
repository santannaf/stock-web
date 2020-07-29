const express = require('express');
var path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist/stock-monitoring')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/stock-monitoring/index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
