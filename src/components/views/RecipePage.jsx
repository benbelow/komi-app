import React from 'react'
import { Route, Switch, matchPath } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'

import styled from 'styled-components'

// containers
import RecipeIngredientsData from '../containers/RecipeIngredientsData'
import RecipeInfoData from '../containers/RecipeInfoData'
import RecipeStepsData from '../containers/RecipeStepsData'
// components
import { PageWrapper } from '../comps/layouts'
// import { FloatingButtonAdd } from '../comps/buttons'
import Loading from '../comps/Loading'
import { RecipeInfo, RecipeSteps, RecipeIngredients, RecipeNav } from '../comps/recipe'
import { SlideTransition, SlideComp } from '../comps/animations/Slide'
import palette from '../../style/palette'

const Wrapper = styled(PageWrapper)`background-color: ${palette.grey.dark};`

const FixedWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2px;
  border: none;
  width: 100%;
  height: calc(100% - 102px);
`

const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const LoadingWrapper = styled.div`
  height: calc(100vh - 104px);
  width: 100%;
  background-color: ${palette.grey.lighter};
`

export default ({ location, match }) => {
  const recipeId = match.params.id

  return (
    <Wrapper>
      <RecipeNav />
      <TransitionGroup>
        <SlideTransition key={`recipePage-${location.key}`}>
          {status => (
            <Switch location={location}>
              <Route
                exact
                path='/recipe/:id/ingredients'
                render={({ history }) => (
                  <FixedWrapper>
                    <ContentWrapper>
                      <SlideComp
                        status={status}
                        historyPath={history.location.pathname}
                        from={history.location.state && history.location.state.from}
                      >
                        <RecipeIngredientsData
                          recipeId={recipeId}
                          loadingComp={
                            <LoadingWrapper>
                              <Loading message='loading ingredients...' />
                            </LoadingWrapper>
                          }
                        >
                          {({ ingredients, deleteIngredient }) => (
                            <RecipeIngredients
                              ingredients={ingredients}
                              deleteIngredient={deleteIngredient}
                              recipeId={recipeId}
                            />
                          )}
                        </RecipeIngredientsData>
                      </SlideComp>
                    </ContentWrapper>
                  </FixedWrapper>
                )}
              />

              <Route
                exact
                path='/recipe/:id/info'
                render={({ history }) => {
                  const matchRecipeIngredientsLocationPath = matchPath(history.location.pathname, {
                    path: '/recipe/:id/ingredients',
                    exact: true,
                    strict: false,
                  })

                  const matchRecipeIngredientsFromPath = matchPath(
                    history.location.state && history.location.state.from,
                    {
                      path: '/recipe/:id/ingredients',
                      exact: true,
                      strict: false,
                    }
                  )
                  return (
                    <FixedWrapper>
                      <ContentWrapper>
                        <SlideComp
                          status={status}
                          historyPath={history.location.pathname}
                          from={history.location.state && history.location.state.from}
                          reverse={matchRecipeIngredientsLocationPath || matchRecipeIngredientsFromPath}
                        >
                          <RecipeInfoData
                            recipeId={recipeId}
                            loadingComp={
                              <LoadingWrapper>
                                <Loading message='loading info...' />
                              </LoadingWrapper>
                            }
                          >
                            {({ recipe, updateRecipe }) => <RecipeInfo recipe={recipe} updateRecipe={updateRecipe} />}
                          </RecipeInfoData>
                        </SlideComp>
                      </ContentWrapper>
                    </FixedWrapper>
                  )
                }}
              />

              <Route
                exact
                path='/recipe/:id/preparation'
                render={({ history }) => (
                  <FixedWrapper>
                    <ContentWrapper>
                      <SlideComp
                        status={status}
                        historyPath={history.location.pathname}
                        from={history.location.state && history.location.state.from}
                        reverse
                      >
                        <RecipeStepsData
                          recipeId={recipeId}
                          loadingComp={
                            <LoadingWrapper>
                              <Loading message='loading steps...' />
                            </LoadingWrapper>
                          }
                        >
                          {steps => <RecipeSteps steps={steps} recipeId={recipeId} />}
                        </RecipeStepsData>
                      </SlideComp>
                    </ContentWrapper>
                  </FixedWrapper>
                )}
              />
            </Switch>
          )}
        </SlideTransition>
      </TransitionGroup>
    </Wrapper>
  )
}
