const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const { id_selection, phone_to_dial } = req.query;

    // שלב 1: בקשת מספר זיהוי
    if (!id_selection) {
        return res.send(`read=t-נא להקיש מספר לזיהוי, לזיהוי אקראי הקש כוכבית, לזיהוי חסוי הקש סולמית=id_selection,no,15,1,7,#,yes,0123456789*#`);
    }

    // שלב 2: בקשת מספר יעד (העברת id_selection הלאה כדי למנוע ניתוק)
    if (!phone_to_dial) {
        let msg = id_selection.includes('*') ? "אקראי" : (id_selection === "#" ? "חסוי" : id_selection.split('').join(' '));
        return res.send(`read=t-זיהוי ${msg}. נא להקיש מספר יעד וסולמית=phone_to_dial,no,15,1,15,#,yes,0123456789&id_selection=${id_selection}`);
    }

    // שלב 3: חיוג סופי
    let callerId = id_selection.includes('*') ? "rand" : (id_selection === "#" ? "private" : id_selection);
    res.send(`routing_number=${phone_to_dial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
