// ======================================================
// 配置中间件
// ======================================================
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// import { historyMiddleware } from './syncHistoryWithStore'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.unshift(logger)
}

export default middlewares
