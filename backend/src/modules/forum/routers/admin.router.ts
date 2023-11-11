/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import config from '@config/config'
import { auth } from '@modules/auth'
import express from 'express'
import { startBackup } from '../utils/backup'
import { Connect, Process } from '../utils/mongodb'

export const adminRouter = express.Router()

adminRouter.get('/', auth(), async (req, res) => {
  try {
    await startBackup()
    const slave = await Connect(config.mongoose.slave)

    const listDatabases = await slave.db('backup').admin().listDatabases()
    const listBackups = listDatabases.databases
      .filter(db => db.name.includes('jobsicker-version'))
      .sort((a, b) => Number(b.name.split('jobsicker-version-')?.[1]) - Number(a.name.split('jobsicker-version-')?.[1]))

    if (listBackups.length > 5) {
      const backup_db = slave.db(listBackups[listBackups.length - 1].name)
      const collections = await Promise.all((await backup_db.listCollections().toArray()).map(el => el.name))

      for (const collection of collections) {
        await backup_db.dropCollection(collection)
      }
    }
    slave.close()
    res.status(200).json({
      success: true,
      message: 'Backup data is successful',
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
})

adminRouter.post('/restore', auth(), async (req, res) => {
  try {
    const { name } = req.body

    const { log } = console
    console.log = function (...args) {
      args.unshift(new Date())
      log.apply(console, args)
    }
    /** *********************************************************************** */
    console.log(config)
    /** *********************************************************************** */
    const primary = await Connect(config.mongoose.url)
    const database = primary.db(`test`)
    console.log(`Connect db primary....`)
    const slave = await Connect(config.mongoose.slave)
    const backup_db = slave.db(name)

    console.log(`Connect db slave....`)
    /** *********************************************************************** */
    const total = await Process(backup_db, database)
    console.log(`${total} documents backup done...`)
    await primary.close()
    await slave.close()

    res.status(200).json({
      success: true,
      message: 'Restore data is successful',
    })
  } catch (err: any) {
    res.status(400).json({
      success: true,
      message: err.message,
    })
  }
})

adminRouter.post('/drop', auth(), async (req, res) => {
  try {
    const { name } = req.body
    const slave = await Connect(config.mongoose.slave)

    const backup_db = slave.db(name)
    const collections = await Promise.all((await backup_db.listCollections().toArray()).map(el => el.name))

    for (const collection of collections) {
      await backup_db.dropCollection(collection)
    }

    slave.close()
    res.status(200).json({
      success: true,
      message: 'Deleted old version of database successfully',
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
})

adminRouter.get('/all', auth(), async (req, res) => {
  try {
    const slave = await Connect(config.mongoose.slave)

    const listDatabases = await slave.db('backup').admin().listDatabases()
    const listBackups = listDatabases.databases
      .filter(db => db.name.includes('jobsicker-version'))
      .sort((a, b) => Number(b.name.split('jobsicker-version-')?.[1]) - Number(a.name.split('jobsicker-version-')?.[1]))
    res.status(200).json({
      success: true,
      data: listBackups,
    })
  } catch (err) {
    console.log('err')
    res.status(400).json({
      success: false,
    })
  }
})
