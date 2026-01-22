import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PORT } from './plugins/env'

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: '',
})

redis.on('connect', () => {
  console.log('Connected to Redis')
})

redis.on('error', (err) => {
  console.error('Redis connection error:', err)
})

async function testRedis() {
  try {
    await redis.set('testKey', 'Hello, Redis!')
    const value = await redis.get('testKey')
    console.log('Retrieved from Redis:', value)
  } catch (error) {
    console.error('Error testing Redis:', error)
  } finally {
    redis.quit()
  }
}

testRedis()
