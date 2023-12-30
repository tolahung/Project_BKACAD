import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    // Create 
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);

    // Read
    router.get("/get-crud", homeController.displayGetCRUD);
    
    //Edit
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    
    //Delete
    router.get("/delete-crud", homeController.deleteCRUD);
   



    //Rest API
    return app.use("/", router);
}

module.exports = initWebRoutes;