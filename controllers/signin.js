const signinHandler = (bcrypt, db) => (req,res) => {
	console.log(req);
  // input validation
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
	db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
    	const isValid = bcrypt.compareSync(password, data[0].hash);
    	 if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
            console.log(res)
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
    }

    module.exports = {
      signinHandler:signinHandler
    }