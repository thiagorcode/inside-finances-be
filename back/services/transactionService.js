const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {

   try {
      const { period } = req.query
      if (!period) throw new Error("Favor infoma '?period no formato YYYY-MM!")

      const report = await TransactionModel.find({ yearMonth: period })
      res.send({
         length: report.length,
         report
      })
      res.end()
   } catch (error) {
      res
         .status(500)
         .send({ message: error.message || 'Algum erro ocorreu ao procurar' })
   }
}
const findOne = async (req, res) => {
   try {

      const { id } = req.params;
      const report = await TransactionModel.findById(id)

      res.send({
         report
      })
      res.end()
   } catch (error) {
      res
         .status(500)
         .send({ message: error.message || 'Algum erro ocorreu ao procurar' })
   }
}

const create = async (req, res) => {
   try {
      const status = await TransactionModel.insertMany(req.body);

      res.send({
         status: status
      })
      res.end()
   } catch (error) {
      res
         .status(500)
         .send({ message: error.message || 'Algum erro ocorreu ao procurar' })
   }
}

const remove = async (req, res) => {
   const { id } = req.params;
   try {
      const status = await TransactionModel.deleteOne({ _id: id })
      res.send({ status: status })
      res.end()
   } catch (error) {
      res
         .status(500)
         .send({ message: error.message || 'Algum erro ocorreu ao procurar' })
   }
}

const update = async (req, res) => {
   const { id } = req.params;
   try {
      const status = await TransactionModel.findByIdAndUpdate(id, req.body, { new: true }) // verificar usar update--
      res.send({ status: status })
      res.end()
   } catch (error) {
      res
         .status(500)
         .send({ message: error.message || 'Algum erro ocorreu ao procurar' })
   }

}

module.exports = { findAll, create, remove, update, findOne }