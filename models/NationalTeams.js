import {Schema, model} from 'mongoose';
const NationalTeamsSchema = new Schema({
    title: {type: String, required: true},
    body: {type: Object, required: true},
    emblem: {type: String, required: true},
    flag: {type: String, required:true},
    confederation: {type: String, required:true},
    fifaCode: {type: String, required:true},
    nickname: {type: String, required:true},
    ct: {type: String, required:true},
    mostCapped: {type: String, required:true},
    topScorer: {type: String, required:true},
    relatedPosts: {type: Schema.Types.ObjectId, ref: "Post"},
}, {timestamps: true, toJSON:{virtuals:true}}
);
const NationalTeams = model("NationalTeams", NationalTeamsSchema);
export default NationalTeams;