const Clarifai = require('clarifai');

const app = new Clarifai.App({
  		apiKey:'26304cb6b70d4bbcb409b8b041c09f36'
		});
const imageHandler = (req, res) => {
	 app.models
	 .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	 .then(data => {
	 	res.json(data);
	 })
	 .catch(err => res.status(400).json('unable to work with API'))

}

module.exports = {
	imageHandler: imageHandler
}