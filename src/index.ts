import express, {Request, Response} from "express";
import bodyParser from 'body-parser';
import mysql from "mysql2/promise";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configura EJS como a engine de renderização de templates
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});
app.use(express.static('public'));
// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));
// ------ Rota para a URL raiz ----------
app.get("/", (req: Request, res: Response) => {
    res.redirect("/aep");
});
//--------------Rota Login-------------
app.get('/aep', async function (req: Request, res: Response) {
    const [rows] = await connection.query("SELECT * FROM aep");
    return res.render('aep/TelaLogin', {
        aep: rows
    });
});

app.post('/login', async function (req: Request, res: Response)  {
    console.log(req.body);
    const { usuario, senha } = req.body; // Extraia usuário e senha do corpo da requisição !!!!!!!!!!!!!
    const query = "SELECT * FROM users WHERE usuario = ? AND senha = ?";
    const [rows]: any = await connection.query(query, [usuario, senha]);
    if (rows.length > 0) {
        // Login bem-sucedido
        res.redirect('/aep/TelaGerador'); 
    } else {
    
        return res.render('aep/TelaLogin');
     
    }
})

//--------------Rota cadastro-------------
app.get('/aep/TelaCadastro', async function (req: Request, res: Response) {
    return res.render('aep/TelaCadastro/TelaCadastro');
});

app.post('/cadastro/save', async (req: Request, res: Response) => {
    try { // para ver se esta cessando o banco de dados 
        console.log(req.body); // para ver se esta pegando as info
        const { usuario, Email, nome, senha, papel} = req.body;
        const insertQuery = "INSERT INTO users (usuario, senha) VALUES (?,?)";
        await connection.query(insertQuery, [usuario,senha,]);
        res.redirect("/aep");
    } catch (error) {
        console.error('Error inserting data: ', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/aep/TelaGerador', async function (req: Request, res: Response) {
    return res.render('aep/TelaGerador/TelaGerador');
});



app.listen('3000', () => console.log("Server is listening on port 3000"));