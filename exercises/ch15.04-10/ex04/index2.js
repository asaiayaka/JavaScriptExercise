javascript:(function(){
  let headings=document.querySelectorAll("h1,h2,h3"),toc=document.createElement("ul");
  headings.forEach((heading,index)=>{
    const fragmentName=`heading-${index}`;
    let anchor=document.createElement("a");anchor.name=fragmentName;heading.prepend(anchor);
    let link=document.createElement("a");link.href=`#${fragmentName}`;link.innerHTML=heading.innerHTML;
    link.addEventListener("click",e=>{e.preventDefault();const target=document.querySelector(`a[name="${fragmentName}"]`);if(!target)return;target.scrollIntoView({behavior:"smooth"});});
    let li=document.createElement("li");li.appendChild(link);toc.appendChild(li);
  });
  document.body.prepend(toc);
})();
