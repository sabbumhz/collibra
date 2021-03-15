(function(){
'use strict';

if (window.location.href.indexOf("page") > -1) {
  $('body').addClass('page-internal');
  }

// equal height 
$(document).ready(function () {
  var largestHeight = 0;
  $('.c-collab__content').each(function() {
    var parHeight = $(this).height();
       if (parHeight > largestHeight){
        largestHeight = parHeight; 
       }           
  })
  console.log(largestHeight); 
  $('.c-collab__content').height(largestHeight);
  
});

  // footer accordoin
  $(document).ready(function() {
    var $accordion = $(".js-footer-footer-accordion");
    var $allPanels = $(
      ".footer-accordion-item:not(.footer-newsletter-block) .footer-accordion-panel"
    ).hide();
    var $allItems = $(".footer-accordion-item");
    
    // Event listeners
    $accordion.on("click", ".footer-accordion-toggle", function () {
      // Toggle the current accordion panel and close others
      $allPanels.slideUp();
      $allItems.removeClass("is-open");
      if ($(this).next().is(":visible")) {
        $(".footer-accordion-panel:not(.footer-newsletter-panel)").slideUp();
      } else {
        $(this)
          .next()
          .slideDown()
          .closest(".footer-accordion-item")
          .addClass("is-open");
      }
      return false;
    });

  //tabs
  const tabs = document.querySelectorAll('.custom-tabs');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      if (!tab.classList.contains('active')) {
        document.querySelector('.custom-tabs.active').classList.remove('active');
        document.querySelector('.tab-content.active').classList.remove('active');
        tab.classList.add('active');
        contents[index].classList.add('active');
      }
    })
  });

//ticker
var duration = 20000;
function init(){
  new InfiniteScroll(document.getElementsByClassName('infinite-container'),duration);
}

class InfiniteScroll{
  constructor(container, duration) {
        if (!container.length) {
          return
        }
    this.container = container[0];
    console.log(this.container);
    this.wrapper = this.container.querySelectorAll('.infinite-wrapper')[0];
    console.log(this.wrapper);
    // set the duration based on 60fps
    this.duration = 60 * (duration / 1000);
    this.increment = 0;
    this.getWidth = this.getWidth.bind(this);
    this.startScroll = this.startScroll.bind(this);
    this.getWidth();
    window.addEventListener('resize',this.getWidth);
    this.startScroll();
  }
  
  // get container width
  getWidth(){
    this.start = false;
    this.block = this.wrapper.querySelectorAll('.items-block');
    this.step = Math.floor(this.block[0].clientWidth);
    this.width = Math.ceil(this.container.clientWidth / this.block[0].clientWidth) + 1;
    this.setBlocks();
  }
  
  // dynamic blocks duplicator
  setBlocks(){
    if(this.block.length < this.width){
      for(var i =0; i < (this.width - this.block.length); i++){
        this.cloneBlock();
      }
    }else{
      for(var i =0; i < (this.block.length - this.width); i++){
        this.removeBlock();
      }
    }
    this.start = true;
  }
  
  // remove blocks
  removeBlock(){
    this.wrapper.querySelectorAll('.items-block')[0].remove();
  }
  
  // add blocks
  cloneBlock(){
    var clone = this.block[0].cloneNode(true);
    this.wrapper.appendChild(clone);
  }
  
  // Scrolling
  startScroll(){
    this.increment += this.step / this.duration;

      if(parseInt(this.increment) >= this.step){
        this.removeBlock();
        this.cloneBlock();
        this.increment = 0;
        this.wrapper.style.transform = 'translateX(0px)';
      }
      else{
       this.wrapper.style.transform = 'translateX('+ -parseInt(this.increment) +'px)';
      }
    if(this.start){
      window.requestAnimationFrame(this.startScroll);
    }
    else{
      window.cancelAnimationFrame(this.startScroll);
    }    
  }
}

init();


});

})();


