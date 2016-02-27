/**
 * Dash Constants -- where user actions are declared
 */
var keyMirror = require('keymirror');

module.exports = keyMirror({
  SEARCH_SUCCESS:      null,
  SEARCH_FAILURE:      null,

  TLOAD_SUCCESS:       null,
  TLOAD_FAILURE:       null,
  
  CLOAD_SUCCESS:       null,
  CLOAD_FAILURE:       null,

  RLOAD_SUCCESS:       null,
  RLOAD_FAILURE:       null,

  GET_USER:            null,
  GET_TRAITS:          null,

  FUZZY_REVIEW_SEARCH: null,
  SET_COURSES:         null,
  
  RATE_COURSE:         null,
  RATE_INSTRUCTOR:     null,
  
  SET_FORM_COURSE:     null,
  SET_FORM_INSTRUCTOR: null,
  
  ADD_REVIEW_TEXT:     null,
  
  ADD_TRAIT:           null,
  REMOVE_TRAIT:        null,

  SEND_REVIEW:         null,
  SEND_TRAITS:         null,
  CLEAR_RFORM:         null

});
