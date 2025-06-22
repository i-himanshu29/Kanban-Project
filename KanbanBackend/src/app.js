import express from "express"
const app = express()
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser())

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"
import noteRouter from "./routes/note.routes.js"

app.use("/api/v1/healthcheck",healthCheckRouter)

// auth routes
app.use("/api/v1/users", authRouter);

// project routes
app.use("/api/v1/project",projectRouter)

// note routers
app.use("api/v1/note",noteRouter)

export default app;