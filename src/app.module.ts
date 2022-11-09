import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    MongooseModule.forRoot('mongodb+srv://mike:KxuTWrWs6B9LlWMh@cluster0.xqca7og.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    TodosModule,
    PhotosModule,
    PostsModule,
    CommentsModule,
    ProductsModule,
    LoginModule,
    FilmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
