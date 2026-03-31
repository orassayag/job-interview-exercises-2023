First:
======

Copy and paste the following code in the code editor, and implement the TODO comments under the "series" & "getItem" functions.
Remider the series definition is:
f(n) = f(n-1)+f(n-2)+f(n-3)
first items:
f(0)=0
f(1)=1
f(2)=1

(You can write solution in JavaScript or Python, see Python version below the javascript one)

// JavaScript version (Python version below)

// the series generator
function series() {
  // TODO: Init variables.
  let first;
  let second;
  let third;
  return () => {
    // TODO: Write code here.  
  }
}

//return the Nth item of the series
// 0, 1, 1, 2 ...
// e.g. getItem(0) -> 0
// getItem(3) -> 2
function getItem(n) {
    const seriesMaker = series();
    // TODO: Write code here.
    for () {
      seriesMaker();
    }
    return /* TODO: what is the return code? */;
}

==============

Second:
=======

We have a function that one of its side effects is sending an email. We would like to see that the function works correctly, but in a test environment we don't have access to send an email, how would you avoid this problem?

Find an example of a possible function below, keep in mind that you can change the implementation in order to meet your solution's requirement 
function registerUser(user) {
  saveUserToDB(user);
  sendVerificationEmail(user.email, user.getVerificationCode());
  return true;
}

=============

Third:
======

TABLE NAME: users
id	first_name	last_name	city	country	email	spend
336	Reg	Ellerker	Trzcianka	Poland	rellerker6m@canalblog.com	1306
358	Raye	Dawdary	Banh	Egypt	rdawdaryct@goo.ne.jp	1319
552	Barbie	Segar	Daigo	Japan	bsegar8a@youtube.com	398
980	Gar	Di Boldi	Roches Noire	Mauritius	gdiboldi1b@goo.gl	1490
1080	Guthry	Gives	Ripky	Ukraine	ggives70@nature.com	521
TABLE NAME: abandonment
user_id	abandon_date	minutes_spent
336	2020-03-09 10:26:05	386
358	2020-10-18 17:15:23	116
552	2020-09-15 22:08:19	120
980	2020-09-23 20:30:53	105
1080	2019-09-18 00:55:27	74

1
Task Instructions
Write a query that returns all the ID's of users who have abandoned the app in December 2019

2
Write a query that returns the second highest spender in the app. Return first and last name.

3.
Write a query that returns all users whose last name ends with ‘n’ and contains five characters. Return first_name.

4.
Write a query that returns all abandoned users that spent more than 70 minutes and less than 80 minutes on the app. Return first_name.

5.
How would you write a query to determine the top 3 spenders in the app, without using TOP or Limit method