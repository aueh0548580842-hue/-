const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection;
    const phoneToDial = req.query.phone_to_dial;

    // שלב א: קליטת מספר זיהוי (מאפשר כוכבית)
    if (!idSelection) {
        // הוספנו 0123456789* כדי לאפשר הקשת כוכבית
        return res.send(`read=t-נא הקש את מספר הזיהוי הרצוי, למספר אקראי הקש כוכבית, ובסיום סולמית=id_selection,no,15,1,7,#,yes,0123456789*`);
    }

    // קביעת טקסט האישור
    let idTypeMessage = "";
    let callerId = "";

    if (idSelection === "*") {
        callerId = "rand";
        idTypeMessage = "בחרת בזיהוי אקראי.";
    } else if (idSelection === "" || idSelection === "#") {
        callerId = "private";
        idTypeMessage = "בחרת בזיהוי חסוי.";
    } else {
        callerId = idSelection;
        idTypeMessage = `הזיהוי שנבחר הוא ${idSelection.split('').join(' ')}.`;
    }

    // שלב ב: קליטת מספר יעד
    if (!phoneToDial) {
        return res.send(`read=t-${idTypeMessage} נא הקש כעת את מספר היעד ובסיום סולמית=phone_to_dial,no,15,1,7,#,yes,0123456789&id_selection=${idSelection}`);
    }

    // שלב ג: ביצוע החיוג
    res.send(`routing_number=${phoneToDial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
