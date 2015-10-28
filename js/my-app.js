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
                        'Precisa de poupar <strong>'+ Number((savingsValueMonth).toFixed(1)) +'€</strong> por mês para atingir o seu objetivo.' +
                        '<br><br>' +
                        'O valor acomulado das suas poupanças precisa de ser <strong>'+valueInSavings+'€</strong>.' +
                        '<br><br>' +
                        'O valor em juros recebido é <strong>'+rounded_liquidTax_final+'€</strong>.'
                    );
                });


            }
        });

    });


    $$('.btn-time-saved').on('click', function () {

        $$('.budget_2').find('.item-input input').each(function(index, el) {
            if(!$$(this).val()) {

                alert('Preencha todos os campos.');
                return false;

            } else {

                var finalValue = $$('input[name="final_value"]').val(), // 1000
                    initialValue = $$('input[name="initial_value"]').val(), //100 ou 0
                    value_per_month = $$('input[name="month_value"]').val(), // 200
                    tanb = $$('input[name="tanb"]').val(),
                    irs = $$('input[name="irs"]').val();

                var value_i_need = finalValue - initialValue; // 1000-100 = 900
                var number_of_months =  value_i_need/value_per_month, // Meses = 900/200 = 4,5
                    liquidTax = (100-irs)/100,
                    liquidTax_final = finalValue*((tanb/100)*liquidTax)*(number_of_months/12),
                    rounded_liquidTax_final = Math.round(liquidTax_final * 100) / 100;

                var value_plus_tax = parseInt(finalValue) + parseFloat(liquidTax_final);

                myApp.popup('.popup-result');

                $$('.popup-result').on('opened', function() {
                    $$('.result').html(
                        'Precisa de poupar durante <strong>'+ Number((number_of_months).toFixed(1)) +' meses</strong> para atingir o seu objetivo.' +
                        '<br><br>' +
                        'Ao fim de <strong>'+ Number((number_of_months).toFixed(1)) +' meses</strong>. A sua poupança será de <strong>'+value_plus_tax+'€</strong>.' +
                        '<br><br>' +
                        'Valor de juros recebido  <strong>'+rounded_liquidTax_final+'€</strong>.' +
                        '<br>' +
                        'Valor mensal de poupança <strong>'+value_i_need+'€</strong>.' +
                        '<br>' +
                        'Valor com que começou a poupança <strong>'+initialValue+'€</strong>.'
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