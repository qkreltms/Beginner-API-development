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

  api.put('/:id', (req, res) => {
    //id를 찾은 후
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err) {
        res.send(err)
      }
      //수정할 값을 받고
      restaurant.name = req.body.name
      //수정한다.
      restaurant.save(err => {
        if (err) {
          res.send(err)
        }
        res.json({ message: "Restaurant info updated" })
      })
    })
  })

  api.delete('/:id', (req, res) => {
    Restaurant.remove({
      //id를 찾는다
      _id: req.params.id
      //삭제를 콜백으로 알려줌
    }, (err, restaurant) => {
      if (err) {
        res.send(err)
      }
      res.json({ message: "Restaurant successfully removed"})
    })
  })
  return api
}
