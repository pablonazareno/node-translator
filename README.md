node-translator
===============

Text translation based on gettext .PO files.

## Usage
Initialize the translations
```javascript
    var translator = require('node-translator');
    translator.init(pathToTranslations, defaultDomain);
```
Translate
```javascript
    // Translate to default domain
    translator.tr(text);
    // Translate with plural to default domain
    // n can be replaced in both texts using %d
    // I.E translator.trn("%d cow", "%d cows", n);
    translator.trn(singular, plural, n);
    // Translate to specific domain
    translator.trd(text, domain);
    // Translate with plural to specific domain
    translator.trnd('');
    
    // set and get (if no domain passed) the default domain
    translator.textDomain(domain);
```
