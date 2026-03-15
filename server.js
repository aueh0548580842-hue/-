const express = require('express');
const app = express();

app.get('/my-api', (req, res) => {
    // הדפסה ל-Logs של Render כדי שתוכל לראות מה מגיע מהמערכת
    console.log("--- קריאה חדשה התקבלה ---");
    console.log("נתונים שהתקבלו:", req.query);

    const callerId = req.query.ApiEnterID_1;
    const destination = req.query.ApiEnterID_2;

    // שלב 1: בקשת מספר זיהוי
    if (!callerId) {
        console.log("סטטוס: חסר מספר זיהוי. שולח בקשת הקשה.");
        return res.send("read=t-נא הקש מספר זיהוי ובסיום סולמית=chosen_id,yes,10,3,10,No,yes,no");
    }

    // שלב 2: בקשת מספר יעד
    if (!destination) {
        console.log("סטטוס: יש זיהוי (" + callerId + "), חסר מספר יעד. שולח בקשת הקשה.");
        return res.send("read=t-נא הקש מספר יעד ובסיום סולמית=dest_id,yes,10,3,10,No,yes,no");
    }

    // שלב 3: ביצוע החיוג
    console.log(`סטטוס: מבצע חיוג! זיהוי: ${callerId}, יעד: ${destination}`);
    
    // הפקודה המלאה לחיוג
    res.send(`routing_caller_id=${callerId}&go_to_address=api_phone_dial=${destination}`);
});

// הגדרת פורט תואמת ל-Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`השרת רץ בהצלחה על פורט ${PORT}`);
});
