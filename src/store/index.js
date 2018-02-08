// i am redux store

import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from '@/reducer'
import middlewares from './middlewares'
// import enhancers from './enhancers'
// import syncHistoryWithStore from './syncHistoryWithStore'
let enhancers = []

// ======================================================
// 实例化 Store
// ======================================================
const store = createStore(
    createRootReducer(),
    window.__INITIAL_STATE__ || {
        // 分类的数组
        category: category replace me,
        // 所有的文章列表
        article: article replace me,
    }, // 前后端同构（服务端渲染）数据同步
    compose(
        applyMiddleware(...middlewares),
        ...enhancers
    )
)

if (module.hot) {
    module.hot.accept('../reducer', () => {
        const nextRootReducer = require('../reducer/index');
        store.replaceReducer(nextRootReducer);
    });
}

export default store

// ======================================================
// 增强版 history
// ======================================================
// export const history = syncHistoryWithStore(store)
