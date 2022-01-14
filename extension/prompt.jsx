import browser from 'webextension-polyfill'
import {render} from 'react-dom'
import React from 'react'

import {getAllowedCapabilities} from './common'

function Prompt() {
  let qs = new URLSearchParams(location.search)
  let id = qs.get('id')
  let host = qs.get('host')
  let level = parseInt(qs.get('level'))

  return (
    <>
      <div>
        <b style={{display: 'block', textAlign: 'center', fontSize: '200%'}}>
          {host}
        </b>{' '}
        <p>is requesting your permission to </p>
        <ul>
          {getAllowedCapabilities(level).map(cap => (
            <li key={cap}>
              <i style={{fontSize: '140%'}}>{cap}</i>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}
      >
        <button
          style={{marginTop: '5px'}}
          onClick={authorizeHandler('forever')}
        >
          authorize forever
        </button>
        <button
          style={{marginTop: '5px'}}
          onClick={authorizeHandler('expirable')}
        >
          authorize for 5 minutes
        </button>
        <button style={{marginTop: '5px'}} onClick={authorizeHandler('single')}>
          authorize just this
        </button>
        <button style={{marginTop: '5px'}} onClick={authorizeHandler('no')}>
          cancel
        </button>
      </div>
    </>
  )

  function authorizeHandler(condition) {
    return function (ev) {
      ev.preventDefault()
      browser.runtime.sendMessage({
        prompt: true,
        id,
        host,
        level,
        condition
      })
    }
  }
}

render(<Prompt />, document.getElementById('main'))
