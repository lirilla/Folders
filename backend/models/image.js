import mongoose from 'mongoose';
import Folder from './folder';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ImagesSchema = new Schema({
	id: String,
	title: String,
	description: String,
	file: String,
	folder: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}]
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Image', ImagesSchema);
