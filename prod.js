var products = [];
var prodid = 1;
var cartid = 1;
var cartArray = [];
var bt = document.getElementById('bt1');
var div1 = document.getElementById('div1');
var div2 = document.getElementById('div2');
var tab = document.getElementById('div3');
var bt2 = document.getElementById('bt2');
var f = 0;
var carr = JSON.parse(localStorage.getItem("2"));
var parr  = JSON.parse(localStorage.getItem("1"));

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
    	alert(this.responseText);
    	if(this.responseText)
    	{
    		parr = JSON.parse(this.responseText);
    	}
       }
  };
xhttp.open("GET", "/getURL");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send();

if(carr)
{
	cartArray = carr;
}
if(parr)
{
	products = parr;
}
function check()
{
	var di1 = document.getElementById('di1');
	di1.innerHTML = "Total Price = "+ JSON.parse(localStorage.getItem("3"));
	var h = document.getElementById('home');
	h.addEventListener("click",function(event)
		{
			window.location = "addproducts.html";
		});
}
function noItemsInCart(hed)
{
	hed.setAttribute("style","font-size:100px;align-items:center;padding:50px;");
	hed.innerHTML ="!Oops No Items In Cart";
}
function pgload()
{
	var tab1 = document.getElementById('tab1');
	var tab2 = document.getElementById('tab2');
	var div1 = document.getElementById('div1');
	var div2 = document.getElementById('div2');

	console.log(carr);
	if(cartArray.length==0)
	{
		tab1.style.visibility = "hidden";
		tab2.style.visibility = "hidden";
		var dis = document.getElementById('i6');
		dis.style.visibility = "hidden";
		//div1.style.visibility = "hidden";
		//div2.style.visibility = "hidden";
		var hed = document.getElementById('p');
		hed.style.visibility = "hidden";
		noItemsInCart(hed);
	}
	else
	{
		console.log(carr);
		var hed = document.getElementById('p');
		hed.style.display = "none";
		tab1.style.visibility = "visible";
		tab2.style.visibility = "visible";
		//div1.style.visibility = "visible";
		//div2.style.visibility = "visible";
		var row = document.createElement("tr");
		var col = document.createElement("td");
		col.setAttribute("style","height:30px;width:900px;text-align: center");
		col.setAttribute("colspan","2");
		col.innerHTML = "Total Price ";
		row.appendChild(col);
		var col1 = document.createElement("td");
		col1.setAttribute("style","height:30px;width:450px;text-align: center");
		row.appendChild(col1);
		tab2.appendChild(row);
		for(var i=0;i < cartArray.length;i++)
		{
				displayCart(tab1,cartArray[i],col1,tab2,div1,div2);

		}
		var tempcart = document.getElementById("cartid");
	}
	    var home = document.getElementById('home');
		home.addEventListener("click",function(event)
		{
			window.location ="addproducts.html";
		});	
}
function nav()
{
	document.location.href="discart.html";
}
function loadproduct()
{
	if(products.length==0)
	{
		tab.style.visibility ="hidden";
	}
	else
	{
		console.log(parr);
		var row = document.createElement("tr");
		var col = document.createElement("td");
		col.innerHTML = "Sr.no";
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = "Name";
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = "Description";
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = "Price";
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = "Quantity";
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = "Options";
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		col.setAttribute("colspan","3");
		row.appendChild(col);
		tab.appendChild(row);
		var i;
		for(i=0;i < parr.length;i++)
		{
			display(parr[i]);
		}
		prodid=parr[i-1].Id+1;
		for(var j=0;j<products.length;j++)
		{
			if(products[j].Quantity==0)
			{
				var b = document.getElementById(products[j].Id*10);
				b.disabled = true;
			}
		}
	}
	bt.addEventListener("click",function(event)
	{
		bt.disabled = true;
		create_add();
	});
}
function div1ToArray()
{
	var obj = new Object();
	obj.Id = prodid;
	obj.Name = document.getElementById("nameid").value;
	obj.Description = document.getElementById("desid").value;
	obj.Price = document.getElementById("priid").value;
	obj.Quantity = document.getElementById("quanid").value;
	obj.count = 0;

	products.push(obj);
	localStorage.setItem("1",JSON.stringify(products));
					xhttp.open("POST", "/products");
					xhttp.setRequestHeader("Content-Type", "application/json");
					xhttp.send(JSON.stringify(obj));
	display(obj);
	prodid++;
}
	
