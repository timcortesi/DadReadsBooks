document.ontouchmove = function(event){
    event.preventDefault();
}
window.config = {
    'audio':"Enabled",
}
window.state = {};
window.tocca({
    "tapThreshold": 500,
    "longtapThreshold":1000
})

draw_main = function() {
    window.audio.pause();
    $('body').html(gform.m(main_template,{"books":window.books}))
}
draw_book = function() {
    $('#turn-page-forward').css("color","#ddd");
    $('body').html(gform.m(book_template,{
        "page":window.state.book.pages[state.index],
        "book":window.state.book
    }))
    if (window.config.audio === 'Enabled' && typeof window.state.book.pages[state.index].audio != 'undefined') {
        window.audio.src = "assets/books/"+window.state.book.slug+"/audio/"+window.state.book.pages[state.index].audio;
        window.audio.play();
    } else {
        $('#turn-page-forward').css("color","#ee8");
    }
}
init_book = function(e) {
    window.state.index = 0;
    window.state.book = _.find(window.books,{"slug":e.currentTarget.dataset.slug});
    draw_book();
}
turn_page_forward = function(e) {
    window.audio.pause();
    window.state.index++;
    if (window.state.index > window.state.book.pages.length-1) {
        draw_main();
    } else {
        draw_book();
    }
}
turn_page_back = function(e) {
    window.audio.pause();
    window.state.index--;
    if (window.state.index < 0) {
        draw_main();
    } else {
        draw_book();
    }
}

$( document ).ready(function() {
    window.audio = new Audio();
    window.audio.addEventListener("ended", function() {
        $('#turn-page-forward').css("color","#ee8");
    });
    draw_main();
    if ('ontouchstart' in document.documentElement) {
        $('body').on('tap','.book',init_book);
        $('body').on('tap','#turn-page-forward',turn_page_forward);
        $('body').on('swipeleft',turn_page_forward);
        $('body').on('tap','#turn-page-back',turn_page_back);
        $('body').on('swiperight',turn_page_back);
        $('body').on('tap','#exit-to-main',draw_main);
    } else {
        $('body').on('mousedown','.book',init_book);
        $('body').on('mousedown','#turn-page-forward',turn_page_forward);
        $('body').on('mousedown','#turn-page-back',turn_page_back);
        $('body').on('mousedown','#exit-to-main',draw_main);
    }

    new gform(
        {"fields":[
            {
                "name":"audio",
                "label":"Enable Audio",
                "type":"select",
                "options": ["Enabled","Disabled"],
                "help": "Enable or Disable Pre-Recorded Audio"
            }
        ],
        "title":"Configure Settings",
        "actions":[
            {"type":"save"}
        ]}
    ).modal().on('save',function(form_event) {
        window.config = form_event.form.get()
        form_event.form.trigger('close');
    });
});
