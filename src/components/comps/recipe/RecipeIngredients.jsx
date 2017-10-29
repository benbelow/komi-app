// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ListWrapper } from '../layouts'
import { EmptyList } from '../loading'

const IngredientItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  padding: 14px;
`

const IngredientName = styled.div`
  width: 64%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const IngredientInfo = styled.div`
  width: 36%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const IngredientQuantity = styled.div`
  width: 38%;
  text-align: end;
`

const IngredientNature = styled.div`
  width: 56%;
  text-align: end;
`

type IngredientType = {
  id: string,
  name: string,
  nature?: 'g' | 'kg' | 'ml' | 'l' | 'item',
  quantity?: number
}

type PropType = { ingredients: IngredientType[], match: { params: { id: string } } }

export default ({ ingredients, match }: PropType) => {
  if (ingredients.length < 1) {
    return (
      <EmptyList>
        <Link to={`/recipe/${match.params.id}/ingredients/new`}>
          <p>add an ingredient</p>
        </Link>
      </EmptyList>
    )
  }
  return (
    <ListWrapper>
      {ingredients.map(ingredient => (
        <IngredientItemWrapper key={ingredient.id}>
          <IngredientName>{ingredient.name}</IngredientName>
          <IngredientInfo>
            <IngredientQuantity>{ingredient.quantity}</IngredientQuantity>
            <IngredientNature>{ingredient.nature}</IngredientNature>
          </IngredientInfo>
        </IngredientItemWrapper>
      ))}
    </ListWrapper>
  )
}
