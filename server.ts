import express from "express";
import cors from "cors";
import config from "./config.json";
import path from "path";
import fs from "fs";
import https from "https";

import MainRouter from "./src/routers/main.router";

const PORT: number = +process.env.PORT || config.PORT;
const HOST: string = process.env.HOST || config.HOST;

const app = express();

let httpsServer = null;

if (!process.env.NOTSSL) {
    httpsServer = https.createServer(
        {
            key: fs.readFileSync(path.resolve("./etc/ssl/privkey.pem")),
            cert: fs.readFileSync(path.resolve("./etc/ssl/fullchain.pem")),
        },
        app
    );
}

// =========== MIDDLEWARE ==============

app.use("/", express.static("./static"));
app.use("/images", express.static("./static/images"));
app.use(express.json());
app.use(cors());

// =========== ROUTERS ==============

app.use("/api", MainRouter);

// =========== ENDPOINTS ==============

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./static/index.html"));
});

// STARTING THE SERVER

if (process.env.NOTSSL) {
    app.listen(PORT, HOST, 0, () => console.log(`Server has been succesfully started! on ${HOST}:${PORT}`));
} else {
    httpsServer.listen(PORT, HOST, 0, () => console.log(`Server has been succesfully started! on ${HOST}:${PORT}`));
}
