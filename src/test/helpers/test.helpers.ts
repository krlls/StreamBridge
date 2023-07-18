import { faker } from '@faker-js/faker'

import { createPatch } from '../../utils/links'
import { Api } from '../../types/TApi'
import { CreateTrackDTO } from '../../modules/music/dtos/CreateTrackDTO'
import { CreatePlaylistDTO } from '../../modules/music/dtos/CreatePlaylistDTO'
import { EStreamingType } from '../../types/common'
import { CreateStreamingDTO } from '../../modules/streaming/dtos/CreateStreamingDTO'
import { ITrackApi } from '../../infra/clients/StreamingClient/Spotify/interfaces/ISpotifyApi'

export const userUrl: (...args: string[]) => string = createPatch.bind(null, Api.User.PREFIX)
export const authUrl: (...args: string[]) => string = createPatch.bind(null, Api.Auth.PREFIX)
export const streamingUrl: (...args: string[]) => string = createPatch.bind(null, Api.Streaming.PREFIX)
export const testUserData = {
  login: 'Ksmi',
  name: 'Kirill',
  pass: '123',
}

export const testPlaylistDTO = (userId: number, streamingId: number) =>
  new CreatePlaylistDTO({
    userId,
    name: 'Test playlist',
    externalId: '65FD4G65SF',
    streamingId,
  })

export const testTrackDTO = (userId: number, playlistId: number) =>
  new CreateTrackDTO({
    userId,
    playlistId,
    externalId: 'AAAAAAAAA',
    name: 'Test track',
    artist: 'Test artist',
    album: 'Test album',
  })

export const testStreamingDTO = (userId: number) =>
  new CreateStreamingDTO({
    userId,
    token: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    type: EStreamingType.SPOTIFY,
  })

export const getRandomTracks = ({ userId, playlistId }: { userId: number, playlistId: number }, size: number) =>
  new Array(size).fill(null).map(
    () =>
      new CreateTrackDTO({
        userId,
        playlistId,
        externalId: faker.string.uuid(),
        name: faker.music.songName(),
        artist: faker.person.fullName(),
        album: faker.lorem.words({ min: 1, max: 3 }),
      }),
  )

export const PLAYLISTS = 10
export const TRACKS = 150

export const fakeApi = {
  getPlaylists: (offset: number, _token?: string) =>
    new Promise<Array<{ name: string, id: string, num: number }>>((resolve) =>
      resolve(mockPlaylists.slice(offset, offset + 50)),
    ),
  getTracks: (playlist: string, offset: number) =>
    new Promise<ITrackApi[]>((resolve) => {
      const tracks = mockTracks.get(playlist)
      !tracks ? resolve([]) : resolve(tracks.slice(offset, offset + 50))
    }),
}

export const mockPlaylists = Array(PLAYLISTS)
  .fill(null)
  .map((_e, i) => ({
    num: i,
    name: faker.lorem.words({ min: 1, max: 3 }),
    id: faker.string.uuid(),
  }))

export const mockTracks = new Map<string, ITrackApi[]>()

mockPlaylists.forEach((p) =>
  mockTracks.set(
    p.id,
    Array(TRACKS)
      .fill(null)
      .map((_e, i) => ({
        num: i,
        id: faker.string.uuid(),
        name: faker.music.songName(),
        album: p.name,
        artist: faker.person.fullName(),
      })),
  ),
)
