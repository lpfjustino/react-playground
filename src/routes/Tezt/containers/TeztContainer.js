import { connect } from 'react-redux'
import { testing } from '../modules/tezt'
import { funcao } from '../modules/tezt'

import Tezt from '../components/Tezt'

const mapDispatchToProps = {
  testing : () => testing("AAA"),
  funcao : () => funcao("bbb")
}

const mapStateToProps = (state) => ({
  tezt : state.whatever
})

export default connect(mapStateToProps, mapDispatchToProps)(Tezt)
