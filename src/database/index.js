import Sequelize from 'sequelize'
import databaseConfig from '../config/database'
import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'
import mongoose from 'mongoose'

const models = [User, File, Appointment]

class Database {
  constructor () {
    this.init()
    this.mongo()
  }

  init () {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo () {
    this.mongoConnection = mongoose.connect(
      // 'mongodb://localhost:27017/gobarber',
      'mongodb+srv://root:root@cluster0-odjrb.mongodb.net/test?retryWrites=true&w=majority'
      ,
      {
        useNewUrlParser: true,
        useFindAndModify: true
        // useUnifiedTopology: true
      }

    )
  }
}

export default new Database()
