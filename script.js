const totalHours = 24;
let autoHashRate = true;

$( document ).ready(function() {
    $('#currency-select').on('change', function () {
        const newCurrency = this.value
        $('#electricity-unit').text(this.value + "/kW");
        $('#profit-unit').text(this.value + "/BTC");
    });

    $('.network-hashrate-auto').on('click', function () {
        $('#hash-rate').attr('readOnly', 'true');
        $('#hash-rate').attr('placeholder', 'Auto Filled');
        autoHashRate = true;
    });


    $('.network-hashrate-user').on('click', function () {
        $('#hash-rate').removeAttr('readOnly');
        $('#hash-rate').attr('placeholder', 'User defined');
        autoHashRate = false;
    });

    $("#button-calculate").click(function () {
        $('#calculation-status').css('display', 'block');
        $('#precalculate-status').css('display', 'none');

        if (autoHashRate == true)
        {
            fetch('https://blockchain.info/q/hashrate')
                .then(function (response) {
                    return response.json();
                })
                .then((hashRate) => CalculateHashRate(hashRate, true))
                .catch(function (ex) {
                    $('#calculation-status').css('display', 'none');
                    $('#precalculate-status').css('display', 'block');
                });
        }
        else {
            const hashRate = $('#hash-rate').val();
            CalculateHashRate(hashRate, false);
        }
    });

    function CalculateHashRate(hashRate, isAuto) {
        const effifciency = $('#efficiency').val();
        const electricityCost = $('#electricity').val();
        let calculateHashRate = hashRate * Math.pow(10, -6);
        if (isAuto == false)
        {
            calculateHashRate = hashRate * Math.pow(10, 3);
        }

        if (isAuto == true)
        {
            $('#hash-rate').val(hashRate * Math.pow(10, -9));
        }
        let result = (calculateHashRate  * effifciency * totalHours * electricityCost) / (6.25 * 144);
        result = Math.floor(result * 100) / 100;
        
        $('#answer').val(result);
        $('#calculation-status').css('display', 'none');
        $('#precalculate-status').css('display', 'block');
    }
});