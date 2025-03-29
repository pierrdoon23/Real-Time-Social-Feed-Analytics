import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './modules/user/entities/user.entity'
import { RateLimit } from './modules/auth/entities/rate-limit.entity'
import { RefreshToken } from './modules/auth/entities/refresh-token.entity'
import { Webhook } from './modules/events/entities/webhook.entity'
import { WebSocketSubscription } from './modules/websocket/websocket-subscription.entity'
import { EventsModule } from './modules/events/events.module'
import { Event } from './modules/events/entities/event.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Event, RefreshToken, RateLimit, Webhook, WebSocketSubscription],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
    }),
    UserModule,
    EventsModule
  ],
})
export class AppModule {}
