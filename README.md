# PrismaDB

## DIAGRAMA CON MERMAID EN COSNTRIUCCIÓN


Paso 1. __Inicializamos nuestro proyecto:__

[Pasos para instalar](https://aliciagaona.github.io/my_launchx_blog/posts/pasosparainicializarnodejs/)

Paso 2. __Instalamos express__

npm install express --save-dev

Paso 3. __Instalamos prisma__

npm install prisma --save-dev

Paso 3.1. Inicializamos prisma ¨ npx prisma init ¨

Paso 4. Asegurarnos de tener una base de datos creada, en este caso usaremos postprogresql


Paso 5. Crear un archivo  _.env_ - ahi declararemos nuestro usuario, nombre de BD y pasword, _el archivo .env ayuda mantener información delicada como contraseñas, usuarios o token, se quedan en tu local, y solo se usan para acceder._


Paso 6. Al instalar e inicializar prisma te crea esta carpeta, con el archivo llamado /schema.prisma


__Agregando mi primer BD desde prisma__


![image](https://user-images.githubusercontent.com/99162884/168946441-da775974-83cd-4e00-9775-cc02048209c2.png)

Es la forma de declarar una nueva tabla de SQL usando prisma.

model Explorer {
  nombre de campo / Tipo 
}

 - Versionamos este nuevo modelo como un cambio (como en git), a los versionamientos en prisma  se les llema  __migrations__ , se usa el comando _npx prisma migrate dev --name init_


![image](https://user-images.githubusercontent.com/99162884/168948404-b5183f77-a04f-4fb2-b8d0-347fd6461915.png)

prisma/migrations/ - se creará esta carpeta donde se gurdará el archivo  SQL creado junto con el código, quederá algo asi:

![image](https://user-images.githubusercontent.com/99162884/168948770-9917d6a6-0f85-491c-a420-1d75dcc3ecfa.png)



## GLOSARIO

- Npm es una herramienta que se usa para instalar paquetes.

- Npx es una herramienta que se usa para ejecutar paquetes.

[Documentación de prisma](https://www.prisma.io/docs/concepts/components/prisma-schema)


## Crendo API básica unida a Base de Datos, Postgresql

__Dependencias__

[Documentación Express](https://expressjs.com/es/)

- Prisma

[Documentación Prima](https://www.prisma.io/docs/concepts/components/prisma-schema)
