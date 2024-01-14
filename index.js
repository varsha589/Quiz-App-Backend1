import dotenv from "dotenv"
import connectDB from './db/index.js'
import app from './app.js'

dotenv.config({
    path: './.env'
})
 

connectDB()
.then(() => {
    app.on( "Error" , (error) => {
        console.log("error :" , error)
            throw error
    } )
})
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(` Server is running at ${process.env.PORT }`)
    })
})
.catch((err) => {
    console.log("data base connnection failed" , err)
})

