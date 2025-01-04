const User = require("../model/user");
const { encrypt, decrypt } = require("../utils/encrypt_decrypt");

exports.addUser = (req, res, next) => {
  const { name, message } = req.body;
  const encryptedMessage = encrypt(message);

  const user = new User({
    name: name,
    message: encryptedMessage, 
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({ message: "User added successfully", userId: result._id });
    })
    .catch((err) => {
      console.error("Error adding user:", err);
      res.status(500).json({ error: "Failed to add user" });
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const decryptedMessage = decrypt(user.message);

      res.status(200).json({
        name: user.name,
        message: decryptedMessage, 
      });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Failed to fetch user" });
    });
};
