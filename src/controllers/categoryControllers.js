import { response } from "express";
import Category from "../models/CategoryModel"
import Product from "../models/ProductModel"
import { where } from "sequelize";

const get = async (req, res) => {
    try {
        const{
            id
        } = req.params;
        let response = []
        if(!id){
            response = await Category.findAll();
            return res.status(200).send(response);
        }
        response = await Category.findOne({
            where:{
                id:id
            }
        });
        return res.status(200).send(response);
    } catch (e) {
        return res.status(500).send({
            error: e.message
        })
        
    }
}

const create = async (req, res) => {
    try{
        let{
            name
        } = req.body;
        let response = await Category.create({
            name
        })
        return res.status(200).send({
            type: 'success', // success, error, warning, info
            message: 'Registro criado com sucesso', // mensagem para o front exibir
            data: response // json com informações de resposta
          });
      
        } catch (error) {
          return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error
          });
        }
      
        
    }     

const deleta = async (req, res) => {
    try{
        const{id} = req.params;
        id=id.toString()
        id=id? id.replace(/\D/g, '') : null
        if(!id){
            return res.status(200).send({
                type: 'warning',
                message:'Informe um ID válido para deletar a categoria'
            });
        }
        let category = await Category.findOne({
            where:{
                id:id
            }
        })
        
        if(!category){
            return res.status(200).send({
            type: 'warning',
            message: `Não foi encontrada categoria com o id ${id}`,
        });
        await category.destroy()
        return res.status(200).send({
            type: 'sucess',
            message: `registro com o id ${id} deletado com sucesso`,
        });}
        } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error
        });
  }}




export default {
    get,
    create,
    deleta

}