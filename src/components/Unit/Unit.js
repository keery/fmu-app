import PropTypes from 'prop-types'
import React, { Component } from 'react'


class Unit extends Component {
    state = { 
        id: '',
        name: '',
        quantity : '',
        referenceUnit : ''
    }

    render() {
        return (
            <div></div>
        )
    }
}

Unit.propTypes = {
  guesses: PropTypes.number.isRequired,
}

export default Unit