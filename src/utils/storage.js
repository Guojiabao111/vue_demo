/*
    多个地方会用到本地存储，所以这里就要考虑到将他
    进行封装，以便后期的维护操作
    （本地存储封装模块）
*/
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    // 这里使用try catch是为了判断这个name的值
    // 因为name的值有可能不是JSON格式的
    try {
        // 如果是的话就直接将其转换为js对象返回
        return JSON.parse(data)
    } catch (err) {
        // 这里就不是json格式的，那么就直接原样返回
        return data
    }
}

export const setItem = (name, value) => {
    // 如果对应的value值是一个对象的话就将其转换为字符串的格式
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

export const removeItem = name => {
    // 移除本地存储的token
    window.localStorage.removeItem(name)
}
