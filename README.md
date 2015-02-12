#node-translator
Text translation based on gettext .PO files.<br>
Support for string formating with  [this](http://nodejs.org/api/util.html#util_util_format_format) replacements.

## Usage
###Initialize the translations
```javascript
    var translator = require('node-translator');
    translator.init(pathToTranslations, defaultDomain);
```
###Translate
```javascript
    // Translate to default domain
    translator.tr(text [,replacements]);
    
    // Translate with plural to default domain
    // I.E translator.trn("cow", "cows", n);
    translator.trn(singular, plural, n [,replacements]);
   
    // Translate to specific domain
    translator.trd(text, domain [,replacements]);
   
    // Translate with plural to specific domain
    translator.trnd(singular, plural, n domain [,replacements]);
    
    // get (and set if domain passed) the default domain
    translator.textDomain([domain]);
```
