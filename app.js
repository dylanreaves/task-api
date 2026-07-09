const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { dbConn, UserModel, TaskModel } = require("./models");

const app = express()
const tasksRouter = require("./routes/tasks")
const usersRouter = require("./routes/users");
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// function logger(request, response, next) {
//     console.log(request.method, request.url)
//     next()
// }

function errorHandler(error, request, response ,next) {
    console.error(error)
    response.status(500).json({Error: "Something went wrong"});
}

app.get('/', (request, response ,next) => {
    // console.log("request")
    // This is simply a redirect we don't need to put main logic for routes through this function.
    // We will have various if statements here to handle redirect i.e checking the query to see if we have those existing fields before redirecting.

    // const queryParams = new URLSearchParams(request.query).toString()
    // response.redirect(`/api/tasks/?${queryParams}`)
    response.redirect(`/api/tasks`)
})

// app.get('/:id', (request, response ,next) => {
//     // console.log("id request")
//     const id = request.params.id
//     response.redirect(`/api/tasks/${id}`)
// })

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tasks", tasksRouter)
app.use("/api/users", usersRouter)

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler)

async function startApp() {
    await dbConn.sync()
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT)
    })
}

startApp()