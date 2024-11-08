import express, {Request, Response} from "express"; // usado para criar a aplicação express
import mysql from "mysql2/promise";

const app = express();

// Configura EJS como a engine de renderização de templates
app.set('view engine', 'ejs');//
app.set('views', `${__dirname}/views`);
//app.set('views', './src/views');
// Middleware para servir arquivos estáticos
app.use(express.static(__dirname +"/public"));

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});

// ------ Rota para a URL raiz ----------
app.get("/", (req: Request, res: Response) => {
    res.redirect("/TelaLogin");// ou renderize outra página
});

// Middleware para permitir dados no formato JSON
app.use(express.json());


// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));


//--------------Rota Login-------------
app.get('/TelaLogin', async function (req: Request, res:Response) {
    return res.render('TelaLogin/TelaLogin');
})

app.post('/TelaLogin', async function (req: Request, res: Response)  {
    const { usuario, senha } = req.body; // Extraia usuário e senha do corpo da requisição !!!!!!!!!!!!!
    const query = "SELECT * FROM users WHERE usuario = ? AND senha = ?";
    const [rows]: any = await connection.query(query, [usuario, senha]);
    if (rows.length > 0) {
        // Login bem-sucedido
        res.redirect('/TelaGerador'); 
    } else {
    
        return res.render('TelaLogin/TelaLogin');
     
    }
})

//--------------Rota cadastro-------------
app.get('/TelaCadastro', async function (req: Request, res: Response) {
    return res.render('TelaCadastro/TelaCadastro');
});

app.post('/cadastro/save', async (req: Request, res: Response) => {
    try { // para ver se esta cessando o banco de dados 
        console.log(req.body); // para ver se esta pegando as info
        const { usuario,senha,confirmSenha} = req.body;

        
        if (senha !== confirmSenha) {
            return res.render('TelaCadastro/TelaCadastro', {
                errorMessage: 'As senhas não coincidem. Tente novamente.'
            });
        }

        const insertQuery = "INSERT INTO users (usuario, senha) VALUES (?,?)";
        await connection.query(insertQuery, [usuario,senha,]);
        res.redirect("/TelaLogin");
    } catch (error) {
        console.error('Error inserting data: ', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/TelaGerador', async function (req: Request, res: Response) {
    return res.render('TelaGerador/TelaGerador');
});



app.listen('3000', () => console.log("Server is listening on port 3000"));