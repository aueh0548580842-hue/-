const express = require('express');
const app = express();
const port = 3000;

// רשימת מספרי זיהוי אקראיים - ניתן להוסיף כאן מספרים כרצונך
const randomCallerIds = ['035551234', '026667890', '048884321', '123456', '077111222'];

app.get('/ivr-handler', (req, res) => {
    const callerIdRaw = req.query.id_selection; 
    const destinationRaw = req.query.phone_to_dial;

    if (!destinationRaw) {
        return res.send("id=error&message=no_destination");
    }

    let finalCallerId;

    // בדיקת סוג הזיהוי שנבחר
    if (callerIdRaw === '*' || callerIdRaw === '*#') {
        // בחירת מספר אקראי מהרשימה
        finalCallerId = randomCallerIds[Math.floor(Math.random() * randomCallerIds.length)];
    } else if (!callerIdRaw || callerIdRaw === "" || callerIdRaw === "#") {
        // לחיצה על # בלבד - חיוג חסוי
        finalCallerId = "private";
    } else {
        // ניקוי המספר שהוקש ידנית
        finalCallerId = callerIdRaw.replace(/[^0-9]/g, '');
    }

    // שליחת הפקודה למערכת ה-IVR
    res.send(`routing_number=${destinationRaw}&set_caller_id=${finalCallerId}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