function display(obj)
{
		tab.style.visibility ="visible";
		var row = document.createElement("tr");
		row.setAttribute("id",obj.Id);
		var col = document.createElement("td");
		col.innerHTML = obj.Id;
		col.setAttribute("style","height:30px;width: 100px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = obj.Name;
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = obj.Description;
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = obj.Price;
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		col.innerHTML = obj.Quantity;
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		row.appendChild(col);
		var col = document.createElement("td");
		var but = document.createElement("button");
		but.setAttribute("id","btn2");
		but.innerHTML = "Delete";
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		col.appendChild(but);
		row.appendChild(col);
		var col = document.createElement("td");
		var edb = document.createElement("button");
		edb.innerHTML = "Edit";
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		col.appendChild(edb);
		row.appendChild(col);
		var col = document.createElement("td");
		var cart = document.createElement("button");
		cart.innerHTML = "Add to Cart";
		cart.setAttribute("id",obj.Id*10);
		col.setAttribute("style","height:30px;width: 175px;text-align: center");
		col.appendChild(cart);
		row.appendChild(col);
		tab.appendChild(row);

		but.addEventListener("click",function(event)
		{		
				var del = event.target.parentNode.parentNode;
				var index = getIndex(parseInt(del.id));
				removefromProducts(index);
				del.remove();
				if(products.length==0)
				{
					localStorage.removeItem("2");
					cartArray = [];
					prodid=1;
					tab.style.visibility =" hidden";
				}
		});
		edb.addEventListener("click",function(event)
		{
				var ed = event.target.parentNode.parentNode;
				var index = getIndex(parseInt(ed.id));
				putForm(index);
		});
		cart.addEventListener("click",function(event)
			{
				var car = event.target.parentNode.parentNode;
				var index = getIndex(parseInt(car.id));
				addToCart(index,cart);
				window.location.reload();
			});
}
function getIndex(id)
{
	for(var i=0;i<products.length;i++)
	{
		if(products[i].Id==id)
		{
			return i;
		}
	}
}
function removefromProducts(index)
{
	products.splice(index,1);
	localStorage.setItem("1",JSON.stringify(products));
}
function create_add()
{
	if(div1.style.display ==="none")
	{
		div1.style.display = "block";
		while(div1.firstChild)
		{
			div1.removeChild(div1.firstChild);
		}
	}


	var br = document.createElement("br");
	div1.appendChild(br);

	var nlab = document.createElement("label");
	nlab.innerHTML="Name : ";
	div1.appendChild(nlab);
	var ninp = document.createElement("input");
	ninp.setAttribute("type","text");
	ninp.setAttribute("placeholder","Enter item name");
	ninp.setAttribute("id","nameid")
	div1.appendChild(ninp);

	var br = document.createElement("br");
	div1.appendChild(br);
	var br = document.createElement("br");
	div1.appendChild(br);

	var indiv = document.createElement("div");
	var deslab = document.createElement("label");
	deslab.innerHTML="Description : ";
	deslab.setAttribute("for","desid");
	indiv.appendChild(deslab);

	var desinp = document.createElement("textarea");
	desinp.setAttribute("id","desid");
	desinp.setAttribute("style","vertical-align: middle;");
	desinp.setAttribute("placeholder","Describe your product");
	indiv.appendChild(desinp);
	div1.appendChild(indiv);

	var br = document.createElement("br");
	div1.appendChild(br);
		
	var prilab = document.createElement("label");
	prilab.innerHTML="Price :  " ;
	div1.appendChild(prilab);
	var priinp = document.createElement("input");
	priinp.setAttribute("id","priid");
	priinp.setAttribute("type","number");
	priinp.setAttribute("placeholder","Enter Price");
	div1.appendChild(priinp);

	var br = document.createElement("br");
	div1.appendChild(br);
	var br = document.createElement("br");
	div1.appendChild(br);


	var quanlab = document.createElement("label");
	quanlab.innerHTML="Quantity :  " ;
	div1.appendChild(quanlab);
	var quaninp = document.createElement("input");
	quaninp.setAttribute("id","quanid");
	quaninp.setAttribute("type","number");
	quaninp.setAttribute("placeholder","Enter Quantity");
	div1.appendChild(quaninp);

	var br = document.createElement("br");
	div1.appendChild(br);
	var br = document.createElement("br");
	div1.appendChild(br);

	var btn = document.createElement("button");
	btn.innerHTML="Add Product";
	btn.setAttribute("id","addbtn");
	div1.appendChild(btn);

	var br = document.createElement("br");
	div1.appendChild(br);
	var br = document.createElement("br");
	div1.appendChild(br);

	btn.addEventListener("click",function(event){
		div1ToArray();
		if(bt.disabled)
		{
			bt.disabled = false;
		}
		div1.style.display = "none";
	} );


}
// function for edit form 1
function putForm(index)
{
	div1.style.display = " none";
	div2.style.display = "none";
	tab.style.display = "none";

	var div4 = document.createElement('div');
	div4.setAttribute("id","div4");
	document.getElementsByTagName('body')[0].appendChild(div4);
	createEditDiv(div4,index);
}
// function for edit form 2
function createEditDiv(div4,index)
{	
	var br = document.createElement("br");
	div4.appendChild(br);

	var nlab = document.createElement("label");
	nlab.innerHTML="Name : ";
	div4.appendChild(nlab);
	var ninp = document.createElement("input");
	ninp.setAttribute("type","text");
	ninp.setAttribute("placeholder","Enter item name");
	ninp.setAttribute("id","nameid")
	div4.appendChild(ninp);
	ninp.value = products[index].Name;

	var br = document.createElement("br");
	div4.appendChild(br);
	var br = document.createElement("br");
	div4.appendChild(br);

	var indiv = document.createElement("div");
	var deslab = document.createElement("label");
	deslab.innerHTML="Description : ";
	deslab.setAttribute("for","desid");
	indiv.appendChild(deslab);

	var desinp = document.createElement("textarea");
	desinp.setAttribute("id","desid");
	desinp.setAttribute("style","vertical-align: middle;");
	desinp.setAttribute("placeholder","Describe your product");
	indiv.appendChild(desinp);
	div4.appendChild(indiv);
	desinp.value = products[index].Description;

	var br = document.createElement("br");
	div4.appendChild(br);
	
	var prilab = document.createElement("label");
	prilab.innerHTML="Price :  " ;
	div4.appendChild(prilab);
	var priinp = document.createElement("input");
	priinp.setAttribute("id","priid");
	priinp.setAttribute("type","number");
	priinp.setAttribute("placeholder","Enter Price");
	div4.appendChild(priinp);
	priinp.value = products[index].Price;

	var br = document.createElement("br");
	div4.appendChild(br);
	var br = document.createElement("br");
	div4.appendChild(br);


	var quanlab = document.createElement("label");
	quanlab.innerHTML="Quantity :  " ;
	div4.appendChild(quanlab);
	var quaninp = document.createElement("input");
	quaninp.setAttribute("id","quanid");
	quaninp.setAttribute("type","number");
	quaninp.setAttribute("placeholder","Enter Quantity");
	div4.appendChild(quaninp);
	quaninp.value = products[index].Quantity;

	var br = document.createElement("br");
	div4.appendChild(br);
	var br = document.createElement("br");
	div4.appendChild(br);

	var sav = document.createElement("button");
	sav.innerHTML ="save";
	div4.appendChild(sav);
	sav.addEventListener("click",function(event)
	{
			products[index].Name = ninp.value;
			products[index].Description = desinp.value;
			products[index].Price = priinp.value;
			products[index].Quantity = quaninp.value;
			localStorage.setItem("1",JSON.stringify(products));
			window.location.reload();
			sav.remove();
			div4.remove();
			changeCartAfterEdit(index);
	});

}
function addToCart(index,cart)
{
	var flag = 0;
	if(cartArray)
	{

		for(var i=0;i < cartArray.length;i++)
		{
			if((cartArray[i].Name) == (products[index].Name))
			{
				cartArray[i].Quantity++;
				++products[index].count;
				products[index].Quantity--;
				if(products[index].Quantity == 0)
				{
					cart.disabled=true;
				}
				flag = 1;
				break;
			}
		}
	}	
	if(flag == 0)
	{
				var ob = new Object();
				ob.Id=products[index].Id;
				ob.Name = products[index].Name;
				ob.Price = products[index].Price;
				ob.Quantity = ++products[index].count;
				products[index].Quantity--;
				if(products[index].Quantity == 0)
				{
					cart.disabled=true;
				}
				cartArray.push(ob);
	}
	localStorage.setItem("1",JSON.stringify(products));
	localStorage.setItem("2",JSON.stringify(cartArray));
}
function displayCart(tab1,ele,col1,tab2,div1,div2)
{
	var row = document.createElement("tr");
	row.setAttribute("id",ele.Id);
	var col = document.createElement("td");
	col.innerHTML = ele.Name;
	col.setAttribute("style","height:30px;width: 450px;text-align: center");
	row.appendChild(col);
	var col = document.createElement("td");
	col.setAttribute("style","height:30px;width: 450px;text-align: center");
	var minus = document.createElement("a");
	minus.setAttribute("href","#");
	minus.setAttribute("style","text-decoration:none;padding:10px;")
	minus.innerHTML = "-";
    col.appendChild(minus);
    var quanc = document.createElement("a");
    quanc.innerHTML = ele.Quantity;
    col.appendChild(quanc);
    var plus = document.createElement("a");
    plus.setAttribute("href","#");
    plus.setAttribute("style","text-decoration:none;padding:10px;");
    plus.innerHTML = "+";
    col.appendChild(plus);
	row.appendChild(col);
	var col = document.createElement("td");
	col.innerHTML = ele.Price;
	col.setAttribute("style","height:30px;width: 450px;text-align: center");
	row.appendChild(col);
	tab1.appendChild(row);

	minus.addEventListener("click",function(event)
	{
		var dec = event.target.parentNode.parentNode;
		var index = parseInt(dec.id);
		for(var i =0;i < cartArray.length;i++)
		{
			if(cartArray[i].Id == index)
			{
				index = getIndex(index);
				if(cartArray[i].Quantity == 1)
				{
					cartArray.splice(i,1);
					products[index].count=0;
					products[index].Quantity++;
					console.log(cartArray);
					break;
				}
				products[index].Quantity++;
				cartArray[i].Quantity--;
				break;
			}
		}
		if(cartArray.length == 0)
		{
			tab1.style.visibility = "hidden";
			tab2.style.visibility = "hidden";
			div1.style.visibility = "hidden";
			div2.style.visibility = "hidden";
 		}
		localStorage.setItem("1",JSON.stringify(products));
		localStorage.setItem("2",JSON.stringify(cartArray));
		window.location.reload();
	});

	plus.addEventListener("click",function(event)
	{
		var dec = event.target.parentNode.parentNode;
		var index = parseInt(dec.id);
		for(var i =0;i < cartArray.length;i++)
		{
			if(cartArray[i].Id == index)
			{
				index = getIndex(index);
				if(products[index].Quantity == 0)
				{
					break;
				}
				products[index].Quantity--;
				cartArray[i].Quantity++;
				break;
			}
		}
		localStorage.setItem("1",JSON.stringify(products));
		localStorage.setItem("2",JSON.stringify(cartArray));
		window.location.reload();
	});

    var sum=0;
    for(var j = 0;j < cartArray.length; j++)
    {
    		sum=sum+cartArray[j].Quantity*cartArray[j].Price;
    }	
    col1.innerHTML = sum;
    localStorage.setItem("3",JSON.stringify(sum));
    var checkout = document.getElementById("checkout");
    checkout.addEventListener("click",function(event)
    	{
    		window.location = "checkout.html";
    	});
}
function changeCartAfterEdit(index)
{
	for(var i=0;i < cartArray.length;i++)
	{
		if(cartArray[i].Id == products[index].Id)
		{
			cartArray[i].Name = products[index].Name;
			cartArray[i].Quantity = products[index].Quantity;
			cartArray[i].Price = products[index].Price;
			break;
		}
	}
	localStorage.setItem("2",JSON.stringify(cartArray));
}
function cartIndex(index)
{
	for(var i=0;i < cartArray.length;i++)
	{
		if(index == cartArray[i].Id)
		{
			return i;
		}
	}
}
