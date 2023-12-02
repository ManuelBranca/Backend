import { Router } from "express";
import { productManager } from "..";

const prodcutsRouter = Router();

prodcutsRouter.get('/', async (req,res) => {
    try{
        const {limit} = req.query;
        const products = await productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0,limit)
            return res.json(limitedProducts)
        }

        return res.json(products)
    } catch (error){
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
    }
})

prodcutsRouter.get('/:pid', async (req,res) =>{
    const {pid} = req.params;
    try{
        const products = await productManager.getProductsById(pid)
        res.json(products)
    } catch(error){
        console.log(error)
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
})


prodcutsRouter.post('/', async(req,res)=>{
    try{
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})
        res.json(response);
    }catch(error){
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR PRODCUTO`)
    }
})

prodcutsRouter.put ('/:pid',async (req,res)=>{
    const {pid}=req.params

    try{
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct(pid,{title, description, price, thumbnail, code, stock, status, category})
        res.json(response);
    } catch(error){
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR EL PRODCUTO CON ID ${pid}`)
    }
})

prodcutsRouter.delete('/:pid',async(req,res)=>{
    const{pid}= req.params;
    try{
        await productManager.deleteProduct(pid)
        res.send('PRODUCTO ELIMINADO EXITOSAMENTE')
    } catch (error){
        console.log(error)
        res.send(`ERROR AL INTENTAR ELMININAR PRODUCTO CON ID ${pid}`)
    }
})


export {prodcutsRouter};