import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const username = 'root'
const password = process.env.SECURE_PASSWORD_MONGO
const clusterName = process.env.CLUSTER_NAME

mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.i0eznqb.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('open', () => { console.log('Connected to MongoDB') })
db.on('error', (error) => { console.log('error al conectar a mongodb' + error ) });

export default db