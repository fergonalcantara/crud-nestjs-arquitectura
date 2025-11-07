import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { CarrosModule } from './carros/carros.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MySecretRootMySQL', // Cambia esto por tu contraseña de MySQL
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo - crea tablas automáticamente
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsuariosModule,
    MascotasModule,
    CarrosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
