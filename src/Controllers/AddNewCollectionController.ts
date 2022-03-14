import { Request, Response } from "express";
import { AddNewCollectionService } from "../Services/AddNewCollectionService";

class AddNewCollectionController {

    async handle(request:Request, response:Response){
        const { address } = request.params;
        const service = new AddNewCollectionService();
        const quantSaved = await service.execute(address);        
        return response.status(200).json({message: quantSaved + " Stored!"});  
    }
}


export { AddNewCollectionController }