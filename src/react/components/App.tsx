import React, { FC } from 'react'
import { css } from '@emotion/react'
import { PrimaryButton } from '@fluentui/react'
import { Route, Switch } from 'wouter'
import CreateGamePage from './pages/CreateGamePage'
import HomePage from './pages/HomePage'
import JoinGamePage from './pages/JoinGamePage'

const App: FC = () => {
  return (
    <div
      css={css`
        background-color: #efefef;
      `}
    >
      <h1>Buzzure</h1>
      <Switch>
        <Route path="/">{(params) => <HomePage />}</Route>
        <Route path="/games/create">{(params) => <CreateGamePage />}</Route>
        <Route path="/games/:gameId">
          {({ gameId }) => <JoinGamePage gameId={gameId} />}
        </Route>
      </Switch>
    </div>
  )
}

export default App
