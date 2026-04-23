const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const apiPhone = req.query.ApiPhone;
  
  if (apiPhone) {
    console.log(`התקבל מספר זיהוי חדש: ${apiPhone}`);
  }

  // מחזיר תשובה ריקה כדי לא לבלבל את המערכת
  res.send('');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
