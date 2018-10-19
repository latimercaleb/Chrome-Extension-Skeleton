chrome.runtime.onMessage.addListener(function(message, callback) {
  console.log("The message received by ext is: ", message);
     if (message.enabled == true){
           var creds = {
             name: 'Test By Automation',
             acc: 01010101010,
             route: '1010101010',
             payment: 0.01,
             ccNum: 0101010101010,
             ccMonth: '00',
             ccYear: '10',
             zip: 11111,
             sCode: 111,
             recurFreq: 'm',
             recurTotalPay: 3,
             comment: 'Autofilled by chrome'
           };

           function selectPaymentType(){
             var route = location.pathname.substr(13);
             route = route.toLowerCase();
             if(route.includes('credit')){ ccAutoPay(); }
             else if(route.includes('cash')){ cashAutoPay(); }
             else if(route.includes('check')){ route.includes('recurring') ? ckAutoPayRecur() : ckAutoPay(); }
             else {  ccAutoPayRecur(); }
           }

           function ccAutoPay(){
             console.log('Automating credit card payment form ...');
             $('#XForm > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > input').val(creds.name);
             $('#p1').val(creds.acc).trigger('change');
             $('#p2').val(creds.payment).trigger('change');
              location.href="javascript:js_multiAmountCall()";
              setTimeout(function(){
                $('#Name').val(creds.name);
                $('#Number').val(creds.ccNum);
                $('#Month').val(creds.ccMonth);
                $('#Year').val(creds.ccYear);
                $('#Zip').val(creds.zip);
                $('#Comment').val(creds.comment);
                location.href="javascript:Update()";
              },100);
           }

           function ccAutoPayRecur(){
             console.log('Automating recurring credit card form ...');
             $('#Freq').val('m');
             $('#RecurSelect').val(3);
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input').val(creds.acc);
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2) > input').val(creds.name);
             $('#p1').val(creds.acc).trigger('blur');
             $('#Due').val(creds.payment).trigger('change');
             location.href="javascript:js_Update()";
             $('#Name').val(creds.name);
             $('#Number').val(creds.ccNum);
             $('#Month').val(creds.ccMonth);
             $('#Year').val(creds.ccYear);
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(20) > td:nth-child(2) > input').val(creds.zip);
             $('#Comment').val(creds.comment);
           }

           function ckAutoPay(){
             console.log('Automating check payment form ...');
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > input').val(creds.name);
             $('#AccNum').val(creds.acc).trigger('blur');
             $('#Amount1').val(creds.payment).trigger('change');
             location.href="javascript:js_Amounts()";
             setTimeout(function(){
               $('#BankNum').val(creds.route).trigger('blur');
               $('#AccNum').val(creds.acc);
               $('#Name').val(creds.name);
               $('#Zip').val(creds.zip);
               $('#Comment').val(creds.comment);
               location.href="javascript:Update()";
             },100);
           }

           function ckAutoPayRecur(){
             console.log('Automating check payment form ...');
             $('#Freq').val('m');
             $('#Recur').val(3);
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input').val(creds.acc);
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > input').val(creds.name);
             $('#AccNum').val(creds.acc).trigger('blur');
             $('#Due').val(creds.payment).trigger('change');
             location.href="javascript:js_Changed()";
             $('#BankNum').val(creds.route).trigger('blur');
             $('#AccNum').val(creds.acc);
             $('#AccName').val(creds.name);
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(17) > td:nth-child(2) > input').val(creds.zip);
             $('#Comment').val(creds.comment);
           }

           function cashAutoPay(){
             console.log('Automating cash payment form ...');
             $('#Form > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > input').val(creds.name);
             $('#AccNum1').val(creds.acc).trigger('blur');
             $('#Amt1').val(creds.payment).trigger('change');
             location.href="javascript:js_multiCal()";
             setTimeout(function(){
               $('#Zip').val(creds.zip);
               $('#Comment').val(creds.comment);
               location.href="javascript:Update()";
             },100);
           }

           selectPaymentType();
     }
});
