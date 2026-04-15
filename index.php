<?php
// קבלת הערך שהוקש
$val = isset($_GET['ApiVal']) ? $_GET['ApiVal'] : '';

if ($val != '') {
    // הפקודה המרכזית: הגדרת המשתנה ApiPhone לערך החדש ומעבר לשלוחה הבאה
    echo "set_var=ApiPhone=$val&go_to_folder=/1";
} else {
    // אם המשתמש רק נכנס, נבקש ממנו להקיש את המספר הרצוי
    echo "read=t-נא הקישו את מספר הזיהוי החדש לסיום הקישו סולמית=num,yes,1,1,10,Digits,no,yes";
}
?>
