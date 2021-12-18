import React, { FC } from 'react'
import { css } from '@emotion/react'
import { PrimaryButton } from '@fluentui/react'

const App: FC = () => {
  return (
    <div
      css={css`
        background-color: #efefef;
      `}
    >
      <h1>Hello</h1>
      <PrimaryButton>Greeting</PrimaryButton>
    </div>
  )
}

export default App
