import React from 'react'
import PropTypes from 'prop-types'

export const Tezt = ({testing, funcao, tezt}) => (
  <div>
    <p> I'll show the text I get from props, which is: {tezt.text} </p>
    <button className='btn btn-primary' onClick={testing}>
        Tezt Button
    </button>
    <br/>
    <p> I'll show the text I get from props, which is: {tezt.outraCoisa} </p>
    <button className='btn btn-secondary' onClick={funcao}>
        Another Tezt Button
    </button>
  </div>
)

Tezt.propTypes = {
  testing: PropTypes.func.isRequired,
  funcao: PropTypes.func.isRequired,
  tezt: PropTypes.object.isRequired
}

export default Tezt
