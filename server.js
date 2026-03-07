const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection;
    const phoneToDial = req.query.phone_to_dial;

    // שלב א: בקשת מספר זיהוי (כוכבית = אקראי, סולמית = חסוי)
    if (!idSelection) {
        return res.send(`read=t-נא הקש מספר לזיהוי. לזיהוי אקראי הקש כוכבית. לזיהוי חסוי הקש סולמית בלבד=id_selection,no,15,1,7,#,yes,0123456789*#`);
    }

    // שלב ב: אישור הבחירה ובקשת מספר היעד
    if (!phoneToDial) {
        let msg = "";
        if (idSelection.includes("*")) {
            msg = "בחרת בזיהוי אקראי. ";
        } else if (idSelection === "#" || idSelection === "") {
            msg = "בחרת בזיהוי חסוי. ";
        } else {
            msg = `הזיהוי שנבחר הוא ${idSelection.split('').join(' ')}. `;
        }

        // חשוב: אנחנו שולחים את id_selection הלאה כדי שהחיוג ידע מה בחרת
        return res.send(`read=t-${msg}נא הקש מספר יעד ובסיום סולמית=phone_to_dial,no,15,1,15,#,yes,0123456789&id_selection=${idSelection}`);
    }

    // שלב ג: ביצוע החיוג הסופי
    let callerId = "";
    if (idSelection.includes("*")) {
        callerId = "rand";
    } else if (idSelection === "#" || idSelection === "") {
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
