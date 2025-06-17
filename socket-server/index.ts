import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT || 4000

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.head('/ping', (req, res) => {
  res.status(200).send({ message: 'Server is running!' })
})

io.on('connection', (socket) => {
  console.log(`User connected:,${socket.id} `)

  socket.on('chat message', (msg: string) => {
    console.log(`Message received: ${msg}`)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`)
})
