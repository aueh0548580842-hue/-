const express = require("express");
const app = express();

// מאפשר קריאה גם ל-POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET (לבדיקה בדפדפן)
app.get("/caller", (req, res) => {
    const phone = req.query.routing_phone_to_dial;
    const id = req.query.routing_id_selection;
    console.log("Phone:", phone, "ID:", id);
    res.send("OK");
});

// POST (ל-IVR)
app.post("/caller", (req, res) => {
    const phone = req.body.routing_phone_to_dial || req.query.routing_phone_to_dial;
    const id = req.body.routing_id_selection || req.query.routing_id_selection;
    console.log("Phone:", phone, "ID:", id);
    res.send("OK");
});

app.listen(3000, () => console.log("Server running"));
