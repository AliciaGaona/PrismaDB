# PrismaDB

## DIAGRAMA CON MERMAID EN COSNTRIUCCIÓN

__Ejercicios de práctica LaunchX / NodeJS by Carlo Gilmar:__


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


Validamos que se creo la tabla en SQL


![image](https://user-images.githubusercontent.com/99162884/168952660-9012dee3-5416-4340-bbb2-479572c08168.png)


Paso 7. Automatizando ingresar datos a tabla

Para lograr esto, se crea un seed.js  y se integra el siguiente código:

```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const woopa = await prisma.explorer.upsert({
      where: { name: 'Woopa' },
      update: {},
      create: {
        name: 'Woopa',
				username: 'ajolonauta',
				mission: 'Node'
      },
    });

    const woopa1 = await prisma.explorer.upsert({
      where: { name: 'Woopa1' },
      update: {},
      create: {
        name: 'Woopa1',
				username: 'ajolonauta1',
				mission: 'Node'
      },
    });

    const woopa2 = await prisma.explorer.upsert({
      where: { name: 'Woopa 2' },
      update: {},
      create: {
        name: 'Woopa 2',
				username: 'ajolonauta2',
				mission: 'Java'
      },
    });

    const woopa3 = await prisma.explorer.upsert({
      where: { name: 'Woopa 3' },
      update: {},
      create: {
        name: 'Woopa 3',
				username: 'ajolonauta3',
				mission: 'Node'
      },
    });

    console.log('Create 3 explorers');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

```
_Al correr el archivo se agregan los datos_

![image](https://user-images.githubusercontent.com/99162884/168955870-c917e736-3bb1-45eb-99c6-4c3d38dac009.png)

_Verificando la inserción_

![image](https://user-images.githubusercontent.com/99162884/168957978-754752c7-cf12-4391-b077-6cbce12d3097.png)


# CRUD

1. crear un archivo server.js para ahi comenzar nuestro servidor.

```js

const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

```




Verifica que llega el mensaje:

![image](https://user-images.githubusercontent.com/99162884/168960422-4d34a9b6-9f85-4059-95cf-d379412bf2d7.png)


![image](https://user-images.githubusercontent.com/99162884/168960535-6a013576-54fa-438a-bd6a-cebbd84d192e.png)



2. Agregar endPoint GET que traiga los explorers:

`localhost:3000/explorers`

```js

app.get('/explorers', async (req, res) => {
  const allExplorers =  await prisma.explorer.findMany({});
  res.json(allExplorers);
});

```

Verificar respuesta, nos trae todo los explorers que generamos en nuestra tabla


![image](https://user-images.githubusercontent.com/99162884/169127916-6f4139bc-e846-47c9-afd2-a836d6944862.png)


![image](https://user-images.githubusercontent.com/99162884/169127336-8607bf5a-7221-4890-b6bc-4357d7438caf.png)


3. Agregar endPoint GET que traiga el explorer dependiendo del ID.

`localhost:3000/explorers/1`


```js

app.get('/explorers/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

```


Verificando respuesta, te trae el explorer que contenga ese Id


![image](https://user-images.githubusercontent.com/99162884/169132980-a7e18e1b-2535-4a4d-8a3c-779dc4f278d5.png)


![image](https://user-images.githubusercontent.com/99162884/169132496-60630ba3-ec0d-43ee-81e6-47b1b3a0abcd.png)


3. Crear enpoint POST para crear un nuevo explorer, le mandamos lso parametros por el body

`localhost:3000/explorers/1`

```js
app.post('/explorers', async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission
   };
  const message = 'Explorer creado.';
  await prisma.explorer.create({data: explorer});
  return res.json({message});
});
```


4. Crear endpoint PUT

## GLOSARIO

- Npm es una herramienta que se usa para instalar paquetes.

- Npx es una herramienta que se usa para ejecutar paquetes.

[Documentación de prisma](https://www.prisma.io/docs/concepts/components/prisma-schema)


## Crendo API básica unida a Base de Datos, Postgresql

__Dependencias__

[Documentación Express](https://expressjs.com/es/)

- Prisma

[Documentación Prima](https://www.prisma.io/docs/concepts/components/prisma-schema)


Créditos:

[Guia de ejercicio](https://github.com/LaunchX-InnovaccionVirtual/MissionNodeJS/blob/main/semanas/semana_5/prismadb.md)
