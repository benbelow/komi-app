import { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import isEmail from 'validator/lib/isEmail'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../lib/constants'
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../../graphql/mutations'

class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    error: '',
  }

  onChange = (evt) => {
    this.setState({ error: '' })
    this.setState({ [evt.target.name]: evt.target.value })
  }

  confirm = async (evt) => {
    evt.persist()
    const {
      name, email, password, passwordConfirmation,
    } = this.state
    if (!isEmail(email)) {
      this.setState({ error: 'Your email must be an email address' })
    } else if (password.length < 8) {
      this.setState({ error: 'Your password must be at least 8 characters' })
    } else if (!this.props.newUser) {
      try {
        const result = await this.props.signinUserMutation({
          variables: {
            email,
            password,
          },
        })
        const { id } = result.data.signinUser.user
        const { token } = result.data.signinUser
        this.saveUserData(id, token)
        this.props.history.push('/recipes')
      } catch (error) {
        this.setState({ error: error.message })
        evt.target.blur()
      }
    } else if (name.length < 3) {
      this.setState({ error: 'Your name must be at least 3 characters' })
    } else if (password !== passwordConfirmation) {
      this.setState({ error: 'passwords are different' })
    } else {
      try {
        const result = await this.props.createUserMutation({
          variables: {
            name,
            email,
            password,
          },
        })
        const { id } = result.data.signinUser.user
        const { token } = result.data.signinUser
        this.saveUserData(id, token)
        this.props.history.push('/create-recipe')
      } catch (error) {
        this.setState({ error: error.message })
        evt.target.blur()
      }
    }
  }

  saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

  render() {
    const data = {
      login: this.state.login,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
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
