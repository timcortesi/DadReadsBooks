main_template = `
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12">
            <h3 class="main-title">Dad Reads Books</h3>
        </div>
    </div>
    <div class="row">
        {{#books}}
        <div class="col-xs-6 col-md-4 col-lg-3 book" data-slug="{{slug}}">
            <div class="panel panel-default">
                <div class="panel-body">
                    <img class="book-cover" src="assets/books/{{slug}}/{{cover}}">
                </div>
                <div class="panel-footer book-title">{{title}}</div>
            </div>
        </div> 
        {{/books}}
    </div>
</div>
`;

book_template = `
<div style="width:100%;text-align:center;">
    {{#page.image}}
    <img class="book-page" src="assets/books/{{book.slug}}/images/{{page.image}}">
    {{/page.image}}
</div>
<div id="turn-page-forward" class="navbutton"><i class="fas fa-arrow-circle-right"></i></div>
<div id="turn-page-back" class="navbutton"><i class="fas fa-arrow-circle-left"></i></div>
<div id="exit-to-main" class="navbutton"><i class="fas fa-times-circle"></i></div>
`;