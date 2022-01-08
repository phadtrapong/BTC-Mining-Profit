const totalHours = 24;

$( document ).ready(function() {
    $('#currency-select').on('change', function () {
        const newCurrency = this.value
        $('#electricity-unit').text(this.value + "/kW");
        $('#profit-unit').text(this.value + "/BTC");
    });

    $("#button-calculate").click(function () {
        $('#calculation-status').css('display', 'block');
        $('#precalculate-status').css('display', 'none');
        
        fetch('https://blockchain.info/q/hashrate')
            .then(function (response) {
                return response.json();
            })
            .then(function (hashRate) {
                const effifciency = $('#efficiency').val();
                const electricityCost = $('#electricity').val();
                $('#hash-rate').val(hashRate * Math.pow(10, -6));
                $('#answer').val(( hashRate * Math.pow(10, -6) * effifciency * totalHours * electricityCost) / (6.25 * 144));

                $('#calculation-status').css('display', 'none');
                $('#precalculate-status').css('display', 'block');
            })
            .catch(function (ex) {
                $('#calculation-status').css('display', 'none');
                $('#precalculate-status').css('display', 'block');
            });
    });
});