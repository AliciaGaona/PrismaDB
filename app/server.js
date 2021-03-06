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

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.get('/explorers', async (req, res) => {
  const allExplorers =  await prisma.explorer.findMany({});
  res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

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

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});
// CRUD tabla ExplorerInfo

app.get('/explorersInfo', async (req, res) => {
  const allExplorersInfo =  await prisma.explorerInfo.findMany({});
  res.json(allExplorersInfo);
});

app.get('/explorersInfo/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorerInfo.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});


app.post('/explorersInfo', async (req, res) => {
  const explorerInfoNew = {
    name: req.body.name,
    lang: req.body.lang,
    missionCommander: req.body.missionCommander,
    enrollments: req.body.enrollments,
    hasCertification: req.body.hasCertification

   };
  const message = 'Explorer creado.';
  await prisma.explorerInfo.create({data: explorerInfoNew});
  return res.json({message});
});


app.put('/explorersInfo/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorerInfo.update({
		where: {
			id: id
		},
		data: {
			missionCommander: req.body.missionCommander
		}
	})

	return res.json({message: "Actualizado correctamente"});
});


app.delete('/explorersInfo/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorerInfo.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

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

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});