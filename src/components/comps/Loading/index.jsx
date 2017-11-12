// @flow
import * as React from 'react'
import styled from 'styled-components'

import Spinner from './Spinner'

import palette from '../../../style/palette'

const Wrapper = styled.div`
  color: ${palette.textSecondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Message = styled.p`
  text-align: center;
  padding: 80px 0 30px 0;
  width: 100%;
`

export default ({ message = 'loading...', children }: { message?: string, children?: React.Node }) => (
  <Wrapper>
    <Message>{message}</Message>
    {children}
    <Spinner />
  </Wrapper>
)