const Profile = require('../models/profile')

module.exports = {
create,
index,
delete: deleteOne
}

async function create (req, res) {
    const profile = await Profile.findOne({user: req.params.id})
    profile.favorites.push(req.body)
    await profile.save()
    res.json(profile)
}

async function index (req, res){
    const profile = await Profile.findOne({user: req.params.id})
    res.json(profile)
}

async function deleteOne (req, res) {
    let profile = await Profile.findOne({user: req.params.userId})
    profile.favorites.remove(req.params.id)
    await profile.save()
    res.json(profile)
}