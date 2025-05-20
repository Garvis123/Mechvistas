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



function page1(){
    var tl =  gsap.timeline({
        scrollTrigger:{
            trigger:"#page1 ",
            scroller:"#main",
            start:"top top",
            end:"end -150%",
            scrub:true,
            pin:true,
          }
      })
      tl
      .to("#page1 #right #subright",{
       bottom:"0%"
      },"a")
  
}

page1()

function page2(){
    var tl =  gsap.timeline({
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top top",
            end:"end -200%",
            scrub:true,
            pin:true,
          }
      })
      tl
      .to("#page2 #image #overlay",{
        top:"-47%"
      },"a")
   
}
function Responsivepage2(){
  var tl =  gsap.timeline({
      scrollTrigger:{
          trigger:"#page2",
          scroller:"#main",
          start:"top top",
          end:"end -200%",
          scrub:true,
          pin:true,
        }
    })
    tl
    .to("#page2 #image #overlay",{
      top:"-240%"
    },"a")
 
}


function page3(){
    var tl =  gsap.timeline({
        scrollTrigger:{
            trigger:"#page3",
            scroller:"#main",
            start:"top top",
            end:"end -200%",
            scrub:true,
            pin:true,
          }
      })
      tl
      .to("#page3 #slider",{
        left:"-80%"
      },"a")
     
}
function Responsivepage3(){
  var tl =  gsap.timeline({
      scrollTrigger:{
          trigger:"#page3",
          scroller:"#main",
          start:"top top",
          end:"end -200%",
          scrub:true,
          pin:true,
        }
    })
    tl
    .to("#page3 #slider",{
      left:"-250%"
    },"a")
   
}

function swipper() {
  var swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 30,
      pagination: {
          el: ".swiper-pagination",
          type: "fraction",
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
  });
}
swipper();
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
if(maxWidth >= 768){
  page2()
  page3()
}
if(maxWidth < 768){
    Responsivepage2()
    Responsivepage3()
}


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
