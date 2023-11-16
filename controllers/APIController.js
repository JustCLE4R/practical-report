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
    APIModel.getAllKelas((err, result) => {
      if(err) {
        res.status(500).send(err);
      }
      else{
        res.status(200).json({kelas: result});
      }
    });
  },

  kelasDetail: async(req, res) => {
    const id = req.params.id_kelas

    try {
      const kelasDetail = await new Promise((resolve, reject) => {
        APIModel.getKelasDetailById(id, (err, result) => {
          if(err){
            req.flash('error', 'Ada masalah saat mengambil database (getKelasDetail) ' + err)
            reject(err)
          }
  
          if(result == null){
            req.flash('error', 'Kelas tidak ditemukan')
            reject('Kelas tidak ditemukan')
          }
          else{
            resolve(result)
          }
        })
      })
  
      const kelasMhs = await new Promise((resolve, reject) => {
        APIModel.getKelasById(id, (err, result) => {
          if(err){
            req.flash('error', 'Ada masalah saat mengambil database (getKelas) ' + err)
            reject(err)
          }
  
          if(result == null){
            req.flash('error', 'Tidak/Belum ada mahasiswa di kelas ini, jika merasa harusnya ini tidak terjadi segera hubungi asisten lab yang bersangkutan')
            reject('Tidak/Belum ada mahasiswa di kelas ini')
          }
          else{
            resolve(result)
          }
        })
      })

      if(kelasDetail && kelasMhs){
        datas = {
          kelasDetail: kelasDetail,
          kelasMhs: kelasMhs
        }

        res.status(200).json({kelas:datas})
      }

    } catch (error) {
      res.render('error/404')
    }
  },








}
module.exports = APIController;