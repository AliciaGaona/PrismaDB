# PrismaDB

## __Ejercicios de práctica LaunchX / NodeJS by Carlo Gilmar:__ 


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


![image](https://user-images.githubusercontent.com/99162884/169932256-3e26dc52-f7c2-49cb-b8c8-bc1af5f1ffa1.png)


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


Verificar respuesta, mensaje de creación de nuevo explorer


![image](https://user-images.githubusercontent.com/99162884/169217722-159b9f22-d7ae-4055-bde9-828b2e37c363.png)


4. Crear endpoint PUT, según el ID que recibe , va a actualizar ese explorer

`localhost:3000/explorers/:id`

```js

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

```
Verificando en Postman

![image](https://user-images.githubusercontent.com/99162884/169218592-2e9b3b5a-e99d-4cf1-94c5-55384416e1b9.png)


5. Creando un endPoint DELETE, que con ID borre un dato

`localhost:3000/explorers/:id`

```js

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

```

Verificando respuesta

 ![image](https://user-images.githubusercontent.com/99162884/169218964-a156c1d6-4976-430b-ac4a-611d8afe3379.png)




| TIPO | URL|
| ------------ | ------- |
| GET | `localhost:3000/explorers` |
|  GET | `localhost:3000/explorers/1` |
| POST  | `localhost:3000/explorers/1` |
|  PUT | `localhost:3000/explorers/:id` |
|  DELETE | `localhost:3000/explorers/:id` |




---

#EJERCICIO PARA PRÁCTICAR LO APRENDIDO ANTERIORMENTE

Instrucciones crea una nueva tabla en tu base de datos y  crea una API  con CRUD, para utilizar esos datos creados.


| Campo | Tipo de Dato|
| ------------ | ------- |
|  id        | Integer (autogenerado) |
| name| String |
|  lang     | String |
| missionCommander   |  String  |
|  enrollments | Integer  |
|  hasCertification | Boolean  |


1. Agrego nuevo modelo al  `schema.prisma` prisma para crear tabla en mi db.


![image](https://user-images.githubusercontent.com/99162884/169929119-7b6f8bd3-cf06-41cd-84f8-bc934f308a96.png)


2. Corro este comando para que prisma agregue el modelo como una nueva tabla en la bd.

`npx prisma migrate dev --name init`


![image](https://user-images.githubusercontent.com/99162884/169929253-00c73bf6-e144-4cd1-b06e-c93ae04cfc17.png)


![image](https://user-images.githubusercontent.com/99162884/169933950-ee2d459b-adf9-4f20-b6ab-78de552027a9.png)


Reviso si se creo la tabla


![image](https://user-images.githubusercontent.com/99162884/169932466-d5bf336a-1bcd-4e54-af48-29c8fa3a0ef8.png)


3. Insertar registros a la tabla ExplorerInfo



Probando  enpoints nuevos CRUD que usa datos de nuestra nueva tabla

Get- Trae todos los registros:

![image](https://user-images.githubusercontent.com/99162884/169942037-7b6e289f-3cbd-4316-a22a-cce39358cbd7.png)


![image](https://user-images.githubusercontent.com/99162884/169942052-51ecd56a-2930-4545-8356-45fce02edc3b.png)


Get por id- trae todo lo de ese idr:

![image](https://user-images.githubusercontent.com/99162884/169941877-56141a41-0ead-4a9f-a66d-bb20cb26603d.png)


![image](https://user-images.githubusercontent.com/99162884/169941940-440b84d8-949e-4db7-99cc-31a673fc1ba9.png)


Post - crear un nuevo registro



## __Conectar a un cliente__

Se realiza fork a repo proporcionada con proyecto de vue listo para recibir la información 

[Fork](https://github.com/AliciaGaona/client-launchx/)
[Proyecto original](https://github.com/visualpartnership/client-launchx)


1. Preparamos nuestro servidor, intalamos dependencia cors, esta la usaremos para permitir que nuestra API sea utilizada por cin cliente, usando Control de acceso HTTP (CORS)

[Documentación Cors](https://www.npmjs.com/package/cors)

- Comando para instalar - `npm install cors --save`

Modificamos la configuración de nuestro servidor para utilizar CORS.


```js

const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');//prisma es nuestro cliente
const prisma = new PrismaClient();

//cors
const cors = require("cors");

const corsOptions={
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


```

Corremos nuestro servidor:

![image](https://user-images.githubusercontent.com/99162884/171311276-13ea4a74-956f-49c1-b3ef-818180194eca.png)

Corremos nuestro cliente:

![image](https://user-images.githubusercontent.com/99162884/171311316-b860814b-8317-481d-9570-b3befcdb4646.png)

![image](https://user-images.githubusercontent.com/99162884/171311361-8b48ee44-7e5e-44f0-ae13-a0a7b751a2fd.png)

![image](https://user-images.githubusercontent.com/99162884/171311399-413a9fb6-88d9-4248-8959-ddc25df1a458.png)

![image](https://user-images.githubusercontent.com/99162884/171311642-8a13709c-1883-4b83-8182-f2b35f058f05.png)


Cliente usa dependecia Axios
[Documentación dependencia Axios](https://www.npmjs.com/package/axios)


Al instalar la dependencia Axios, se crea un archivo llamado __http-common.js__ , aqui agregamos la referencia de nuestro servidor al que se conecatará para utilizar los servicios de nuestra API.

![image](https://user-images.githubusercontent.com/99162884/171311900-a4df13d3-fcd7-45df-a9e4-30a6fa84886d.png)


En el Archivo __src/services/ExplorerService.js__ tenemos la clase __ExplorerService__ que contiene métodos CRUD, que llamarán a los Endpoints disponibles en mi servicio.

![image](https://user-images.githubusercontent.com/99162884/171312140-b2963668-160d-43ee-973a-bcc301a62e31.png)

En la carpeta components están los componentes usados de Vue: template y script.


## Diagrama de funcionamiento de poryecto(cliente), realizado con VUE

En proceso actividad: 5. Realiza un diagrama de cómo funciona este proyecto de Vue JS, incluye cómo funciona el router.js, los templates, los services y los componentes.(Incluye estos diagramas en tu fork.)



---

## Nuevo Feature Fullstack

Crear nueva tabla


`Prisma schema`

```js

model missionCommander {
  id Int @id @default(autoincrement())
  name String @unique
  username String @db.VarChar(255)
  mainStack String @db.VarChar(255)
  currentEnrollment Boolean @default(false)
  hasAzureCertification Boolean @default(false)
}

```

![image](https://user-images.githubusercontent.com/99162884/171549195-22cb2ea8-23e7-474b-881a-103a946ddda8.png)

Agregar registros a campos:

`seed.js`

```js
(async function main() {
  try {
    const woopa = await prisma.missionCommander.upsert({
      where: { name: 'Woopa' },
      update: {},
      create: {
        name: 'Woopa',
        username: 'Wuu',       
				mainStack: 'Carlo Gilmar',
        currentEnrollment:true,
        hasAzureCertification:true

      },
    });
  
    console.log('Create 1 mission');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

```


![image](https://user-images.githubusercontent.com/99162884/171548954-c69a8f62-95a0-4f7f-bd9d-6ded4573cb59.png)


![image](https://user-images.githubusercontent.com/99162884/171548764-8db93a8e-feb1-4c6f-98f0-04929157d58a.png)


 [Repo de Fork para cliente con Vue](https://github.com/AliciaGaona/client-launchx)



## Agregar API con enpoints CRUD para nueva tabla


| TIPO | URL|
| ------------ | ------- |
| GET | `localhost:3000/missionCommander` |
|  GET | `localhost:3000/missionCommander/:id` |
| POST  | `localhost:3000/missionCommander` |
|  PUT | `localhost:3000/missionCommander/:id'` |
|  DELETE | `localhost:3000/missionCommander/:id'` |


```js
// Nuevo Feature Fullstack
// CRUD tabla missionCommander


app.get('/missionCommander', async (req, res) => {
  const allInfoMissionComander =  await prisma.missionCommander.findMany({});
  res.json(allInfoMissionComander);
});

app.get('/missionCommander/:id', async (req, res) => {
  const id = req.params.id;
  const allInfoMissionComander = await prisma.missionCommander.findUnique({where: {id: parseInt(id)}});
  res.json(allInfoMissionComander);
});


app.post('/missionCommander', async (req, res) => {
  const missinComanderInfoNew = {
    name: req.body.name,
    username: req.body.username,
    mainStack: req.body.mainStack,
    currentEnrollment: req.body.currentEnrollment,
    hasAzureCertification: req.body.hasAzureCertification
   };
  const message = 'mission';
  await prisma.missionCommander.create({data: missinComanderInfoNew});
  return res.json({message});
});


app.put('/missionCommander/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.missionCommander.update({
		where: {
			id: id
		},
		data: {
			missionCommander: req.body.missionCommander
		}
	})
	return res.json({message: "Actualizado correctamente"});
});

app.delete('/missionCommander/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.missionCommander.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

```


En proceso de documentación.....

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
[Guia de ejercicio](https://github.com/LaunchX-InnovaccionVirtual/MissionNodeJS/blob/main/semanas/semana_5/client_server.md)
@visual_partner #VisualPartnership #InnovacciónVirtual #LaunchX #NodeJs


