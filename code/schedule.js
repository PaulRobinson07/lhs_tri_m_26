first_days = [0,0,0,0,0,0,0,4,0,0,0,0];
last_days = [30,27,30,29,30,29,30,30,29,30,29,29];
current_month = 7;
var elements = document.getElementsByClassName("date");
for (i=0;i<elements.length;i++) {
	elements[i].innerHTML = pick_day(i);
}
var element_month = document.getElementsByClassName("schedule_month");
//element_month[0].innerHTML = (current_month+1);
element_month[0].innerHTML = ("August");
function pick_day(a) {
	if (first_days[current_month] >a || last_days[current_month]<a-4){
		return "";
	}
	b=a%7;
	switch(b) {
		case 0:
			date = 'Monday ' + (current_month+1) + "/" + (a-3);
			return date;
		case 1:
			date = 'Tuesday ' + (current_month+1) + "/" + (a-3);
			return date;
		case 2:
			date = 'Wednesday ' + (current_month+1) + "/" + (a-3);
			return date;
		case 3:
			date = 'Thursday ' + (current_month+1) + "/" + (a-3);
			return date;
		case 4:
			date = 'Friday ' + (current_month+1) + "/" + (a-3);
			return date;
		case 5:
			date = 'Saturday ' + (current_month+1) + "/" + (a-3);
			return date;
		case 6:
			date = 'Sunday ' + (current_month+1) + "/" + (a-3);
			return date;
		default:
			return 1;
	}
}
