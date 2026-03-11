const express = require("express");
const app = express();

// מאפשר קריאה גם ל-POST וגם ל-GET
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// רשימה זמנית בזיכרון להצגת כל השיחות (לבדיקה)
let calls = [];

// GET – לבדיקה בדפדפן
app.get("/caller", (req, res) => {
    const phone = req.query.routing_phone_to_dial;
    const id = req.query.routing_id_selection;
    console.log("Phone:", phone, "ID:", id);

    // שמירה בזיכרון
    if(phone && id){
        calls.push({ phone, id, time: new Date().toLocaleString() });
    }

    res.send("OK");
});

// POST – קריאות מה-IVR
app.post("/caller", (req, res) => {
    const phone = req.body.routing_phone_to_dial || req.query.routing_phone_to_dial;
    const id = req.body.routing_id_selection || req.query.routing_id_selection;
    console.log("Phone:", phone, "ID:", id);

    if(phone && id){
        calls.push({ phone, id, time: new Date().toLocaleString() });
    }

    res.send("OK");
});

// דף להצגת כל השיחות בזמן אמת
app.get("/calls", (req, res) => {
    res.json(calls);
});

app.listen(3000, () => console.log("Server running"));
