import { Module } from '@nestjs/common';
import { TodoModule } from './book/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './book/data/user.entity';
import { Tasks } from './book/data/task.entity';
import { usertask } from './book/data/UserTask.entity';
import { DataSource } from 'typeorm';
import { State } from './book/data/state.entity';


@Module({
  imports: [TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: '123abc!!',
      database: 'todo',
      entities: [Users,Tasks,State,usertask],
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
constructor(private dataSource:DataSource){}
}