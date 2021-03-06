// @flow
import React from 'react'
import styled from 'styled-components'

import palette from '../../../style/palette'
import { navHeight } from '../../../style/config'

const Wrapper = styled.div`
  height: ${navHeight};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  background-color: ${palette.grey.light};
  width: 100%;
`

const Icon = styled.i`
  color: ${palette.primary.light};
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

type Recipe = {
  id: string,
  name: string,
  description: string,
  pers: number,
  shopFor: number,
  isSelected: boolean,
  isOptimistic: boolean
}

export default ({ recipes, updateRecipeSelect }: { recipes: Recipe[], updateRecipeSelect: Function }) => {
  const handleSelect = (selection) => {
    recipes.map(recipe => updateRecipeSelect(recipe.id, selection))
  }
  return (
    <Wrapper>
      <Icon onClick={() => handleSelect(true)} className='material-icons'>
        clear
      </Icon>
      <Icon onClick={() => handleSelect(false)} className='material-icons'>
        select_all
      </Icon>
    </Wrapper>
  )
}
