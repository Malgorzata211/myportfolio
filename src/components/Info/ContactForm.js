import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'whatwg-fetch' // Fetch Polyfill
import Recaptcha from 'react-google-recaptcha'
import NetlifyForm from 'react-netlify-form'

const Form = styled.form`
  margin: 0 2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    border: 2px solid ${props => props.theme.colors.tertiary};
    outline: none;
    background: ${props => props.theme.colors.base};
    color: ${props => props.theme.colors.secondary};
    border-radius: 2px;
    padding: 1rem;
    &::-webkit-input-placeholder {
      color: gray;
    }
    &::-moz-placeholder {
      color: gray;
    }
    &:-ms-input-placeholder {
      color: gray;
    }
    &:-moz-placeholder {
      color: gray;
    }
    &:required {
      box-shadow: none;
    }
    &:focus {
      outline: none;
    }
    &:-webkit-autofill {
      box-shadow: inset 0 0 0 9999px ${props => props.theme.colors.base};
    }
  }
  &::before {
    content: '';
    background: black;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: 0.2s all;
    opacity: ${props => (props.overlay ? '.8' : '0')};
    visibility: ${props => (props.overlay ? 'visible' : 'hidden')};
  }
`

const Name = styled.input`
  margin: 0 0 2rem 0;
  width: 100%;
  @media (min-width: ${props => props.theme.responsive.small}) {
    width: 48%;
  }
`

const Email = styled.input`
  margin: 0 0 2rem 0;
  width: 100%;
  @media (min-width: ${props => props.theme.responsive.small}) {
    width: 48%;
  }
`

const Message = styled.textarea`
  width: 100%;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  min-height: 250px;
  resize: vertical;
`

const Submit = styled.input`
  background: ${props => props.theme.colors.tertiary} !important;
  color: ${props => props.theme.colors.base} !important;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  &:hover {
    border: 2px solid ${props => props.theme.colors.highlight} !important;
    background: ${props => props.theme.colors.highlight} !important;
  }
  @media (min-width: ${props => props.theme.responsive.medium}) {
    width: 48%;
  }
`

const Modal = styled.div`
  background: white;
  padding: 2em;
  border-radius: 2px;
  position: fixed;
  min-width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 99;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  transition: 0.2s all;
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    min-width: inherit;
    max-width: 400px;
  }
  p {
    line-height: 1.6;
    margin: 0 0 2em 0;
  }
`

const Button = styled.div`
  background: ${props => props.theme.colors.tertiary} !important;
  font-size: 1em;
  display: inline-block;
  margin: 0 auto;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1em;
  border: 2px;
  text-decoration: none;
  transition: 0.2s;
  z-index: 99;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${props => props.theme.colors.highlight} !important;
  }
`

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      showModal: false,
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(this.handleSuccess)
      .catch(error => alert(error))
    event.preventDefault()
  }

  handleSuccess = () => {
    this.setState({
      name: '',
      email: '',
      message: '',
      showModal: true,
    })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <NetlifyForm
        name="Contact"
        recaptcha={{
          sitekey:
            process.env.SITE_RECAPTCHA_KEY ||
            '6LdK9G4UAAAAAOtiFibpaDHJKmrjwlzere3rTrdw',
          size: 'invisible',
        }}
      >
        {({ loading, error, recaptchaError, success, recaptcha }) => (
          <>
            {loading && <p>Loading...</p>}
            {error && (
              <p>Your information was not sent. Please try again later.</p>
            )}
            {recaptchaError && (
              <p>
                Recaptcha did not match. Please make sure the box is checked.
              </p>
            )}
            {success && <p>Thank you for contacting us!</p>}
            {!loading &&
              !success && (
                <Form>
                  <Name
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={this.state.name}
                    required
                  />
                  <Email
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    required
                  />
                  <Message
                    name="message"
                    type="text"
                    placeholder="Message"
                    value={this.state.message}
                    required
                  />
                  <Submit name="submit" type="submit" value="Send" />
                </Form>
              )}
            {/* Invisible reCAPTCHA must be kept outside of conditionals */}
            {recaptcha}
          </>
        )}
      </NetlifyForm>
    )
  }
}

ContactForm.propTypes = {
  data: PropTypes.object,
}

export default ContactForm
