const express = require('express');
const app = express();

app.get('/', function() {
    res.sendFile(__dirname + '/public/home.html')
}
);

app.get('/list', function() {
    res.sendFile(__dirname + '/public/about.html')
}
);

app.get('/new', function() {
    res.sendFile(__dirname + '/public/about.html')
}
);

app.listen(3000, () => {
    console.log(`server is running`);
})