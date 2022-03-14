import { EntityRepository, Repository } from "typeorm"
import { OpenseaTxn } from "../Entities/OpenseaTxn"
import { ITxnData } from "../Interfaces/ITxnData"

@EntityRepository(OpenseaTxn)
class OpenseaTxnRepositories extends Repository<OpenseaTxn> { 

    async saveOpenSeaTxnOnDB(txn: ITxnData){
        const { block_number, txn_hash, token_address, token_id_array, value, date } = txn;
        const txn_entity = this.create(
            { 
                id: txn_hash,
                block_number, 
                token_address, 
                token_id: token_id_array, 
                value,
                date
            }
        );
        
        try{           
            await this.save(txn_entity);
            return txn_entity;
        }
        catch(err){
            console.log(txn_entity);
            throw new Error(err);
        }        
    }    
}

export { OpenseaTxnRepositories }