import Router from 'next/router'
import axios from 'axios'
import React from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { getDisplays } from '../actions/display'

export const login = ({ username, password }, host = '', displayId) => {
  return axios.post(host + '/api/v1/user/login', { username, password }).then(res => {
    if (res && res.data && res.data.success) {
      Router.push('/layout' + (displayId ? '?display=' + displayId : ''))
      window.location.href = '/layout' + (displayId ? '?display=' + displayId : '')
    }
    return res.data
  })
}

export const logout = (host = '') => {
  return axios.get(host + '/api/v1/user/logout').then(res => {
    if (res && res.data) {
      destroyCookie({}, 'loggedIn')
      Router.push('/login')
      window.location.href = '/login'
    }
    return res.data
  })
}

export const protect = Component =>
  class ProtectedPage extends React.Component {
    static async getInitialProps(ctx) {
      const { req, res, query } = ctx
      const alreadyLoggedIn = parseCookies(ctx).loggedIn
      let host
      if (req) {
        // Server-side: use localhost to avoid external domain resolution issues
        const Keys = require('../keys')
        host = `http://localhost:${Keys.PORT}`
      } else {
        // Client-side: use current origin
        host = typeof window !== 'undefined' ? window.location.origin : ''
      }

      if ((req && req.user) || alreadyLoggedIn) {
        if (!alreadyLoggedIn) {
          setCookie(ctx, 'loggedIn', true, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          })
        }

        let displayId = query && query.display

        if (!displayId) {
          try {
            const displayList = await getDisplays(host)
            if (displayList && displayList.length > 0) {
              displayId = displayList[0]._id
            }
          } catch (error) {
            console.error('Error fetching displays:', error.message)
          }
        }

        const props = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}
        return {
          ...props,
          displayId,
          host,
          loggedIn: true
        }
      } else {
        if (req) {
          res.writeHead(302, { Location: '/login' })
          res.end()
        } else {
          Router.push('/login')
        }
        return {}
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
