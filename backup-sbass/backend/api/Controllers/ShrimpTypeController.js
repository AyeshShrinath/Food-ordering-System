import ShripTypeModel from "../Models/ShrimpTypeModel.js";

export function getShrimpTypes(req, res) {
  ShripTypeModel.find()
    .then((shrimptypes) => res.json(shrimptypes))
    .catch((err) => res.status(400).json("Error: " + err));
}

export function addShrimpType(req, res) {
  const shrimptype = req.body.shrimptype;
  const price_per_kg = req.body.price_per_kg;

  const newShrimpType = new ShripTypeModel({
    shrimptype,
    price_per_kg,
  });

  newShrimpType
    .save()
    .then(() => res.json("Shrimp Type added!"))
    .catch((err) => res.status(400).json("Error: " + err));
}

export function getShrimpType(req, res) {
  ShripTypeModel.findById(req.params.id)
    .then((shrimptype) => res.json(shrimptype))
    .catch((err) => res.status(400).json("Error: " + err));
}

export function deleteShrimpType(req, res) {
  ShripTypeModel.findByIdAndDelete(req.params.id)
    .then(() => res.json("Shrimp Type deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
}

export function updateShrimpType(req, res) {
  ShripTypeModel.findById(req.params.id)
    .then((shrimptype) => {
      shrimptype.shrimptype = req.body.shrimptype;
      shrimptype.price_per_kg = req.body.price_per_kg;

      shrimptype
        .save()
        .then(() => res.json("Shrimp Type updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

export function deleteAllShrimpTypes(req, res) {
  ShripTypeModel.deleteMany({})
    .then(() => res.json("All Shrimp Types deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
}

// Path: backend/api/Models/ShrimpTypeModel.js
