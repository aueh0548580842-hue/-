const express = require("express");

const app = express();

app.get("/caller", (req, res) => {

    const phone = req.query.routing_phone_to_dial || "";
    const id = req.query.routing_id_selection || "";

    console.log("Phone:", phone);
    console.log("ID:", id);

    res.send("OK");

});

app.listen(3000, () => {
    console.log("Server running");
});
