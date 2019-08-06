import request from 'supertest'

import app from '../src/config/server'
import { DatabaseTest } from '../src/helpers'
import UserFactory from './factory/user-factory'

describe('TEST USERS', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    global.user = await UserFactory()
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('POST /v1/users', () => {
    test('should create a new user', async () => {
      const response = await request(global.server)
        .post('/v1/users/signup')
        .send({
          name: 'User Test',
          email: 'userTest@teste.com',
          password: 'test123',
          role: 'USER'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('POST /v1/users/login', () => {
    test('should do login', async () => {
      const response = await request(global.server)
        .post('/v1/users/login')
        .send({
          email: global.user.email,
          password: global.user.password
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'token', 'role'])
      )
    })
  })

  describe('GET /v1/users', () => {
    test('should return a list of users', async () => {
      const response = await request(global.server)
        .get('/v1/users')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body[0])).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('GET /v1/users/:id', () => {
    test('should return a user', async () => {
      const response = await request(global.server)
        .get(`/v1/users/${global.user.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('PUT /v1/users/:id', () => {
    test('should update a user', async () => {
      const response = await request(global.server)
        .put(`/v1/users/${global.user.id}`)
        .set('Authorization', global.user.token)
        .send({
          name: 'User Test Update',
          email: 'userTestUpdate@teste.com',
          password: 'update123',
          role: 'USER'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('DELETE /v1/users/:id', async () => {
    test('should delete a user', async () => {
      const response = await request(global.server)
        .delete(`/v1/users/${global.user.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'name',
          'message',
          'deleted',
          'statusCode',
          'errorCode'
        ])
      )
    })
  })
})
