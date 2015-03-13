function addCustomer(){
            
    window.location.href = '/customers/add';
}

function cancelCustomer(){
    
    window.location.href = '/customers';
}

function addMethod(){
            
    window.location.href = '/methods/add';
}

function cancelMethod(){
    
    window.location.href = '/methods';
}

function cancelTransaction(){
    
    window.location.href = '/';
}

function creditCardTypeFromNumber(num) {
   // first, sanitize the number by removing all non-digit characters.
   num = num.replace(/[^\d]/g,'');
   // now test the number against some regexes to figure out the card type.
   if (num.match(/^5[1-5]\d{14}$/)) {
     return 'MasterCard';
   } else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
     return 'Visa';
   } else if (num.match(/^3[47]\d{13}/)) {
     return 'AmEx';
   } else if (num.match(/^6011\d{12}/)) {
     return 'Discover';
   }
   return 'UNKNOWN';
 }
