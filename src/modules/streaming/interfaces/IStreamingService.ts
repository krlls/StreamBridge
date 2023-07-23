import { EStreamingType, ServiceResultDTO } from '../../../types/common'
import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { LoginUrlDTO } from '../dtos/LoginUrlDTO'
import { CreateLoginUrlDTO } from '../dtos/createLoginUrlDTO'
import { SaveStreamingTokenDTO } from '../dtos/SaveStreamingTokenDTO'
import { StreamingDTO } from '../dtos/StreamingDTO'

export interface IStreamingService {
  createStreaming(steamingData: CreateStreamingDTO): Promise<ServiceResultDTO<Streaming>>,
  getLoginUrl(data: CreateLoginUrlDTO): Promise<ServiceResultDTO<LoginUrlDTO>>,
  saveToken(data: SaveStreamingTokenDTO): Promise<ServiceResultDTO<{ status: string }>>,
  getUserStreamings(userId: number): Promise<ServiceResultDTO<StreamingDTO[]>>,
  removeStreamingByType(userId: number, streamingType: EStreamingType): Promise<ServiceResultDTO<{ deleted: number }>>,
  // getStreaming(userId: number, streamingType: string): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingById(steamingId: number): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingsByUserId(userId: number): Promise<ServiceResultDTO<Streaming[]>>,
}
