import React, {Component} from 'react'

import Header from '../Header'

import TailSpin from 'react-loader-spinner'

import './index.css'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItemDetails extends Component {
  state = {isLoading: true, isFailed: false, isSuccess: false, ItemDetails: {}}

  componentDidMount() {
    this.fetchCourseDetails()
  }

  fetchCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const updateCourse = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        isLoading: false,
        isFailed: false,
        isSuccess: true,
        ItemDetails: updateCourse,
      })
    } else {
      this.setState({isLoading: false, isFailed: true, isSuccess: false})
    }
  }
  render() {
    const {isLoading, isFailed, isSuccess, ItemDetails} = this.state
    const {description, name, imageUrl} = ItemDetails
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass=""
                wrapperStyle={{}}
              />
            </div>
          )}
          {isSuccess && (
            <div className="itemDetails">
              <div>
                <img src={imageUrl} alt={name} />
              </div>
              <div>
                <h1>{name}</h1>
                <p>{description}</p>
              </div>
            </div>
          )}
          {isFailed && (
            <div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                />
              </div>
              <h1>Oops! Something Went wRONG</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <div>
                <button type="button" onClick={this.fetchCourseDetails}>
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CourseItemDetails

/*
import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItemDetails extends Component {
  state = {course: {}, ap: apStatus.initial}

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({ap: apStatus.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'Get',
    }
    const res = await fetch(url, options)
    if (res.ok === true) {
      const dat = await res.json()
      const updateCourse = {
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }
      this.setState({course: updateCourse, ap: apStatus.success})
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  successView = () => {
    const {course} = this.state
    return (
      <div className="cr">
        <div>
          <img src={course.imageUrl} alt={course.name} />
          <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failView = () => (
    <div>
      <Link to="/" className="link-el">
        <navbar>
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </navbar>
      </Link>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went wRONG</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.getItem}>
          Retry
        </button>
      </div>
    </div>
  )

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView()
      case apStatus.fail:
        return this.failView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link-el">
          <navbar>
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </navbar>
        </Link>
        <div>{this.finalRender()}</div>
      </div>
    )
  }
}

export default CourseItemDetails

*/
