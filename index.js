// https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const express = require('express');
const cors = require('cors');
const app = express();
global.__basedir = __dirname;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Backend');
});

require('./routes/auth.routes')(app);
require('./routes/event.routes')(app);
require('./routes/user.routes')(app);
require('./routes/upload.routes')(app);

const db = require('./models');
const Role = db.role;

db.mongoose.connect("mongodb+srv://webdev:MeinCoolesPassword@cluster0.2snr7nl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
}).then(() => {
    console.log('Connected to the database!');
}).catch(err => {
    console.log('Error connecting to the database', err);
    process.exit();
});

// Add Admin and user Role to the database
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'Admin'
            }).save(err => {
                if (err) {
                    console.log(err);
                }
                console.log('Added Admin Role to the Database');
            });
            new Role({
                name: 'User'
            }).save(err => {
                if (err) {
                    console.log(err);
                }
                console.log('Added User Role to the Database');
            });
        }
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initial();
});