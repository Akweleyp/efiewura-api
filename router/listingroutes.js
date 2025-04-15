import { Router } from "express";
import {
  addListing,
  deleteListing,
  getListings,
  getOneListing,
  listingsByUser,
  permannentlyDeleteListings,
  replaceListing,
  restorelistings,
  updateListing,
  viewDeletedListings,
} from "../controller/listingcontroller.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";
import { listingPicturesUpload } from "../middleware/upload.js";

const listingRouter = Router();
// Create listing routes

// Get or View listings
listingRouter.get("/listings", getListings);

// Post listing
listingRouter.post(
  "/listings",
  isAuthenticated,
  isAuthorized(["landlord", "admin"]),
  listingPicturesUpload.array("pictures", 3),
  addListing
);

// update lisitng
listingRouter.patch(
  "/listings/:id",
  isAuthenticated,
  isAuthorized(["landlord", "admin"]),
  updateListing
);

// Replace listings
listingRouter.put(
  "/lsitings/:id",
  isAuthenticated,
  isAuthorized(["landlord", "admin"]),
  replaceListing
);

// View deleted listings
listingRouter.get(
  "/listings-deleted/user/:userId",
  isAuthenticated,
  isAuthorized(["landlord", "admin"]),
  viewDeletedListings
);

// View only one liting or get listing by id
listingRouter.get("/listings/:id", getOneListing);

// View lsitings by a specific landlord
listingRouter.get("/listings/user/:userId", listingsByUser);

// Delete listings
listingRouter.delete("/listings/:id", deleteListing);

// Restore a mistakenly deleted listing using put
listingRouter.put(
  "/listings-restore/:id",
  isAuthenticated,
  isAuthorized(["landlord", "admin"]),
  restorelistings
);

// Permanently delete from trash
listingRouter.delete(
  "/listings-delete/:id",
  isAuthenticated,
  isAuthorized(["landlord", "admin"]),
  permannentlyDeleteListings
);

// Export router

export default listingRouter;
