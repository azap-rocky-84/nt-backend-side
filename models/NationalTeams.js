import {Schema, model} from 'mongoose';
const NationalTeamsSchema = new Schema({
    title: {type: String, required: true},
    body: {type: Object, required: true},
    emblem: {type: String, required: false},
    flag: {type: String, required:false},
    confederation: {type: String, required:true},
    fifaCode: {type: String, required:true},
    nickname: {type: String, required:true},
    ct: {type: String, required:true},
    mostCappedPlayer: {type: String, required:true},
    caps: {type: Number, required:true},
    topScorer: {type: String, required:true},
    goals: {type: Number, required: true}
}, {timestamps: true, toJSON:{virtuals:true}}
);
const NationalTeams = model("NationalTeams", NationalTeamsSchema);
export default NationalTeams;