import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { ReactElement, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Status } from '../../../interfaces/Status.interface'
import SHIELDSHULL from './shields-hull.riv'

const ShipStatus = ({ socket }: { socket: Socket }): ReactElement => {
  const { rive, RiveComponent } = useRive({
    src: SHIELDSHULL,
    stateMachines: 'ShipStatus',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  const shieldPercentInput = useStateMachineInput(rive, 'ShipStatus', 'ShieldPercent')
  const hullPercentInput = useStateMachineInput(rive, 'ShipStatus', 'HullPercent')
  const [shieldPercent, setShieldPercent] = useState('0')
  const [hullPercent, setHullPercent] = useState('0')

  useEffect(() => {
    if (!rive || !shieldPercentInput || !hullPercentInput) {
      return
    }

    rive.setTextRunValue('Shield%', shieldPercent)
    shieldPercentInput.value = +shieldPercent
    hullPercentInput.value = +hullPercent
  }, [rive, shieldPercentInput, shieldPercent, hullPercentInput, hullPercent])

  // old demo with timedate
  /*
  useEffect(() => {
    if (!rive || !shieldPercentInput) {
      return
    }

    const interval = setInterval(() => {
      if (!rive) {
        return
      }

      // Getting current time and date
      let time = new Date()
      let hour: string | number = time.getHours()
      let min: string | number = time.getMinutes()
      let sec: string | number = time.getSeconds()
      let am_pm = 'AM'

      // Setting time for 12 Hrs format
      if (hour >= 12) {
        if (hour > 12) hour -= 12
        am_pm = 'PM'
      } else if (hour === 0) {
        hour = 12
        am_pm = 'AM'
      }

      // Analog clock
      if (shieldPercentInput) {
        shieldPercentInput.value = sec * 1.666
      }
      // Displaying the time in text
      // Format time for text display
      hour = hour < 10 ? '0' + hour : hour
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      let newsec1 = +sec * 1.666
      let newsec = Math.trunc(newsec1)
      let currentTime = '' + newsec

      rive.setTextRunValue('Shield%', currentTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [rive, shieldPercentInput])
  */

  useEffect(() => {
    socket.on('status', (status: Status) => {
      const shield = (status.Shield * 100).toFixed(0)
      const hull = (status.Health * 100).toFixed(0)

      console.log(`🚀 ${status.Speed}m/s 🛡 ${shield}% ➕ ${hull}%`)
      setShieldPercent(shield)
      setHullPercent(hull)
    })
  }, [socket])

  return <RiveComponent />
}

export default ShipStatus
