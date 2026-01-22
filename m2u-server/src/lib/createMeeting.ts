import {
  ZOOM_ACCOUNT_ID,
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
} from '../plugins/env'

import base64 from 'base-64'
import axios from 'axios'
import { generateSecureRandomString } from './functions'
import { combineDateAndTime } from '../utils'

interface Data {
  startTime: string
  endTime: string
  date: string
}

const generateZoomAccessToken = async () => {
  try {
    const response: { data: { access_token: string } } = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
      null,
      {
        headers: {
          Authorization: `Basic ${base64.encode(
            `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`,
          )}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response?.data?.access_token
  } catch (error) {
    throw error
  }
}

export const generateZoomMeeting = async (data: Data, users: string[]) => {
  try {
    const zoomAccessToken = await generateZoomAccessToken()
    const response = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings`,
      {
        agenda: 'Doctor consultation meeting',
        default_password: false,
        duration: 20,
        password: generateSecureRandomString(),
        settings: {
          host_video: true,
          waiting_room: true,
          auto_ending: true,
          jbh_time: 0,
          participant_video: true,
          allow_multiple_devices: true,
          breakout_room: {
            enable: true,
            rooms: [
              {
                name: 'room1',
                participants: users.map((p: string) => p),
              },
            ],
          },
          calendar_type: 1,
          contact_email: 'mobilab2u@gmail.com',
          contact_name: 'Mobilab2u',
          email_notification: true,
          encryption_type: 'enhanced_encryption',
          focus_mode: true,
          join_before_host: true,
          meeting_authentication: true,
          meeting_invitees: users.map((u) => ({ email: u })),
          mute_upon_entry: true,
          private_meeting: true,
          approval_type: 1,
          registration_type: 2,
          watermark: false,
          continuous_meeting_chat: {
            enable: true,
          },
        },
        start_time: combineDateAndTime(data.date, data.startTime),
        end_time: combineDateAndTime(data.date, data.endTime),
        timezone: 'Asia/Kuala_Lumpur',
        topic: 'Doctor consultation meeting',
        type: 2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${zoomAccessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}
