import { ListingModel } from "../model/listingmodel.js";
import { listingIdValidator, listingValidator, updateListingValidator } from "../validator/listingvalidator.js";


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
    return res.json({message: "Request unsuccessful, kindly reload the page ", status: "error"})
    
   }


};

 export const listingsByUser = async(req, res) => {

   try {
     const {filter = "{}", sort = "{}"} = req.query;
 
     const result = await ListingModel
     .find({...JSON.parse(filter), userId:req.params.userId, isDeleted:false})
     .sort(JSON.parse(sort));
 
     if (result.length === 0){
         return res.status(404).json({message: "No listings found"})
     }
     res.json({
          message: "Here are the listings",
         data: result})
         
   } catch (error) {
    return res.json({message: "Request not successful, kinldy refresh you page", status:"error"})
    
   }
 };


//  Get one listing 

export const getOneListing = async(req, res) => {

    try {
        const {error, value} = listingIdValidator.validate(req.params, {abortEarly:false})
    
        if (error){
            return res.status(400).json({message: "Validation unsuccessful", status: "error"})
        }
        const result = await ListingModel.findById(value.id)
        if (!result){
            return res.status(404).json({message: "No listings found"})
        }
        res.json(result)
    } catch (error) {
        return res.json({message:" Request unsuccessful, kindly refresh your application"})
        
    }
};

//  Update/Patch listing

export const updateListing = async(req, res) => {

    try {
        const {error, value } = updateListingValidator.validate(req.body, {abortEarly: false})
    
        if (error){
            return res.status.json({message: "Validation Unsuccessful", status: "error"})
    
        }
    
        // Find listing by Id
       const confirmListing = await ListingModel.findById(req.params.id)
       if(!confirmListing){
        return res.status(400).json({message: "Listing not found", status: "error"})
       }
    
    // confirm that the authenticated owner is the rightful owner of the listing
       if (confirmListing.userId.toString() !== req.auth.id){
        return res.status(403).json({message: "You are not authorized to update this listing"})
        
       }
    
    
    //    continue / proceed to update the advert
    
     const result = await ListingModel.findByIdAndUpdate(req.params.id, value, {new:true})
    
     if (!result){
        return res.json({message: "Listing not found", status: "error"})
     }
    
     res.status(200).json({
        message:"Listing successfully updated",
        data: result,
        status: "success"
    })
    } catch (error) {
        return res.status(404).json({message: "Request unsuccessful,kindly refresh your application", status: "error"})
        
    }
}
 
// DELETE  listing [Add logic to save all activity log ]

export const deleteListing = async(req, res) => {

    try {
        const {error, value} = listingIdValidator.validate(req.params, {abortEarly:false})
        if (error){
            return res.status(400).json({message:"Validation unsuccessful", status:"error"})
        }

         const confirmListing = await ListingModel.findById(req.params.id)
         if(!confirmListing){
            return res.status(400).json({message:"Listing not found"})
         }

         if (confirmListing.userId.toString() !== req.auth.id){
            return res.status(403).json({message:"You are not authorized to delete this listing"})
         }

         const result = await ListingModel.findByIdAndUpdate(value.id, {isDeleted: true, deletedAt :new Date()},
        {new: true})
       if (!result){
        return res.status(404).json({message: "Listing not found" })
       }

       res.status(202).json({
        message: "Lsiting deleted",
        data: result,
        status: "success"
       })



    } catch (error) {
        return res.status(404).json({message: "Request unsuccessful, kindly refresh your application",
            status: "error"
        })
        
    }

}

// View deleted listings using userid

export const viewDeletedListings = async(req, res) => {

    try {
        // confirm ownership
        if(req.params.userId !== req.auth.id){
            return res.status(403).json({message: "You are not authorized to view these deleted listings"})
        }
    
    
        // find userId = req.user.id 
    
        const result = await ListingModel.find({userId:req.params.userId, isDeleted: true})
    
        if(result.length === 0){
            return res.status(404).json({message: "No deleted listings found"})
        }
    
        res.status(201).json({message:" Here are your deleted listings"})
    } catch (error) {
        return res.status(404).json({message: "Request unsuccessful, kindly refresh your application"})
        
    }
}


// Restore deleted listings

export const restorelistings = async(req, res) => {

    try {
        const confirmListing = await ListingModel.findById(req.params.id)
    
        if (!confirmListing.userId.toString() !== req.auth.id){
            return res.staus(403).json({message: "You are not authorised to restore listing"})
        }
    
        const result = await ListingModel.findByIdAndUpdate(req.params.id, {isDeleted:false} , {new:true} )
         if(!result){
            res.status(404).json({message: "Listng not found"})
         }
         res.status(201).json({
            message: "Adverts successfully restored",
            data: result,
            status: "success"})
    
    } catch (error) {
        return res.json({message: "Request not successful, kindly refresh you application", status: "error"})
    }

};

// permannently delete listings

export const permannentlyDeleteListings = async(req, res) => {
try {
    
        const result = await ListingModel.findByIdAndDelete(req.params.id)
    
        if (!result){
            res.status(404).json({message: "Listng not found"})
        }
    
        res.status(201).json({
            message: "Listing permanently deleted",
            data: result,
            status: "success"
        })
} catch (error) {
    return res.json({message: "Request unsuccessful, kindly refresh your application",
        status: "error"
    })
}
}
