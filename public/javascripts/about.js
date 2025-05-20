function inet(){
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
  
  
  
  inet();

  
function menu(){
    var flag = 0;
    document.querySelector("#menuline").addEventListener("click",function(){
        if(flag === 0){
        var tl = gsap.timeline()
        tl
        .to(".line",{
            position:"absolute",
            duration:0.5
        },"a")
        .to("#l1",{
            position:"relative",
            transform:" rotate(45deg)  translateY(0px) translateX(4px)",
            marginLeft: "-5px"
        },"a")
        .to("#l3",{
            position:"relative",
            transform:" rotate(-45deg)  translateX(2px)",
            marginLeft: "-5px"
        },"a")
        .to("#l2",{
            opacity:0
        },"a")
        .to(".menu-left",{
          width:"60vw",
          duration:0.9,
          ease: "expo.inOut",
        },"a")
        .to(".menu-right",{
          width:"50vw",
          duration:0.9,
          ease: "expo.inOut",
        },"a")
        .to("#textmenu",{
         transform:`translateY(0)`,
         duration:0.8,
         ease: "expo.inOut",
         delay:0.1,
         stagger:0.0999999,
        },"a")
        flag =1 
    }
    else{
        var tl = gsap.timeline()
  
        tl
        .to("#l1",{
            position:"relative",
            transform:" rotate(0deg)  translateY(0px) translateX(0px)",
            marginLeft: "0px"
        },"a")
        .to("#l3",{
            position:"relative",
            transform:" rotate(0deg)  translateX(0px)",
            marginLeft: "0px"
        },"a")
        .to(".menu-left",{
         width:"0vw",
         duration:0.9,
         ease: "expo.inOut",
        },"a")
        .to("#textmenu",{
          transform:`translateY(110%)`,
          duration:0.7,
          ease: "expo.inOut",
          stagger:0.0999999,
         },"a")
         .to(".menu-right",{
          width:"0vw",
          duration:0.8,
          ease: "expo.inOut",
        },"a")
        .to("#l2",{
            opacity:1,
            position:"relative"
        },"a")
        flag = 0
    }
  
  })
  }
  
  function Responsivemenu(){
    var flag = 0;
    document.querySelector("#menuline").addEventListener("click",function(){
        if(flag === 0){
        var tl = gsap.timeline()
        tl
        .to(".line",{
            position:"absolute",
            duration:0.5
        },"a")
        .to("#l1",{
            position:"relative",
            transform:" rotate(45deg)  translateY(0px) translateX(4px)",
            marginLeft: "-5px"
        },"a")
        .to("#l3",{
            position:"relative",
            transform:" rotate(-45deg)  translateX(2px)",
            marginLeft: "-5px"
        },"a")
        .to("#l2",{
            opacity:0
        },"a")
        .to(".menu-left",{
          width:"70vw",
          duration:0.9,
          ease: "expo.inOut",
        },"a")
        .to("#textmenu",{
         transform:`translateY(0)`,
         duration:0.8,
         ease: "expo.inOut",
         delay:0.1,
         stagger:0.0999999,
        },"a")
        flag =1 
    }
    else{
        var tl = gsap.timeline()
  
        tl
        .to("#l1",{
            position:"relative",
            transform:" rotate(0deg)  translateY(0px) translateX(0px)",
            marginLeft: "0px"
        },"a")
        .to("#l3",{
            position:"relative",
            transform:" rotate(0deg)  translateX(0px)",
            marginLeft: "0px"
        },"a")
        .to(".menu-left",{
          width:"0vw",
          duration:0.9,
          ease: "expo.inOut",
         },"a")
        .to("#textmenu",{
          transform:`translateY(110%)`,
          duration:0.7,
          ease: "expo.inOut",
          stagger:0.0999999,
         },"a")
        
        .to("#l2",{
            opacity:1,
            position:"relative"
        },"a")
        flag = 0
    }
  
  })
  }
  
  function menuexpander() {
    const menu = document.querySelector(".menuexpand");
    
    // Store the initial height from CSS
    let previousHeight = getComputedStyle(menu).height;
    let toggle = 0;
    menu.addEventListener("click", () => {
      if(toggle === 0) {
        previousHeight = getComputedStyle(menu).height; // Store current height before expanding
  
        // Temporarily set height to "auto" to measure full expanded height
        menu.style.height = "auto";
        let fullHeight = menu.scrollHeight + "px";
        menu.style.height = previousHeight; // Revert to original height before animation
    
        gsap.to(menu, {
          height: fullHeight,
          duration: 0.5,
          ease: "power2.out"
        });
        toggle = 1;
      }else{
        toggle = 0;
        gsap.to(menu, {
          height: previousHeight, // Restore the previous height
          duration: 0.5,
          ease: "power2.inOut"
        });
      }
    });
  
   
  }
  
  
  let initialWidth = window.innerWidth;
  
  // Add an event listener for the resize event
  
  
  const maxWidth = window.innerWidth
  
  
  if(maxWidth > 768){
    menu()
   
  }else{
    Responsivemenu()
  }
  menuexpander()
  
  window.addEventListener('resize', () => {
    // Check if the inner width has changed
    if (window.innerWidth !== initialWidth) {
      // Refresh the page
      location.reload();
    }
  });
  


function page8Animationimg() {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page8",
            scroller: "#main",
            // markers: true,
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
        }
    })
    tl.to(".page8 .page8-right", {
        x: "15vw",
    }, 'a')
    tl.to(".page8 .page8-left", {
        x: "-15vw",
    }, 'a')
    tl.from(".page8 .page8-center", {
        transform: `translateY(2vw)`,
        opacity: 0,
        delay: 0.3,
    }, 'a')
}
page8Animationimg();

