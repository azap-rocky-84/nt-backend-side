import {Schema, model} from 'mongoose';
const NationalTeamsSchema = new Schema({
    title: {type: String, required: true},
    body: {type: Object, required: true},
    flag: {type: String, required:false},
    confederation: {type: String, required:true},
    fifaCode: {type: String, required:true},
    nickname: {type: String, required:true},
    ct: {type: String, required:true},
    mostCappedPlayer: {type: [String]},
    caps: {type: String, required:true},
    topScorer: {type: [String]},
    goals: {type: String, required: true}
}, {timestamps: true, toJSON:{virtuals:true}}
);
const NationalTeams = model("NationalTeams", NationalTeamsSchema);
export default NationalTeams;