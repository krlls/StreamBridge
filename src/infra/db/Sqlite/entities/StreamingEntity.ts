import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm'

import { EStreamingType } from '../../../../types/common'
import { UserEntity } from './UserEntity'
import { PlaylistEntity } from './PlaylistEntity'
import { TrackEntity } from './TrackEntity'

@Entity()
export class StreamingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: true })
  token?: string

  @Column({ type: 'text', nullable: true })
  refresh_token?: string

  @Column({ type: 'text', nullable: true, enum: EStreamingType })
  type: EStreamingType

  @Column({ type: 'int', nullable: true })
  expiresIn?: number

  @ManyToOne(() => UserEntity, (user) => user.streamings, { nullable: false })
  user: UserEntity

  @OneToMany(() => PlaylistEntity, (playslist) => playslist.streaming)
  playlists: PlaylistEntity[]

  @OneToMany(() => TrackEntity, (track) => track.playlist)
  tracks: TrackEntity[]
}
