const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection;
    const phoneToDial = req.query.phone_to_dial;

    // שלב א: אם המשתמש רק נכנס ואין עדיין בחירת זיהוי
    if (!idSelection) {
        return res.send(`read=t-נא הקש מספר לזיהוי, לכוכבית הקש כוכבית, ולזיהוי חסוי הקש סולמית=id_selection,no,15,1,7,#,yes,0123456789*#`);
    }

    // שלב ב: אם יש זיהוי אבל אין מספר יעד
    if (!phoneToDial) {
        let msg = "";
        if (idSelection === "*") msg = "בחרת זיהוי אקראי. ";
        else if (idSelection === "#") msg = "בחרת זיהוי חסוי. ";
        else msg = `הזיהוי הוא ${idSelection.split('').join(' ')}. `;

        return res.send(`read=t-${msg}נא הקש את מספר היעד ובסיום סולמית=phone_to_dial,no,15,1,7,#,yes,0123456789&id_selection=${idSelection}`);
    }

    // שלב ג: יש את כל הנתונים - מבצעים חיוג
    let callerId = "";
    if (idSelection === "*") callerId = "rand";
    else if (idSelection === "#") callerId = "private";
    else callerId = idSelection;

    res.send(`routing_number=${phoneToDial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
