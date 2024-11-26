const express = require("express");
const Financial = require("../models/financial");
const router = express.Router();

//save Financial details

router.post("/financial/save", (req, res) => {
  let newFinancial = new Financial(req.body);

  newFinancial.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "financial details saved successfully",
    });
  });
});


//get financial details


router.get("/financial", (req, res) => {
  Financial.find().exec((err, financial) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingFinancial: financial,
    });
  });
});


//get a specific financial detail



router.get("/financial/:id", (req, res) => {
  let financialId = req.params.id;

  Financial.findById(financialId, (err, financial) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      financial,
    });
  });
});



//update  financial details



router.put("/financial/update/:id", (req, res) => {
  Financial.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});



//delete  financial details



router.delete("/financial/delete/:id", (req, res) => {
  Financial.findByIdAndRemove(req.params.id).exec((err, deleteFinancial) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful",
        err,
      });

    return res.json({

      message: "delete Successfully",

      deleteFinancial,
    });
  });
});

module.exports = router;
