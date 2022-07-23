var assert = require('assert')
const LRU = require('lru-cache')

// At least one of 'max', 'ttl', or 'maxSize' is required, to prevent
// unsafe unbounded storage.
//
// In most cases, it's best to specify a max for performance, so all
// the required memory allocation is done up-front.
//
// All the other options are optional, see the sections below for
// documentation on what each one does.  Most of them can be
// overridden for specific items in get()/set()
const options = {
  max: 500,

  // for use with tracking overall storage size
  maxSize: 5000,
  sizeCalculation: (value, key) => {
    return 1
  },

  // for use when you need to clean up something when objects
  // are evicted from the cache
//   dispose: (value, key) => {
//     freeFromMemoryOrWhatever(value)
//   },

  // how long to live in ms
  ttl: 1000 * 60 * 5,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  // async method to use for cache.fetch(), for
  // stale-while-revalidate type of behavior
  fetchMethod: async (key, staleValue, { options, signal }) => {}
}

const cache = new LRU(options)

cache.set("key", "value")
console.log(cache.get("key")) // "value"


// non-string keys ARE fully supported
// but note that it must be THE SAME object, not
// just a JSON-equivalent object.
var someObject = { a: 1 }
cache.set(someObject, 'a value')
// Object keys are not toString()-ed
cache.set('[object Object]', 'a different value')
assert.equal(cache.get(someObject), 'a value')
// A similar object with same keys/values won't work,
// because it's a different object identity
assert.equal(cache.get({ a: 1 }), undefined)

cache.clear()    // empty the cache