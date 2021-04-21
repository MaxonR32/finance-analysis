export const imgFilter = (req, file, callback) => {
	if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		return callback(new Error('Only extension jpg, jpeg or png are allowed'), false)
	}

	callback(null, true)
}