function textAnimation() {
    var h2data = document.querySelectorAll("#page1 h5");
    h2data.forEach(function (elem) {
      var textData = elem.textContent;
      var splitedText = textData.split("");
      var clutter = "";
      splitedText.forEach(function (e) {
        clutter += `<span>${e}</span>`;
      });
      elem.innerHTML = clutter;
    });
    let mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
    gsap.to("#page1 h5 span", {
        color: "#322d23",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#page1 h5 span",
            scroller: "#main",
            start: "top 0%",
            end: "top -10%",
            scrub: 2,
        },
    });
});

mm.add("(min-width: 769px)", () => {
    gsap.to("#page1 h5 span", {
        color: "#322d23",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#page1 h5 span",
            scroller: "#main",
            start: "top 16%",
            end: "top -10%",
            scrub: 2,
        },
    });
});
    
    let h2page7 = document.querySelectorAll(".page7>h2");

    h2page7.forEach((elem) => {
        let splited = elem.textContent.split("");
        elem.innerHTML = " ";
        splited.forEach((e) => {
            elem.innerHTML += `<span>${e}</span>`;
        })
    })
    gsap.to(".page7 h2 span", {
        color: '#332E24',
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".page7 ",
            scroller: "#main",
            // markers:true,
            start: "top 50%",
            end: "top -30%",
            scrub: 2,
        }
    })

    // page6 page6-text animation
    let h2Page6 = document.querySelectorAll(".page6 .page6-text>h2");
    h2Page6.forEach((elem) => {
        let splited = elem.textContent.split("");
        // let clutter = " ";
        elem.innerHTML = " ";
        splited.forEach((e) => {
            elem.innerHTML += `<span>${e}</span>`;
        })
        //  elem.innerHTML = clutter;
    })
    gsap.to(".page6 .page6-text>h2 span", {
        color: '#332E24',
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".page6 .page6-text",
            scroller: "#main",
            // markers:true,
            start: "top 50%",
            end: "top 20%",
            scrub: 2,
        }
    })

}
textAnimation();

function svgscroll() {
    //page6 SvgScroller top
    gsap.to(".page6 #page6-svg1,.page6 #page6-svg2", {
        left: "-10vw",
        scrollTrigger: {
            trigger: ".page6 #page6-svg1",
            scroller: "#main",
            scrub: 2,
            // markers:true,
        }
    })
    //page6 SvgScroller bottom
    gsap.to(".page6 #page6-svg3,.page6 #page6-svg4", {
        right: "-20vw",
        scrollTrigger: {
            trigger: ".page6 #page6-svg3",
            scroller: "#main",
            scrub: 2,
            // markers:true,
        }
    })

    //.page10 #page10-svg2

  
}
svgscroll();