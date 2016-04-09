import Redis from 'ioredis'
import chalk from 'chalk'

const redis = new Redis('192.168.99.100')

redis.on('error', (error) => {
  console.error(chalk.red('Redis', error))
})

redis.on('connect', () => {
  console.log(chalk.green('Redis server connected'))
})

redis.on('close', () => {
  console.log(chalk.green('Redis server closed'))
})

redis.on('reconnecting', () => {
  console.log(chalk.green('Redis server reconnecting'))
})

redis.on('authError', () => {
  console.erro(chalk.red('auth error'))
})

export default redis

