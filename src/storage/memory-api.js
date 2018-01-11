let storage = {}

module.exports = {
  get(key, callback) {
    callback(null, storage[key])
  },
  set(key, value, callback) {
    storage[key] = value
    callback(null, storage)
  },
  has(key, callback) {
    callback(null, !!storage[key])
  },
  entries(callback) {
    const entries = Object.keys(storage).map(key => [key, storage[key]])
    callback(null, entries)
  },
  clear(callback) {
    storage = {}
    callback(null, storage)
  },
  delete(key, callback) {
    delete storage[key]
    callback(null, storage)
  },
}
