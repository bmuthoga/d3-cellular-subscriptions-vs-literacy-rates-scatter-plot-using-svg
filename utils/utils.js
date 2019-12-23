function filterData(obj) {
  let keys = [
    'subscribersPer100',
    'adultLiteracyRate',
    'urbanPopulationRate',
    'medianAge'
  ]

  for (let key of keys) {
    if (obj[key] === null) {
      return false
    }
  }

  return true
}
