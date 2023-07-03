יש לך מערך של נניח כמות מסויימת של urls של api ואת רוצה לבצע קריאות לכולם ולהדפיס את התשובות שלהם.. 


תכתבי פונקציה שמדפיסה את התשובה שחוזרת מכל לינק, לפי הסדר של הלינקים במערך, אבל.. כל הרעיון הוא לא לחכות עד שכולם יסיימו ורק אז להדפיס, אלא להדפיס ברגע שקיבלת את ה response עבור כל url, ורק אם ה response של הלינק הקודם כבר הודפס..

כלומר אני אתן דוגמה:

נניח שיש לך 6 לינקים.. הראשון חזר אחרי 10 מילישניות אז הדפסת השני חזר אחרי 20 מילישניות אז גם הדפסת. השלישי עוד לא חזר.. בינתיים הרביעי והשישי חזרו

בשלב הזה לא יודפס כלום כי מחכים שיחזור השלישי.. 

ואז חוזר השלישי, אז אנחנו מדפיסים את התשובה שלו ובגלל שגם הרביעי כבר חזר (עוד לפני שהשלישי חזר) אז אנחנו נדפיס גם אותו.. בתכלס יש לנו את המידע גם של הלינק השישי אבל הלינק החמישי עוד לא החזיר תשובה. אז לא נדפיס אותו עדיין, נחכה שתחזור התשובה מהלינק החמישי ואז ברגע שהחמישי יחזיר תשובה אנחנו נדפיס את 5 ואת 6

________________________________________________________________________________________

בגדול אני אתן לך מבנה כלשהו של אובייקט תכף שמייצג יוזרים וקבוצות.. עכשיו זה כאילו ה db שלך לצורך העניין..

דמייני משהו בסגנון ג׳ירה כזה שמישהו עושה @ ועושה mention ליוזר.. 

אז ברגע שיש מנשן ליוזר אנחנו רוצים לשלוח לו מייל (במקרה הזה סתם לעשות קונסול לוג חח)

עכשיו כאן מגיע הקטע הטריקי. אפשר לעשות גם מנשן לא ליוזר אלא לקבוצה. 

נגיד יש קבוצה שנקראת the cool guys  וחברים בה 5 יוזרים, אז אם עשו מנשן, אז ההודעה הזאת תשלח לכל ההחברים של הקבוצה.

עוד מקרה: נגיד שאני גם חבר בקבוצה ועשו מנשן לקבוצה, וגם עשו מנשן לשם שלי אישית אז אני לא אקבל פעמיים את ההודעה אלא רק פעם אחת.. 

const users = {

  1: {

    id: 1,

    name: "Yossi",

    teamIds: [10, 20, 30]

  },

  2: {

    id: 2,

    name: "Moshe",

    teamIds: [10]

  },

  3: {

    id: 3,

    name: "Rita",

    teamIds: [40]

  },

  4: {

    id: 4,

    name: "Tali",

    teamIds: [30]

  },

  5: {

    id: 5,

    name: "Marry",

    teamIds: [10]

  },

};


function getMentions() {

  return [

    { ,type: "user", id: 1 },

    { type: "user", id: 3 },

    { type: "team", id: 30 }

  ];

}


function update() {

  const msg = "You were notified";

  const response = getMentions();


// ......... complete the function .........

}


update()

_______________________________________________________________


How do you know which database to choose - sql or noSQL? 




____________________________________________________________________________


There is a problem here, how would you solve it?



const Passcode = ({ onEnter }) => {

  const [passcode, setPasscode] = useState("");

	const [finalPass, setFinalPass] = useState("");

  useTimeout(() => onEnter(passcode), 1000 * 60)



  return (

    <>

      <input

        value={passcode}

        onChange={(e) => setPasscode(e.target.value)}

      />



      <button onClick={() => onEnter(passcode)}>Submit</button>

    </>

  );

};



const useTimeout = (fn, delay,finalPass) => {

  useEffect(() => {

   setTimeout(fn, delay);

  }, [delay, finalPass])



_______________________________________________________







Write a sum method which will work properly when invoked using either syntax below.

console.log(sum(2,3));   // Outputs 5

console.log(sum(2)(3));  // Outputs 5


_________________________________



implement promise.all



______________________________________________



https://www.toptal.com/javascript/interview-questions


