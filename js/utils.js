export const forEach = (list, callback) => {
    return Array.prototype.forEach.call(list, callback)
}