exports.insertIntoDb = [
  {
    id: '41224d776a326fb40f000003',
    name: 'demo_test'
  },
  {
    "id": "41224d776a326fb40f000004",
    "name": "demo2_test"
  },
  {
    "id": "41224d776a326fb40f000005",
    "name": "demo3_test"
  }

]

exports.postDemo = {
  successPost: {
    name: 'demo_test_post'
  },
  errorPost: {}
}

exports.putDemo = {
  id: '41224d776a326fb40f000003',
  successPut: {
    name: 'demo_test_2',
    type: 'demo'
  },
  failedPut: {
    type: 'new_type'
  }
}

exports.patchDemo = {
  id: '41224d776a326fb40f000003',
  successPatch: {
    name: 'demo_test_3'
  }
}
