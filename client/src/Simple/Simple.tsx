import Rive from '@rive-app/react-canvas'
import React from 'react'
import VEHICLES from './vehicles.riv'

export const Simple = (): React.JSX.Element => <Rive src={VEHICLES} stateMachines="bumpy" />
