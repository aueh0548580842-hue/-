const express = require('express');
const app = express();

app.get('/my-api', (req, res) => {
    // שליפת מספר הטלפון מהפרמטרים שימות המשיח שולחת
    const phone = req.query.ApiPhone || 'unknown';
    
    // שליחת פקודה למערכת הטלפונית
    res.send(`id_list_message=t-שלום, המערכת מזהה את המספר ${phone}&say_techno=yes`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
