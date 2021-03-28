import React from "react";
import {hydrate} from "react-dom";
import Application from "./Application"
import "./style.css"

hydrate(<Application/>, document.getElementById("root"))