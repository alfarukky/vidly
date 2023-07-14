const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());

const generes = [
  { id: 1, name: "action" },
  { id: 2, name: "comedy" },
  { id: 3, name: "adventure" },
  { id: 4, name: "Drama" },
];

// get generes
app.get("/api/generes", (req, res) => {
  res.send(generes);
});

// get individual genere
app.get("/api/generes/:id", (req, res) => {
  const genere = generes.find((c) => c.id === parseInt(req.params.id));
  if (!genere) {
    return res.status(404).send("The genere with the given id was not found");
  } else {
    res.send(genere);
  }
});

// post generes
app.post("/api/generes", (req, res) => {
  // Validate input data using joi validation library
  const { error } = validateGeneres(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);
  const genere = {
    id: generes.length + 1,
    name: req.body.name,
  };
  generes.push(genere);
  res.send(genere);
});

//update generes
app.put("/api/generes/:id", (req, res) => {
  const genere = generes.find((c) => c.id === parseInt(req.params.id));
  if (!genere)
    return res.status(404).send("The genere with the given id was not found");
  //Validate update request body against JOI Schema for Genre object
  const { error } = validateGeneres(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);
  //update genere
  genere.name = req.body.name;
  // return updated genere
  res.send(genere);
});

//delete generes
app.delete("/api/generes/:id", (req, res) => {
  //lookup for genere
  const genere = generes.find((c) => c.id === parseInt(req.params.id));
  if (!genere)
    return res.status(404).send("The genere with the given id was not found");
  // delete genere
  const index = generes.indexOf(genere);
  generes.splice(index, 1);
  // return the deleted course
  res.send(genere);
});

function validateGeneres(genere) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
  });

  return schema.validate(genere);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
