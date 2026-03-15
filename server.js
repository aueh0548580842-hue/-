const express = require('express');
const app = express();

app.get('/my-api', (req, res) => {
    const callerId = req.query.ApiEnterID_1;
    const destination = req.query.ApiEnterID_2;

    // שלב 1: בקשת מספר זיהוי מהמחייג
    if (!callerId) {
        return res.send("read=t-נא הקש מספר זיהוי רצוי ובסיום סולמית=chosen_id,yes,10,3,10,No,yes,no");
    }

    // שלב 2: בקשת מספר יעד לחיוג
    if (!destination) {
        return res.send("read=t-נא הקש את מספר היעד ובסיום סולמית=dest_id,yes,10,3,10,No,yes,no");
    }

    // שלב 3: ביצוע החיוג
    console.log(`Routing call from ${callerId} to ${destination}`);
    res.send(`routing_caller_id=${callerId}&go_to_address=api_phone_dial=${destination}`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
