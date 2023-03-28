//basic health endpoint
function health(req, res) {
  return res.status(200).send("Healthy");
}

module.exports.health = health;
