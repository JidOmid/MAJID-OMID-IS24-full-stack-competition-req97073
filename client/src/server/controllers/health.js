function health(req, res) {
  console.log('hit')
  return res.status(200).send("Healthy");
}

module.exports.health = health;
