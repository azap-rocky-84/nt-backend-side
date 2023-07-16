import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import NationalTeams from "../models/NationalTeams";

const createNt = async (req, res, next) => {
    try {
        const nt = new NationalTeams({
            title: "titolo semplice"
        })
    } catch (error) {
        next(error);
    }
}