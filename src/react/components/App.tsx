import React, { FC } from 'react'
import { css } from '@emotion/react'
import { PrimaryButton } from '@fluentui/react'
import { Route } from 'wouter'
import CreateGamePage from './pages/CreateGamePage'
import HomePage from './pages/HomePage'

const App: FC = () => {
  return (
    <div
      css={css`
        background-color: #efefef;
      `}
    >
      <h1>Buzzure</h1>
      <Route path="/games/create">{(params) => <CreateGamePage />}</Route>
      <Route path="/">{(params) => <HomePage />}</Route>
    </div>
  )
}

export default App
