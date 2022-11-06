var GartnerPI_Widget=function(e){return new function(e){var t=this,i="//www.gartner.com",n="/reviews/home",r="/reviews/public/Widget/",s=function(e){console&&(console.log,Function)},a=function(e){return e=e||{},t.widget_id=e.widget_id,t.widget_id?(t.size=!e.size||"small"!==e.size&&"large"!==e.size&&"line"!==e.size?"small":e.size,t.theme=!e.theme||"light"!==e.theme&&"dark"!==e.theme?"light":e.theme,t.sourcingLink=e.sourcingLink||null,t.version=e.version||1,e.container&&e.container.nodeType&&1===e.container.nodeType?(t.container=e.container,d(),l(),T(),p(),void 0):void s("Required: You must specify a DOM element for the widget to render in")):void s("widget_id argument is required")},d=function(){if(!document.getElementById("gartner-pi-styles")){var e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("id","gartner-pi-styles"),e.setAttribute("type","text/css"),e.setAttribute("href",c()+r+"css/widget.css"),document.getElementsByTagName("head")[0].appendChild(e)}},p=function(){t.dataContainer=t.version<2?document.getElementById("gartner-pi-datacontainer"):document.getElementById("gartner-pi-datacontainer-"+t.widget_id);const e=t.version<2?"gartner-pi-widget-data":"gartner-pi-widget-data-"+t.widget_id;if(window.postMessage instanceof Function){var i=["data?widget_id=",t.widget_id,"&size=",t.size],n=document.createElement("iframe");n.setAttribute("src",c()+r+i.join("")),n.setAttribute("width",0),n.setAttribute("height",0),n.setAttribute("frameborder",0),n.setAttribute("id",e),t.container.appendChild(n)}else t.dataContainer.appendChild(f()),s("Message API not supported")},u=function(){t.list||(t.list=t.dataContainer.getElementsByTagName("ul")[0]);var e,i=t.list.getElementsByTagName("li")[0],n=i.offsetHeight,r=10,s=t.dataContainer.getElementsByClassName("gartner-pi-reviews")[0],a=setInterval(function(){e=s.scrollTop,e===n?(clearInterval(a),t.list.appendChild(i),setTimeout(u,1e4)):e>n?s.scrollTop-=20:s.scrollTop+=e+r>n?n-e:r},55)},o=function(e){e.origin.indexOf("gartner.com")>-1&&y(e.data)},l=function(){window.addEventListener("message",o,!1)},g=function(){window.removeEventListener("message",o),clearTimeout(self.animateId)},c=function(e){e=e||"";var t=window.location.protocol,n=window.location.host;return t+(n.indexOf("gartner.com")>-1?"//"+n:i)+e},h=function(e,i){return i=i||"vendor",e+"?utm_source="+i+"&utm_medium=referral&utm_campaign=widget&utm_content="+t.widget_id},v=function(e,i){if(e){(t.version<2?document.getElementById("gartner-pi-link"):document.getElementById("gartner-pi-link-"+t.widget_id)).href=c(h(e,i))}},m=function(e){var t=["January","February","March","April","May","June","July","August","September","October","November","December"],i=new Date(e);if("[object Date]"===Object.prototype.toString.call(i)){var n=i.getDate(),r=i.getFullYear();return t[i.getMonth()]+" "+n+", "+r}return""},w=function(){var e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=new Date,i=t.getDate(),n=t.getFullYear();return i+" "+e[t.getMonth()]+" "+n},f=function(){var e=document.createElement("div");e.setAttribute("class","gartner-pi-static-content");var t=[];return t.push('<div class="gartner-pi-no-data">'),t.push('<div class="gartner-pi-logo"></div>'),t.push('<h1 class="gartner-pi-default-msg gartner-pi-h1">Please visit Peer Insights to read and write reviews. '),t.push('<span class="gartner-pi-url">gartner.com/reviews</span>'),t.push("</h1>"),t.push("</div>"),e.innerHTML=t.join(""),e},b=function(){return'<div id="'+(t.version<2?"gartner-pi-datacontainer":"gartner-pi-datacontainer-"+t.widget_id)+'"></div>'},k=function(e){var t=Math.round(e/5*100),i=['<span class="gartner-pi-star-rating">'];return i.push('<span class="gartner-pi-star-rating-score" style="width:'+t+'%"></span>'),i.push("</span>"),i.join("")},y=function(e){(e="object"!=typeof e?JSON.parse(e):null)&&e.widgetId&&e.widgetId===t.widget_id&&(e&&e.error?t.dataContainer.appendChild(f()):null!==e&&t.dataContainer&&("line"===t.size?L(e):"large"===t.size?(A(e),e.vendor&&v(e.vendor.url,e.vendor.seoName),e.reviews&&e.reviews.length&&(self.animateId=setTimeout(u,1e4))):_(e)))},_=function(e){var i=C(e);t.dataContainer.innerHTML=i.join(""),v(e.url,e.seoName)},A=function(e){var i=e.reviews,n=e.vendor,r=C(n);r.push('<div class="gartner-pi-reviews">'),r.push("<ul>");for(var s=0;s<i.length;s++){var a=i[s];r.push("<li>"),r.push('<div class="gartner-pi-rating-container">'),r.push(k(a.rating)),r.push('<span class="gartner-pi-datestamp">'),r.push("Reviewed "+m(a.date)),r.push("</span>"),r.push("</div>"),r.push('<p class="gartner-pi-quote">"'+a.headline+'..." '),r.push("<span>(read more)</span></p>"),r.push("</li>")}r.push("</ul>"),r.push("</div>"),t.dataContainer.innerHTML=r.join("")},C=function(e){var i=[],n=e.rating,r=e.score,s=e.reviewCount,a=e.name,d=e.market;return i.push('<div class="gartner-pi-gradient"></div>'),i.push('<div class="gartner-pi-card">'),i.push('<div class="gartner-pi-logo"></div>'),i.push('<div class="gartner-pi-header">'),i.push('<h1 class="gartner-pi-h1">'+a+"</h1>"),i.push('<h2 class="gartner-pi-h2">'+d+"</h2>"),i.push("</div>"),i.push('<div class="gartner-pi-stats">'),i.push('<div class="gartner-pi-alignLeft">'),i.push('<div class="gartner-pi-overall-rating">'),i.push('<span class="gartner-pi-score">'+n+"</span>"),i.push(k(n)),i.push("</div>"),i.push('<div class="gartner-pi-reviews-link">'),i.push("<span>"+s+" Rating"+(s>1?"s":"")+" "),i.push('<span class="gartner-pi-chevron"></span>'),i.push("</span>"),i.push("</div>"),i.push("</div>"),i.push('<div class="gartner-pi-alignRight">'),t.sourcingLink?(i.push('<div class="gartner-pi-sourcing-link">'),i.push('<a id="'+t.sourcingLink+'" href="'+t.sourcingLink+'" target="_blank">Submit a review</a>'),i.push('<span class="gartner-pi-chevron"></span>'),i.push("</div>")):(i.push("<div>"),i.push('<div class="gartner-pi-overall-rating">'),i.push('<span class="gartner-pi-score">'+r+"%</span>"),i.push('<span class="gartner-pi-thumbs-up"></span>'),i.push('<div class="gartner-pi-reviews-link">'),i.push("<span>Recommend</span>"),i.push("</div>"),i.push("</div>"),i.push("</div>")),i.push("</div>"),i.push('<div class="gartner-pi-as-of-date" title="As of '+w()+'">As of '+w()+"</div>"),i.push("</div>"),i.push("</div>"),i},L=function(e){var i=[],n=e.rating,r=e.reviewCount;i.push('<div class="gartner-pi-card">'),i.push('<div class="gartner-pi-stats">'),i.push('<div class="gartner-pi-overall-rating">'),i.push('<span class="gartner-pi-score">'+n+"</span>"),i.push('<div class="gartner-pi-translate">'),i.push(k(n)),i.push('<div class="gartner-pi-reviews-link">'),i.push("<span>"+r+" Rating"+(r>1?"s":"")+"</span>"),i.push(" on Gartner Peer Insights</div>"),t.sourcingLink&&(i.push('<div class="gartner-pi-sourcing-link">'),i.push('<a id="'+t.sourcingLink+'" href="'+t.sourcingLink+'" target="_blank">(Submit a review)</a>'),i.push("</div>")),i.push("</div>"),i.push("</div>"),i.push("</div>"),i.push('<div class="gartner-pi-as-of-date" title="As of '+w()+'">As of '+w()+"</div>"),i.push("</div>"),t.dataContainer.innerHTML=i.join(""),v(e.url,e.seoName)},T=function(){var e=h(c(n));const i=t.version<2?"gartner-pi-link":"gartner-pi-link-"+t.widget_id,r=t.version<2?"gartner-pi-widget":"gartner-pi-widget-"+t.widget_id;var s=['<a id="'+i+'" href="'+e+'" class="gartner-pi-link" target="_blank" rel="nofollow" >'];s.push(b()),s.push("</a>");var a=document.createElement("div");a.setAttribute("id",r),a.setAttribute("data-size",t.size),a.setAttribute("data-theme",t.theme),a.innerHTML=s.join(""),t.container.appendChild(a)};return a(e),{stop:g,size:t.size,theme:t.theme,widget_id:t.widget_id}}(e)};