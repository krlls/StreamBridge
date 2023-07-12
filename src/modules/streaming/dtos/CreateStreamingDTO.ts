import { EStreamingType } from '../../../types/common'

export class CreateStreamingDTO {
  userId: number
  token?: string
  reefreshToken?: string
  type: EStreamingType

  constructor(streaming: { token: string, userId: number, refreshToken: string, type: EStreamingType }) {
    this.token = streaming.token
    this.reefreshToken = streaming.refreshToken
    this.type = streaming.type
    this.userId = streaming.userId
  }
}
