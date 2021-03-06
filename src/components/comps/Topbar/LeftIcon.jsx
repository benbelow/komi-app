// @flow
import React from 'react'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import facepaint from 'facepaint'
import { FadeTransition, FadeComp } from '../animations/Fade'

const mq = facepaint(['@media(min-width: 420px)', '@media(min-width: 920px)'])

const Icon = styled(FadeComp)`
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${mq({
    width: ['50px;', '60px', '70px'],
  })};
`

export default ({ menuIsOpen, toggleMenu }: { menuIsOpen: boolean, toggleMenu: Function }) => (
  <TransitionGroup>
    <FadeTransition key={menuIsOpen ? 'back' : 'menu'}>
      {(status: string) =>
        (menuIsOpen ? (
          <Icon status={status} onClick={toggleMenu}>
            <i className='material-icons'>arrow_back</i>
          </Icon>
        ) : (
          <Icon status={status} onClick={toggleMenu}>
            <i className='material-icons'>menu</i>
          </Icon>
        ))}
    </FadeTransition>
  </TransitionGroup>
)
