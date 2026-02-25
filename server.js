const express = require('express');
const app = express();

app.get('/ivr-handler', (req, res) => {
    const idSelection = req.query.id_selection;
    const phoneToDial = req.query.phone_to_dial;

    // שלב א: קליטת מספר זיהוי / אקראי (*) / חסוי (#)
    if (!idSelection) {
        // digits_allowed מאפשר למערכת לקבל גם כוכבית וסולמית כקלט לגיטימי
        return res.send(`read=t-נא הקש את מספר הזיהוי הרצוי. לזיהוי אקראי הקש כוכבית, לזיהוי חסוי הקש סולמית בלבד=id_selection,no,15,1,7,#,yes,0123456789*#`);
    }

    // עיבוד הבחירה של המשתמש והכנת הודעה מתאימה
    let idTypeMessage = "";
    let callerId = "";

    if (idSelection === "*") {
        callerId = "rand";
        idTypeMessage = "בחרת בזיהוי אקראי.";
    } else if (idSelection === "" || idSelection === "#" || idSelection === "none") {
        callerId = "private";
        idTypeMessage = "בחרת בזיהוי חסוי.";
    } else {
        callerId = idSelection;
        // ה-split וה-join גורמים למערכת להקריא את המספר ספרה-ספרה
        idTypeMessage = `הזיהוי שנבחר הוא ${idSelection.split('').join(' ')}.`;
    }

    // שלב ב: קליטת מספר היעד (שרשור ה-id_selection מונע את ניתוק השיחה)
    if (!phoneToDial) {
        return res.send(`read=t-${idTypeMessage} נא הקש כעת את מספר היעד ובסיום סולמית=phone_to_dial,no,15,1,7,#,yes,0123456789&id_selection=${idSelection}`);
    }

    // שלב ג: ביצוע החיוג הסופי עם הפרמטרים שנאספו
    res.send(`routing_number=${phoneToDial}&set_caller_id=${callerId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
