import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FoldersSchema = new Schema({
	name: String,

}, {timestamps: true});

export default mongoose.model('Folder', FoldersSchema);
