
$(document).ready(function(){
    let accumulatedHeight = 0;
    let sections = document.querySelectorAll('.section');
    let formWrapper = document.querySelector('.form-wrapper');
    let maxHeight = 0;

    sections.forEach((section) => {
        var section_new = section.nextElementSibling;
        accumulatedHeight += section.offsetHeight;

        
        if(section_new)
        {
            section_new.style.top = -accumulatedHeight + 'px';
            if(getComputedStyle(section).height > getComputedStyle(section_new).height)
            {
                maxHeight = getComputedStyle(section).height;
            }
        }
    });

    formWrapper.style.height = maxHeight;

    $(".button").click(function(){
        var currentSection = $(this).closest(".section");
        var nextSection = currentSection.next();
        if(nextSection.length) {
            currentSection.removeClass("is-active");
            nextSection.addClass("is-active");

            const old_element = currentSection[0];  // jQuery objesinden DOM öğesine erişim
            const new_element = nextSection[0];  // jQuery objesinden DOM öğesine erişim

            var index = nextSection.index();
            $(".steps p").eq(index).addClass("is-active");
        }
    });

    $(".form-wrapper").submit(function(e) {
        e.preventDefault();
    });

    $(".scroll-down").click(function(){
        $('.waitlist-wrapper').animate({
            scrollTop: $(".section").offset().top - $('.waitlist-wrapper').offset().top + $('.waitlist-wrapper').scrollTop()
        }, 1000, "easeOutQuad"); // "easeOutQuad" başta hızlı, sonda yavaş bir geçiş sağlar.
    });
});