import React, {Component} from 'react'
import Header from '../Header'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="notFound">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="not found"
            />
          </div>
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found</p>
        </div>
      </div>
    )
  }
}

export default NotFound
