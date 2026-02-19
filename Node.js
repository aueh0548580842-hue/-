const express = require('express');
const app = express();
const port = 3000;

// רשימת מספרי זיהוי אקראיים לבחירה - שנה את המספרים האלו למספרים שלך
const randomCallerIds = [
    '035551234',
    '026667890',
    '048884321',
    '077111222',
    '050999887'
];

app.get('/ivr-handler', (req, res) => {
    // קבלת הפרמטרים מה-IVR
    let callerId = req.query.id_selection; // מה שהמשתמש הקיש
    const destination = req.query.phone_to_dial; // מספר היעד לחיוג

    // הגנה: אם אין מספר יעד, אי אפשר להמשיך
    if (!destination) {
        return res.send("id=error&message=no_destination");
    }

    // לוגיקה 1: לחיצה על # בלבד (הקלט ריק) -> חיוג חסוי
    if (!callerId || callerId.trim() === "") {
        console.log("Empty input - Routing as Restricted/Private");
        return res.send(`routing_number=${destination}&set_caller_id=private`);
    }

    // לוגיקה 2: לחיצה על * ואז # -> בחירת מספר אקראי מהרשימה
    if (callerId.includes('*')) {
        const randomIndex = Math.floor(Math.random() * randomCallerIds.length);
        const selectedRandomId = randomCallerIds[randomIndex];
        console.log(`Random selection triggered: ${selectedRandomId}`);
        return res.send(`routing_number=${destination}&set_caller_id=${selectedRandomId}`);
    }

    // לוגיקה 3: הוקש מספר זיהוי (ניקוי תווים שאינם ספרות)
    const cleanId = callerId.replace(/[^0-9]/g, '');

    if (cleanId.length >= 1 && cleanId.length <= 20) {
        console.log(`Manual ID selected: ${cleanId}`);
        return res.send(`routing_number=${destination}&set_caller_id=${cleanId}`);
    }

    // ברירת מחדל למקרה של קלט לא תקין
    res.send("id=error&message=invalid_input");
});

app.listen(port, () => {
    console.log(`IVR Server is running on port ${port}`);
});
