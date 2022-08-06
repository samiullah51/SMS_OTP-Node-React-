const Otp = require("../models/Otp");
const router = require("express").Router();
const accountSid = "AC2f4e21430769b066cce1c00ea4c194d6";
const authToken = "17c8aa359202647b18eff004319a2c1e";
const client = require("twilio")(accountSid, authToken);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Delete previous record of OTP
  await Otp.deleteOne({ email });

  const newUser = new Otp({
    email,
    password,
    otpCode: Math.floor(1000 + Math.random() * 1000),
  });
  try {
    const savedUser = await newUser.save();
    await client.messages
      .create({
        body: savedUser.otpCode,
        from: "+17079029819",
        to: "+923464285875",
      })
      .then(async (message) => {
        console.log(message);
        res.status(200).json(savedUser);
      });
    // Verify
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/login/confirm/", async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const confirmOtp = await Otp.findOne({ email: email, otpCode: otpCode });
    if (confirmOtp) {
      res.status(200).json(confirmOtp);
    } else {
      res.status(404).json({ Error: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
// const otp = req.params.otp;
//   const newOtp = new Otp({
//     otpCode: otp,
//   });
//   try {
//     // Send otp

//     await client.messages
//       .create({
//         body: otp,
//         from: "+17079029819",
//         to: "+923464285875",
//       })
//       .then(async (message) => {
//         const savedOtp = await newOtp.save();
//         res.status(200).json(savedOtp);
//       });
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
