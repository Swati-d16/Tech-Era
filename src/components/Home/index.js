import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    isFailed: false,
    isSuccess: false,
    coursesList: [],
  }

  componentDidMount() {
    this.fetchApiDetails()
  }

  fetchApiDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        coursesList: updatedData,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFailed: true})
    }
  }

  render() {
    const {isFailed, isLoading, isSuccess, coursesList} = this.state

    return (
      <div className="home-container">
        <>
          <Header />
          <div className="content">
            {isLoading && (
              <div data-testid="loader" className="spinner">
                <TailSpin
                  height="80"
                  width="80"
                  color="#4fa940"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperClass=""
                  wrapperStyle={{}}
                />
              </div>
            )}
            {isSuccess && (
              <div>
                <h1>Courses</h1>
                <ul className="courses-list">
                  {coursesList.map(each => (
                    <Link
                      to={`/courses/${each.id}`}
                      key={each.id}
                      className="course-link"
                    >
                      <Course details={each} />
                    </Link>
                  ))}
                </ul>
              </div>
            )}
            {isFailed && (
              <div className="error-view">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for</p>
                <button onClick={this.fetchApiDetails} className="retry-button">
                  Retry
                </button>
              </div>
            )}
          </div>
        </>
      </div>
    )
  }
}

export default Home
