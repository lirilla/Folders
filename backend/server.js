// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secret';
import Image from './models/image';
import Folder from './models/folder';
import multer from 'multer';
import path from 'path';

// and create our instances
const app = express();
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const newFilename = req.body.title + '.' + file.originalname.split('.')[1];
    cb(null, newFilename);
  },
});

// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
	res.json({ message: 'Hello, World!' });
});

/*router.get('/upload/:name', (req, res) => {
	console.log('Get image');
	var name = req.params.name;
	console.log(name);
	res.sendFile('./uploads/' + name );
});*/

router.get('/images', (req, res) => {
	Image.find((err, images) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: images });
	});
});

router.post('/images', upload.single('file'), (req, res) => {
	const image = new Image();
	const { id, title, description, file, folder } = req.body;
	if (!id || !title || !description) {
		// we should throw an error. we can do this check on the front end
		return res.json({
			success: false,
			error: 'You must provide all fields'
		});
	}
	image.id = id;
	image.title = title;
	image.description = description;
	image.file = 'upload/' + image.title;
	image.folder = folder;

	image.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});


const getCover = async(id) => {
	var cover_img = await Image.findOne( {'folder': id});
	var cover = '';
	if (cover_img) {
		cover = cover_img.title;
	}
	return cover;
}

const getFoldersWithCovers = async(folders) => {
	var res = folders.map(async (folder, index) => {
		var cover = await getCover(folder._id);
		var new_item = Object.assign(
			{}, 
			folder._doc, 
			{
				cover: cover != '' ? '/uploads/' + cover + '.jpg' : ''
			}
		);
		return new_item;
	});
	var result = await Promise.all(res);
	return result;
}

router.get('/folders',  (req, res) => {
	Folder.find(async(err, folders) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: await getFoldersWithCovers(folders) });
	});
});

router.post('/folder', (req, res) => {
	const folder = new Folder();
	const { name } = req.body;
	if ( !name ) {
		// we should throw an error. we can do this check on the front end
		return res.json({
			success: false,
			error: 'You must provide all fields'
		});
	}
	folder.name = name;

	folder.save((err, folder) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: folder });
	});
});

router.get('/folder/:id', (req, res) => {
	const { id }  = req.params;
	if (!id) {
		return res.json({ success: false, error: 'No folder id provided' });
	}
	Folder.findById(id, (error, folder) => {
		if (error) return res.json({ success: false, error });
		const { name } = req.body;
		return res.json( { success: true, data: [ folder ] });
	})
});

router.get('/folder/:id/images/', (req, res) => {
	const { id }  = req.params;
	if (!id) {
		return res.json({ success: false, error: 'No folder id provided' });
	}
	Image.find({'folder': id}, (error, images) => {
		if (error) return res.json({ success: false, error });
		//const { name } = req.body;
		return res.json( { success: true, data: images });
	})
});

/*router.put('/comments/:commentId', (req, res) => {
	console.log(req.params);
	const { commentId } = req.params;
	if (!commentId) {
		return res.json({ success: false, error: 'No comment id provided' });
	}
	Comment.findById(commentId, (error, comment) => {
		if (error) return res.json({ success: false, error });
		const { author, text } = req.body;
		if (author) comment.author = author;
		if (text) comment.text = text;
		comment.save(error => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});
});

router.delete('/comments/:commentId', (req, res) => {
	const { commentId } = req.params;
	if (!commentId) {
		return res.json({ success: false, error: 'No comment id provided' });
	}
	Comment.remove({ _id: commentId }, (error, comment) => {
		if (error) return res.json({ success: false, error });
		return res.json({ success: true });
	});
});*/

// Use our router configuration when we call /api
app.use('/uploads', express.static('uploads'));
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));