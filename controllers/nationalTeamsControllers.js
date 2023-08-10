import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import NationalTeams from "../models/NationalTeams";
import { fileRemover } from "../utils/fileRemover";

const createNt = async (req, res, next) => {
    try {
        const nt = new NationalTeams({
            title: "titolo",
            body: {
                type: "doc",
                content: [],
            },
            emblem: "",
            flag: "",
            confederation: "confederazione",
            fifaCode: "codiceFifa",
            nickname: "nickname",
            ct: "ct",
            mostCappedPlayer: "presenze",
            caps: 0,
            topScorer: "cannoniere",
            goals: 0
        });
        const createdNt = await nt.save();
        return res.json(createdNt);
    } catch (error) {
        next(error);
    }
};

const updateNt = async (req, res, next) => {
    try {
        const nt = await NationalTeams.findOne({title: req.params.title});
        if(!nt){
            const error = new Error("Nazionale non trovata");
            next(error);
            return;
        }
        const uploadFlag = uploadPicture.single('flag');
        const uploadEmblem = uploadPicture.single('emblem');
        const handleUpdateNtData = async (data) => {
            const {title, body, emblem, flag, confederation, fifaCode, nickname, ct, mostCappedPlayer, caps, topScorer, goals} = JSON.parse(data);
            nt.title = title || nt.title;
            nt.body = body || nt.body;
            nt.confederation = confederation || nt.confederation;
            nt.fifaCode = fifaCode || nt.fifaCode;
            nt.nickname = nickname || nt.nickname;
            nt.ct = ct || nt.ct;
            nt.mostCappedPlayer = mostCappedPlayer || nt.mostCappedPlayer;
            nt.caps = caps || nt.caps;
            nt.topScorer = topScorer || nt.topScorer;
            nt.goals = goals || nt.goals;
            const updateNt = await nt.save();
            return res.json(updateNt);
        };
        uploadFlag(req, res, async function(err){
            if(err){
                const error = new Error("Errore sconosciuto durante il caricamento della bandiera");
                next(error);
            } else {
                if(req.file){
                    let filename;
                    filename = nt.flag;
                    if(filename){
                        fileRemover(filename);
                    }
                    nt.flag = req.file.filename;
                    handleUpdateNtData(req.body.document);
                } else {
                    let filename;
                    filename = nt.flag;
                    nt.flag = "";
                    fileRemover(filename);
                    handleUpdateNtData(req.body.document);
                }
            }
        });
        uploadFlag(req, res, async function(err){
            if(err){
                const error = new Error("Errore sconosciuto durante il caricamento della bandiera");
                next(error);
            } else {
                if(req.file){
                    let filename;
                    filename = nt.flag;
                    if(filename){
                        fileRemover(filename);
                    }
                    nt.flag = req.file.filename;
                    handleUpdateNtData(req.body.document);
                } else {
                    let filename;
                    filename = nt.flag;
                    nt.flag = "";
                    fileRemover(filename);
                    handleUpdateNtData(req.body.document);
                }
            }
        });
        uploadEmblem(req, res, async function(err){
            if(err){
                const error = new Error("Errore sconosciuto durante il caricamento dello stemma");
                next(error);
            } else {
                if(req.file){
                    let filename;
                    filename = nt.emblem;
                    if(filename){
                        fileRemover(filename);
                    }
                    nt.emblem = req.file.filename;
                    handleUpdateNtData(req.body.document);
                } else {
                    let filename;
                    filename = nt.emblem;
                    nt.emblem = "";
                    fileRemover(filename);
                    handleUpdateNtData(req.body.document);
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

const deleteNt = async (req, res, next) =>{
    try {
        const nt = await NationalTeams.findOneAndDelete({fifaCode: req.params.fifaCode});
        if(!nt){
            const error = new Error("Nazionale non trovata");
            return next(error);
        }
        return res.json({
            message: "La nazionale è stata eliminata correttamente",
        })
    } catch (error) {
        next(error);
    }
};

const getNt = async (req, res, next) =>{
    try {
        const nt = await NationalTeams.findOne({fifaCode: req.params.fifaCode});
        if(!nt){
            const error = new Error("La nazionale non è stata trovata");
            return next(error);
        }
        return res.json(nt);
    } catch (error) {
        next(error)
    }
};

const getAllNt = async (req, res, next) => {
    try {
        const filter = req.query.searchKeyword;
        let where = {};
        if(filter){
            where.title = {$regex: filter, $options: "i"};
        }
        let query = NationalTeams.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const skip = (page-1) * pageSize;
        const total = await NationalTeams.find(where).countDocuments();
        const pages = Math.ceil(total/pageSize);
        res.header({
            'x-filter':  filter,
            'x-totalcount': JSON.stringify(total),
            'x-currentpage': JSON.stringify(page),
            'x-pagesize': JSON.stringify(pageSize),
            'x-totalpagecount': JSON.stringify(pages),
        });
        if(page>pages){
           return res.json([]);
        }
        const result = await query.skip(skip).limit(pageSize).sort({updatedAt: 'desc'});
        return res.json(result);
    } catch (error) {
        next(error);
    }
}
export {createNt, updateNt, deleteNt, getNt, getAllNt};