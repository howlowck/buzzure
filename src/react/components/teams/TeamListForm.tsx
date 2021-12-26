import { FC, useState } from 'react'
import {
  Callout,
  ColorPicker,
  DefaultButton,
  PrimaryButton,
  TextField,
  getColorFromString,
  IColor,
} from '@fluentui/react'
import { useBoolean, useId } from '@fluentui/react-hooks'
import { TeamInfo } from '../../../types'

const red = getColorFromString('#ff0000')!

type Props = {
  teams: TeamInfo[]
  addTeam: (team: TeamInfo) => void
}

const Component: FC<Props> = ({ teams, addTeam }) => {
  const [createTeamName, setCreateTeamName] = useState('')
  const [color, setColor] = useState(red)

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false)
  const buttonId = useId('callout-button')
  const labelId = useId('callout-label')
  const descriptionId = useId('callout-description')

  return (
    <div>
      <h1>Form Teams</h1>
      {teams.map((_) => {
        return (
          <p
            style={{ color: _.color, fontSize: '1.5rem', fontWeight: 'bolder' }}
            key={`${_.name}${_.color}`}
          >
            {_.name}
          </p>
        )
      })}
      <TextField
        label="Team Name"
        value={createTeamName}
        onChange={(evt) => setCreateTeamName(evt.currentTarget.value)}
      />
      <p style={{ color: color.str, fontSize: '1.5rem', fontWeight: 'bolder' }}>
        {createTeamName}
      </p>
      <DefaultButton
        id={buttonId}
        onClick={toggleIsCalloutVisible}
        text={isCalloutVisible ? 'Close Color Picker' : 'Open Color Picker'}
      ></DefaultButton>
      {isCalloutVisible && (
        <Callout
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <ColorPicker
            color={color}
            onChange={(ev: any, colorObj: IColor) => {
              console.log(colorObj)
              setColor(colorObj)
            }}
            alphaType="none"
            showPreview={true}
            strings={{
              hueAriaLabel: 'Hue',
            }}
          />
        </Callout>
      )}
      <PrimaryButton
        onClick={(evt) => {
          const newTeam: TeamInfo = {
            color: color.str,
            name: createTeamName,
          }
          addTeam(newTeam)
          setCreateTeamName('')
        }}
      >
        Add Team
      </PrimaryButton>
    </div>
  )
}

export default Component
