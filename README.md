#node-translator
Text translation based on gettext .PO files.<br>
Support for string formating with  [this](http://nodejs.org/api/util.html#util_util_format_format) replacements.

## Usage
###Initialize the translations
```javascript
    var translator = require('node-translator');
    translator.init(pathToTranslations, defaultDomain);
```
### Translate to default domain
```javascript
translator.tr(text [,replacements]);
``` 
Example:

```javascript
translator.tr('Translate with the default domain: %s', 'español')
```

### Translate with plural to default domain
```javascript
translator.trn(singular, plural, n [,replacements]);
```

Example:

```javascript
translator.trn('cow', 'cows', n);
```
   
### Translate to specific domain
```javascript
translator.trd(text, domain [,replacements]);
```

Example:

```javascript
translator.trd('Translate to specific domain: %s', 'es-AR', 'german');
```

### Translate with plural to specific domain
```javascript
translator.trnd(singular, plural, n, domain);
```
Example:

```javascript
translator.trnd('cow', 'cows', n, 'es-AR');
```
   
### Get (and set if domain passed) the default domain
```javascript
translator.textDomain([domain]);
```
Example:

```javascript
translator.textDomain('es-AR');
```
