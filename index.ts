import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { UsersRepository } from "./server/repositories/users_repository";

import { buildSoftwareController } from "./server/controllers/software_controller";
import { SoftwareRepository } from "./server/repositories/software_repository";

import { buildCommonIssuesController } from "./server/controllers/commonIssues_controller";
import { CommonIssuesRepository} from "./server/repositories/commonIssues_repository";

import { buildIncidentsController } from "./server/controllers/incidents_controller";
import { IncidentsRepository } from "./server/repositories/incidents_repository";

import { buildResourcesController } from "./server/controllers/resources_controller";
import { ResourcesRepository } from "./server/repositories/resources_repository";

import { buildResponsibilitiesController } from "./server/controllers/responsibilities_controller";
import { ResponsibilitiesRepository } from "./server/repositories/responsibilities_repositiory";

import { buildDesktopSupportsController } from "./server/controllers/desktopSupports_controller";
import { DesktopSupportsRepository } from "./server/repositories/desktopSupports_repository";

import { buildDepartmentsController } from "./server/controllers/departments_controller";
import { DepartmentsRepository } from "./server/repositories/departments_repository";

import { buildExtensionsController } from "./server/controllers/extensions_controller";
import { ExtensionsRepository } from "./server/repositories/extensions_repository";

const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const softwareRepository = SoftwareRepository.getInstance(db);
const commonIssuesRepository = CommonIssuesRepository.getInstance(db);
const incidentsRepository = IncidentsRepository.getInstance(db);
const resourcesRepository = ResourcesRepository.getInstance(db);
const responsibilitiesRepository = ResponsibilitiesRepository.getInstance(db);
const desktopSupportsRepository = DesktopSupportsRepository.getInstance(db);
const departmentsRepository = DepartmentsRepository.getInstance(db);
const extensionsRepository = ExtensionsRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}


app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/software", buildSoftwareController(softwareRepository));
app.use("/commonIssues", buildCommonIssuesController(commonIssuesRepository));
app.use("/incidents", buildIncidentsController(incidentsRepository));
app.use("/resources", buildResourcesController(resourcesRepository));
app.use("/responsibilities", buildResponsibilitiesController(responsibilitiesRepository));
app.use("/desktopSupport", buildDesktopSupportsController(desktopSupportsRepository));
app.use("/departments", buildDepartmentsController(departmentsRepository));
app.use("/extensions", buildExtensionsController(extensionsRepository));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


