import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const routeAdmin = express.Router();


routeAdmin.post("/admin/:id", async (req, res) => {
    const id: string = req.params.id as string;
    let role = await prisma.role.findUnique({
        where: {
            userId: id,
        },
        select: {
            isAdmin: true,
        },
    });
    if (role !== null) {
        if (role.isAdmin) {
            const { sellerId, name, brand, stock, value, thumbnail, description } = req.body;
            const product = await prisma.product.create({
                data: {
                    name: name,
                    brand: brand,
                    value: value,
                    stock: stock,
                    description: description,
                    sellerId: sellerId,
                    thumbnail: thumbnail,
                }
                    
            });
            res.json(product);
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } else {
        res.status(404).json({ message: "Admin no found" });
    }

});

routeAdmin.patch("/admin/:id", async (req, res) => {
    const id: string = req.params.id as string;
    try{
        let role = await prisma.role.findUnique({
            where: {
                userId: id,
            },
            select: {
                isAdmin: true,
            },
        });
        if (role !== null) {
            if(role.isAdmin === true){
                //update
                const {idProduct, name, brand, stock, value, thumbnail, description } = req.body;
                let update = await prisma.product.update({
                    where: {
                        id: idProduct,
                    },
                    data: {
                        name: name,
                        brand: brand,
                        stock: stock,
                        value: value,
                        thumbnail: thumbnail,
                        description: description,
                    },
                });
                res.json(update);
            }else{
                res.json({message:"you are not admin"})
            }
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    }catch(err){
        res.status(500).json({
            status: 'Unexpected error',
        })
    }
});

routeAdmin.delete("/admin/:id", async (req, res) => {
    const id: string = req.params.id as string;
    let role = await prisma.role.findUnique({
        where: {
            userId: id,
        },
        select: {
            isAdmin: true,
        },
    });
    if (role !== null) {
        if(role.isAdmin === true){
            //delete
            const {idProduct} = req.body;
            let deleteProduct = await prisma.product.delete({
                where: {
                    id: idProduct,
                },
                
            });
            res.json("Se eliminó el producto correctamente");
        }else{
            res.json({message:"you are not admin"})
        }
    } else {
        res.status(404).json({ message: "Not Found" });
    }
});
export default routeAdmin;