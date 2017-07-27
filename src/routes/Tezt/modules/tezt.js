// ------------------------------------
// Constants
// ------------------------------------
export const TEST_CHANGE_TEXT = 'TEST_CHANGE_TEXT';
export const TEST_ACAO = 'TEST_ACAO';

// ------------------------------------
// Actions
// ------------------------------------

export function testing(text) {
  return {
    type      : TEST_CHANGE_TEXT,
    payload   : text
  }
}

export function funcao(text) {
  return {
    type      : TEST_ACAO,
    payload   : text
  }
}

export const actions = {
  testing,
  funcao
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TEST_CHANGE_TEXT]     : (state, action) => ({...state, text: action.payload}),
  [TEST_ACAO]                 : (state, action) => ({...state, outraCoisa: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { text: "texto", outraCoisa: "dasd" }

export default function testReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
