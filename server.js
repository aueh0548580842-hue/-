const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection || "";
    const phoneToDial = req.query.phone_to_dial || "";

    let callerId = "";
    if (idSelection === "*" || idSelection === "rand") {
        callerId = "rand";
    } else if (idSelection === "#" || idSelection === "" || idSelection === "private") {
        callerId = "private";
    } else {
        callerId = idSelection;
    }

    res.send(`routing_number=${phoneToDial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
