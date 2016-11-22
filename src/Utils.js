// Utils.js

// ====================
// Dependencies
// ====================
import $ from 'jquery'
// const API_URL = 'http://api.remixology.io'
const API_URL = 'http://localhost:7000'


// ====================
// Exports
// ====================
export function queryApi(uri, type, body, headers) {
  return $.ajax({
    url: API_URL + uri,
    // contentType: 'application/json',
    method: type,
    dataType: 'json',
    data: body,
  })
}
