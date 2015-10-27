// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });

    $$('.clear-form').on('click', function () {
        $$('.item-input input').val('');
    });

    $$('input[type="submit"]').on('click', function () {

        $$('.item-input input').each(function(index, el) {
            if(!$$(this).val()) {

                alert('Preencha todos os campos.');
                return false;

            } else {

                var finalValue = $$('input[name="final_value"]').val(),
                    initialValue = $$('input[name="initial_value"]').val(),
                    months = $$('input[name="months"]').val(),
                    tanb = $$('input[name="tanb"]').val(),
                    irs = $$('input[name="irs"]').val();

                var value_2 = finalValue - initialValue;
                var value_1 =  value_2/months,
                    liquidTax = (100-irs)/100,
                    liquidTax_final = value_2*((tanb/100)*liquidTax)*(months/12),
                    rounded_liquidTax_final = Math.round(liquidTax_final * 100) / 100;

                var liquidValueMonth = rounded_liquidTax_final/months, // 14,4 / 8
                    savingsValueMonth = value_1 - liquidValueMonth; // 375 - 1,8

                var valueInSavings = (finalValue - rounded_liquidTax_final)-initialValue; //  3000-14,4


                myApp.popup('.popup-result');


                $$('.popup-result').on('opened', function () {
                    $$('.result').html(
                        'Precisa de poupar <strong>'+savingsValueMonth+'€</strong> por mês para atingir o seu objetivo.' +
                        '<br><br>' +
                        'O valor acomulado das suas poupanças precisa de ser <strong>'+valueInSavings+'€</strong>.' +
                        '<br><br>' +
                        'O valor em juros recebido é <strong>'+rounded_liquidTax_final+'€</strong>.'
                    );
                });


            }
        });

    });


});



// // Generate dynamic page
// var dynamicPageIndex = 0;
// function createContentPage() {
// 	mainView.router.loadContent(
//         '<!-- Top Navbar-->' +
//         '<div class="navbar">' +
//         '  <div class="navbar-inner">' +
//         '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
//         '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
//         '  </div>' +
//         '</div>' +
//         '<div class="pages">' +
//         '  <!-- Page, data-page contains page name-->' +
//         '  <div data-page="dynamic-pages" class="page">' +
//         '    <!-- Scrollable page content-->' +
//         '    <div class="page-content">' +
//         '      <div class="content-block">' +
//         '        <div class="content-block-inner">' +
//         '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
//         '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
//         '        </div>' +
//         '      </div>' +
//         '    </div>' +
//         '  </div>' +
//         '</div>'
//     );
// 	return;
// };