const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection;
    const phoneToDial = req.query.phone_to_dial;

    // שלב א: אם עדיין לא הוקש מספר זיהוי
    if (!idSelection) {
        return res.send(`read=t-נא הקש את מספר הזיהוי הרצוי, למספר אקראי הקש כוכבית, ובסיום סולמית=id_selection,no,10,1,7,#,yes`);
    }

    // שלב ב: אם יש זיהוי אבל עדיין לא הוקש מספר יעד
    if (!phoneToDial) {
        return res.send(`read=t-נא הקש את מספר היעד לחיוג ובסיום סולמית=phone_to_dial,no,10,1,7,#,yes&id_selection=${idSelection}`);
    }

    // שלב ג: יש את כל הנתונים - מבצעים חיוג
    let callerId = "";
    if (idSelection === "*") {
        callerId = "rand";
    } else if (idSelection === "" || idSelection === "#") {
        callerId = "private";
    } else {
        callerId = idSelection;
    }

    res.send(`routing_number=${phoneToDial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
