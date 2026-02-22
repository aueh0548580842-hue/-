const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection;
    const phoneToDial = req.query.phone_to_dial;

    // שלב א: קליטת מספר זיהוי
    if (!idSelection) {
        return res.send(`read=t-נא הקש את מספר הזיהוי הרצוי, למספר אקראי הקש כוכבית, ובסיום סולמית=id_selection,no,15,1,7,#,yes`);
    }

    // שלב ב: קליטת מספר יעד (כולל חו"ל)
    if (!phoneToDial) {
        // שינינו את המקסימום ל-15 ספרות כדי לאפשר קידומות בינלאומיות
        return res.send(`read=t-נא הקש את מספר היעד. לחיוג לחוץ לארץ הקש אפס אפס, קידומת מדינה ומספר, ובסיום סולמית=phone_to_dial,no,15,1,7,#,yes&id_selection=${idSelection}`);
    }

    // שלב ג: עיבוד הזיהוי וביצוע חיוג
    let callerId = "";
    if (idSelection === "*") {
        callerId = "rand";
    } else if (idSelection === "" || idSelection === "#") {
        callerId = "private";
    } else {
        callerId = idSelection;
    }

    // שליחת פקודת חיוג
    res.send(`routing_number=${phoneToDial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
