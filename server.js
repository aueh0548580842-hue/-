const express = require('express');
const app = express();

app.get('/my-api', (req, res) => {
    const chosenCallerId = req.query.ApiEnterID_1; // המשתנה של מספר הזיהוי
    const destination = req.query.ApiEnterID_2;   // המשתנה של מספר היעד

    // שלב א': אם המתקשר עוד לא בחר מספר זיהוי
    if (!chosenCallerId) {
        return res.send("read=t-נא הקש את מספר הזיהוי הרצוי ובסיום סולמית=chosenCallerId,yes,10,3,10,No,yes,no");
    }

    // שלב ב': אם המתקשר בחר זיהוי אבל עוד לא בחר לאן לחייג
    if (!destination) {
        return res.send("read=t-נא הקש את מספר היעד לחיוג ובסיום סולמית=destination,yes,10,3,10,No,yes,no");
    }

    // שלב ג': ביצוע החיוג עם הזיהוי שהמתקשר בחר
    // אנחנו משלבים את הזיהוי מהשלב הראשון עם מספר היעד מהשלב השני
    res.send(`routing_caller_id=${chosenCallerId}&go_to_address=api_phone_dial=${destination}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
