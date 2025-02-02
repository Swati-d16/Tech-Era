import React from 'react'
import './index.css'

const Course = ({details}) => {
  const {name, logoUrl} = details

  return (
    <li className="course-item">
      <img src={logoUrl} alt={name} className="course-logo" />
      <p className="course-name">{name}</p>
    </li>
  )
}

export default Course
