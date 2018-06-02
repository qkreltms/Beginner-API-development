import mongoose from 'mongoose'
import { Router } from 'express'
import Restaurant from '../model/restaurant'

export default({ config, db }) => {
  let api = Router()

  // '/v1/restaurant/add' -create data
  api.post('/add', (req, res) => {
    let newRest = new Restaurant()
    newRest.name = req.body.name

    newRest.save(err => {
      if (err) {
        res.send(err)
      }
      res.json({ message: req.body.name+' Restaurant saved successfully' })
    })
  })

// '/v1/restaurant' - read
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if (err) {
        res.send(err)
      }
      res.json(restaurants)
    })
  })

  // 'v1/restaurant/:id' - Read by id
  api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err) {
        res.send(err)
      }
      res.json(restaurant)
    })
  })

  return api
}
