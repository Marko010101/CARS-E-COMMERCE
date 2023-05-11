var profit = prompt("ჩაწერეთ თქვენი ნავაჭრის მოგება-ზარალი.")

var sum = parseInt(profit)

if(sum >= 5000) {
    alert ("მარკეტი გაგიკოტრებია")
}
    
if(sum<=4999 && sum>=1000)  
    { alert("კარგია")
    
}
if(sum<=999 && sum>=500)
     { alert("ნორმალურია")

}
if(sum<499) 
    {alert("რასაპიირებ მერე")

}
