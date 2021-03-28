import express from "express";
import config from "./configs/config";
import webpackBundler from "./webpackBundler";
import mongoose from "mongoose";
import path from "path";
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import React from "react";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import theme from "../client-side/theme";
import AppRouter from "../client-side/AppRouter";
import UserRouter from "./routers/user.router";
import AuthUserRouter from "./routers/user.authentication";

const CURRENT_WD = process.cwd();
const app = express();

if (process.env.NODE_ENV === "development") {
    webpackBundler.Bundler(app);
}
app.use(express.static(path.join(CURRENT_WD, '/build/')))
app.use(express.static(path.join(CURRENT_WD, '/public/')))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser())
app.use('/', UserRouter)
app.use('/', AuthUserRouter)
app.get("*", (req, res) => {
    const sheets = new ServerStyleSheets();
    const context = {};
    const html = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <AppRouter/>
                </ThemeProvider>
            </StaticRouter>
        )
    )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const MaterialUICss = sheets.toString();
    let bundleFile;
    if (process.env.NODE_ENV === 'development') {
        bundleFile = '/build/bundle.js';
    } else {
        bundleFile = '/bundle.js';
    }
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TEST APPLICATION</title>
        <meta name="description" content="Sharing platform for everyone.">
        <meta name="keywords" content="Reactjs, Nodejs, Jsx, Express, JavaScript">
        <meta name="author" content="Mahady Manana">
        <base href="/">
        <script src="https://kit.fontawesome.com/07f325d208.js" crossorigin="anonymous"></script>
        <style id="js-server">${MaterialUICss}</style>
    </head>
    <body>
        <div id="root">${html}</div>
        <script src=${bundleFile}></script> 
    </body>
    </html>
    `)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoURI}`)
})
app.listen(config.port, error => {
    if (error) {
        console.log(error)
    }
    console.log(`Server running at : ${config.port}\nVisit : http://localhost:${config.port}`)
})
