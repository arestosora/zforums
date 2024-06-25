import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigAsync } from '../../common/config/config';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forRootAsync(DatabaseConfigAsync)],
    providers: [ConfigService]
})
export class DatabaseModule { }
