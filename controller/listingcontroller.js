import { ListingModel } from "../model/listingmodel.js";
import { listingIdValidator, listingValidator } from "../validator/listingvalidator.js";


// Posting or adding a listing
export const addListing = async(req,res) => {
   try {
     const { error, value } = listingValidator.validate({
         ...req.body,
         pictures: req.files?.map((file) =>  {
             return file.filename})
         }, { abortEarly: false});
         if (error) {
             console.log(error.details);
             return res.status(422).json({message: "Validation unsuccessful", status:"error" });
         }
 
 
         // save the listing details
         const result = ListingModel.create({
             ...value,
             userId: req.auth.id
         })
         return res.status(201).json(result)
        
   } catch (error) {
    if(error.name === "MongooseError") {
        return res.status(409).json({message: "Request not successful, Internal server error", status:"error"})
    }
    return  res.json({message: "Request not successful, kindly reload the page again", status: "error"})
   }
};


// View or get all listings using the search and filter

export const getListings = async(req, res) => {

   try {
     const {filter = "{}", sort = "{}" } = req.query;
 
     const result = await ListingModel.find({...JSON.parse(filter), isDeleted: false}).sort(JSON.parse(sort));
     if(result.length === 0) {
         return res.status(404).json({message: "No listings found"})
     }
     return res.json({
         message: "Here are your listings",
         data: result
     })
   } catch (error) {
    return res.json({message: "Request unsuccessful "})
    
   }


}
 
