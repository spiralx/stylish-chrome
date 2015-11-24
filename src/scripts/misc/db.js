

function readAllStyles(db) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM styles',
        [],
        (tx, results) => {
          resolve([...results.rows])
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}


readAllStyles(sdb)
  .then(data => {
    console.table(data)
    window.data = data
  })
  .catch(err => {
    console.error(err)
  })

