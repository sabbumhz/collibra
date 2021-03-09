(function(){
'use strict';

var duration = 20000;
function init(){
  new InfiniteScroll(document.getElementsByClassName('infinite-container'),duration);
}

class InfiniteScroll{
  constructor(container,duration){
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

var el = document.querySelectorAll(".custom-click-nav");
for (var i = 0; i < el.length; i++) {
  el[i].onclick = function () {
    var el1 = document.querySelector('.tab-pane.tabs-1');
    var el2 = document.querySelector('.tab-pane.tabs-2');
    var tab1 = document.querySelector('.custom-click-nav.tabs-1');
    var tab2 = document.querySelector('.custom-click-nav.tabs-2');

    if (this.classList.contains('tabs-1') == true) {
      el1.classList.add("active");
      el2.classList.remove("active");
      tab2.classList.remove("active");
    }
    if (this.classList.contains('tabs-2') == true) {
      el2.classList.add("active");
      el1.classList.remove("active");
      tab1.classList.remove("active");
    }
    this.classList.add("active");
  };
}
})();

    // Footer accordion
    // On DOM ready,
    $(function () {
      // Cache selectors
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
    });