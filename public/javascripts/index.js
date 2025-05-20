function inet(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

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


function page6() {
  if ($(window).width() > 768) {
    document.querySelectorAll(".executive").forEach(function (elem) {
      let rotate = 0;
      let rotDiff = 0;

      elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector(".exe-img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });

      elem.addEventListener("mousemove", function (dets) {
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        rotDiff = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector(".exe-img"), {
          opacity: 1,
          ease: Power3,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, rotDiff * 0.2),
        });
      });
    });
  }
}
page6()

function pageTextAni(){
    
   
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
  
  gsap.to("#page1 h5 span", {
      color: "#322d23",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#page1 h5 span",
      scroller: "#main",
      start: "top 60%",
      end: "top 10%",
      scrub: 2,
    },
  });
  
  }
  pageTextAni()

  function page2(){
    var h2data = document.querySelectorAll("#page2 #overlay h2");
    h2data.forEach(function (elem) {
      var textData = elem.textContent;
      var splitedText = textData.split("");
      var clutter = "";
      splitedText.forEach(function (e) {
        clutter += `<span>${e}</span>`;
      });
      elem.innerHTML = clutter;
    });
    
    var tl =  gsap.timeline({
      scrollTrigger:{
          trigger:"#page2 ",
          scroller:"#main",
          start:"top top",
          end:"end -700%",
          scrub:true,
          pin:true,
        }
    })
    tl
    .to("#page2 #overlay>h2 span", {
      color: "#322d23",
      stagger: 0.1,
      duration:0.5,
     },"na")
    .to("#page2 #overlay",{
      top:"-100%",
      duration:1.5,
    },"n")
    .to("#page2 #right-section #divs1",{
      clipPath:`polygon(0 100%, 100% 100%, 100% 0%, 0 0%)`,
      duration:1.5,
    },"a")
    .to("#page2 #left-section #section-0 #text-section>h2:nth-child(2)",{
      opacity:1,
      delay:0.3,
    },"a")
    .to("#page2 #left-section #section-0 #text-section>h2:nth-child(1)",{
      opacity:0,
    },"a")
    .to("#page2 #left-section #section-0 #para-section #text-div>p:nth-child(2)",{
      opacity:1,
      delay:0.3,
    },"a")
    .to("#page2 #left-section #section-0 #para-section #text-div>p:nth-child(1)",{
      opacity:0,
    },"a")
    .to("#page2 #right-section #divs2",{
      clipPath:`polygon(0 100%, 100% 100%, 100% 0%, 0 0%)`,
      duration:1.5,
    },"b")
    .to("#page2 #left-section #section-0 #text-section>h2:nth-child(3)",{
      opacity:1,
      delay:0.3,
    },"b")
    .to("#page2 #left-section #section-0 #text-section>h2:nth-child(2)",{
      opacity:0,
    },"b")
    .to("#page2 #left-section #section-0 #para-section #text-div>p:nth-child(3)",{
      opacity:1,
      delay:0.3,
    },"b")
    .to("#page2 #left-section #section-0 #para-section #text-div>p:nth-child(2)",{
      opacity:0,
    },"b")
    .to("#page2 #right-section #divs3",{
      clipPath:`polygon(0 100%, 100% 100%, 100% 0%, 0 0%)`,
      duration:1.5,
    },"c")
    .to("#page2 #left-section #section-0 #text-section>h2:nth-child(4)",{
      opacity:1,
      delay:0.3,
    },"c")
    .to("#page2 #left-section #section-0 #text-section>h2:nth-child(3)",{
      opacity:0,
    },"c")
    .to("#page2 #left-section #section-0 #para-section #text-div>p:nth-child(4)",{
      opacity:1,
      delay:0.3,
    },"c")
    .to("#page2 #left-section #section-0 #para-section #text-div>p:nth-child(3)",{
      opacity:0,
    },"c")
  }
  page2()

function subpage3(){
  var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#subpage3 ",
        scroller:"#main",
        // markers:true,
        start:"top top",
        end:"end -300%",
        scrub:true,
        pin:true,
        // markers:true,
      }
  })
  tl
  .to("#subpage3 #section",{
   y:-420,
   duration:1.5,
  })
  .to("#subpage3 #section:nth-child(4)",{
    width:"96%",
    height:"97%",
    duration:1.5
  })
  .to("#subpage3 #section:nth-child(4) #overlay",{
    bottom:"9%",
    duration:1.5,
  })

}


function subpagelg(){
  var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#subpage3 ",
        scroller:"#main",
        // markers:true,
        start:"top top",
        end:"end -300%",
        scrub:true,
        pin:true,
        // markers:true,
      }
  })
  tl
  .to("#subpage3 #section",{
   y:-480,
   duration:1.5,
  })
  .to("#subpage3 #section:nth-child(4)",{
    width:"96%",
    height:"97%",
    duration:1.5
  })
  .to("#subpage3 #section:nth-child(4) #overlay",{
    bottom:"5%",
    duration:1.5,
  })
}
const maxWidth = window.innerWidth

if(maxWidth <= 1034 && maxWidth > 768){
  console.log(maxWidth);
  subpagelg()
}else{
  console.log(maxWidth);
  subpage3()
}
if(maxWidth > 768){
  menu()
 
}else{
  Responsivemenu()
}
menuexpander()
function page5(){
  var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page5 ",
        scroller:"#main",
        // markers:true,
        start:"top top",
        end:"end -200%",
        scrub:true,
        pin:true,
        // markers:true,
      }
  })
  tl
  .to("#page5 #p1",{
      top:"0%",
      duration:1.5,

  })
  .to("#page5 #p2",{
    top:"10%",
    duration:1.5,
 })
  .to("#page5 #p3",{
    top:"20%",
    duration:1.5,
 })
}
page5()

let initialWidth = window.innerWidth;

    // Add an event listener for the resize event
    window.addEventListener('resize', () => {
      // Check if the inner width has changed
      if (window.innerWidth !== initialWidth) {
        // Refresh the page
        location.reload();
      }
    });

  