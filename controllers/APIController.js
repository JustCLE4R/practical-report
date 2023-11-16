const APIModel = require('../models/APIModel');

const APIController = {
  // mengirim data dalam bentuk JSON
  mahasiswa: (req, res) => {
    APIModel.getMahasiswa((err, result) => {
      if(err) {
        res.status(500).send(err);
      }
      else{
        res.status(200).json({mahasiswa: result});
      }
    })
  },

  mahasiswaStatus: (req, res) => {
    APIModel.getMhsStatus(req.params.nim, (err, result) => {
      if(err) {
        res.status(err).send(err);
      }
      else{
        res.status(200).json(result);
      }
    })
  },

  asistenLab: (req, res) => {
    APIModel.getAsistenLab((err, result) => {
      if(err) {
        res.status(500).send(err);
      }
      else{
        res.status(200).json(result);
      }
    });
  },
  
  laboran: (req, res) => {
    APIModel.getLaboran((err, result) => {
      if(err) {
        res.status(500).send(err);
      }
      else{
        res.status(200).json(result);
      }
    });
  },

  dosen: (req, res) => {
    APIModel.getDosen((err, result) => {
      if(err) {
        res.status(500).send(err);
      }
      else{
        res.status(200).json(result);
      }
    });
  },

  kelas: (req, res) => {
    APIModel.getKelas((err, result) => {
      if(err) {
        res.status(500).send(err);
      }
      else{
        res.status(200).json({kelas: result});
      }
    });
  }







}
module.exports = APIController;