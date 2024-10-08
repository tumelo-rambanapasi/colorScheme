document.addEventListener("DOMContentLoaded", function() {

   const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";
   //const url = "http://localhost/practice/project1/sample-colors.php.json";
   const article = document.querySelector(".scheme-group");
   const loader = document.getElementById("loader");
   
   let fieldset = document.querySelector("fieldset");
   let asideH = document.querySelector("aside h2");
   
   async function getData(url) {
   		let response = await fetch (url);
   		let data = await response.json();
   		let allColors = data;
		loader.style.display = "none";
		data.forEach(scheme => {
			assemble(getContent(scheme));
		})
		article.addEventListener("click", (e) => {
			let flag = false;
		   	if (e.target && e.target.nodeName === "BUTTON") {
		   		let palette = allColors.find(palette => palette.id == e.target.dataset.id);
		   		if (palette) {
		   			flag = true;
		   		};
		 		if (flag) {
	   				asideH.textContent = palette.title;
	   				fieldset.innerHTML = "";
	   				palette.scheme.forEach(color => {
	   					let asideDiv = document.createElement("div");
	   					fieldset.appendChild(asideDiv);
	   					asideDiv.className = "colorRow";
	   					let detailDiv = document.createElement("div");
	   					detailDiv.className = "detailBox";
	   					detailDiv.style.backgroundColor = color.web;
	   					asideDiv.appendChild(detailDiv);
	   					let span1 = document.createElement("span");
	   					asideDiv.appendChild(span1);
	   					span1.textContent = color.web;
	   					let span2 = document.createElement("span");
	   					span2.textContent = `rgb(${color.color.red}, ${color.color.blue}, ${color.color.green})`;
	   					asideDiv.appendChild(span2);
	   					let label = document.createElement("label");
	   					asideDiv.appendChild(label);
	   					label.textContent = color.name;
	   				});
   					flag = false;
   				};		   		  		
		   	};	
	  	});					
   };
   
   getData(url);
   
   	function getContent(scheme) {
   		let h3 = document.createElement("h3");
   		h3.textContent = scheme.title;
   		let section = document.createElement("section");
   		section.className = "scheme";
   		let div1 = document.createElement("div");
   		div1.className = "preview";
		let colors = getColorArray(scheme);
   		for (let i = 0; i < 5; i++) {
   			window[`colorDiv${i}`] = document.createElement("div");
   			window[`colorDiv${i}`].className = "color-box";
   			window[`colorDiv${i}`].style.backgroundColor = colors[i];
   		};
   		let div2 = document.createElement("div");
   		div2.className = "actions";
   		let viewBtn = document.createElement("button");
   		viewBtn.textContent = "View";
   		viewBtn.dataset.id = scheme.id;
   		let obj = {};
   		obj.h3 = h3;
   		obj.section = section;
   		obj.div1 = div1;
   		obj.colorDiv0 = colorDiv0;
   		obj.colorDiv1 = colorDiv1;
   		obj.colorDiv2 = colorDiv2;
   		obj.colorDiv3 = colorDiv3;
   		obj.colorDiv4 = colorDiv4;
   		obj.div2 = div2;
   		obj.viewBtn = viewBtn;
   		return obj;
   		
   	};
   	
   	function assemble(content) {
   		appendChildren(article, content.h3, content.section);
   		appendChildren(content.section, content.div1, content.div2);
   		appendChildren(content.div1, content.colorDiv0, content.colorDiv1, content.colorDiv2, content.colorDiv3, content.colorDiv4);
   		appendChildren(content.div2, content.viewBtn);
   	};
   	
   	function appendChildren (parent, ...children) {
   		children.forEach(child => parent.appendChild(child));
   	}
   	
   	function getColorArray(colorScheme) {
   		let colorArray = [];
   		colorScheme.scheme.forEach(scObj => colorArray.push(scObj.web));
   		return colorArray;
   	};		
});
