import { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../lib/constants'
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../../graphql/mutations'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
    error: '',
  }

  onChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  confirm = async () => {
    const { name, email, password } = this.state
    try {
      if (this.state.login) {
        const result = await this.props.signinUserMutation({
          variables: {
            email,
            password,
          },
        })
        const { id, token } = result.data.signinUser.user
        this.saveUserData(id, token)
      } else {
        const result = await this.props.createUserMutation({
          variables: {
            name,
            email,
            password,
          },
        })
        const { id, token } = result.data.signinUser.user
        this.saveUserData(id, token)
      }

      this.props.history.push('/recipes')
    } catch (error) {
      console.log('error', error)
      this.setState({ error })
    }
  }

  saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

  toggleLogin = () => {
    this.setState({ login: !this.state.login })
  }

  render() {
    const data = {
      login: this.state.login,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      onChange: this.onChange,
      toggleLogin: this.toggleLogin,
      confirm: this.confirm,
      error: this.state.error,
    }
    return this.props.children(data)
  }
}

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
