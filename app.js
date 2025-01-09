const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const pokemonRoutes = require('./routes/pokemon');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// 路由
app.use('/api/pokemons', pokemonRoutes);

//front et backend
const cors = require('cors');
app.use(cors());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});