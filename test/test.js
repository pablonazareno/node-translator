"use strict";

var assert = require('assert');
var translator = require('../index.js');

describe('Node Translator Test', function() {
	before(function() {
		translator.init('./test/i18n', 'pt-BR');
	});
	it('should translate some texts', function() {
		assert.equal(translator.tr('Sin interés'), 'Sem juros');
		assert.equal(translator.trd('Sin interés', 'es-AR'), 'Sin interés');
		assert.equal(translator.tr('Te regalamos %s de descuento de tu compra pagando con', 'ocho porciento'), 'Presenteamos você com ocho porciento de desconto na sua compra pagando com o');
		assert.equal(translator.trd('Te regalamos %s de descuento de tu compra pagando con', 'es-AR', 'ocho porciento'), 'Te regalamos ocho porciento de descuento de tu compra pagando con');
		assert.equal(translator.trn('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 1), 'Podes comprar até %s unidade.');
		assert.equal(translator.trnd('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 1, 'es-AR'), 'Puedes comprar hasta %s unidad.');
		assert.equal(translator.trnd('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 20, 'es-AR'), 'Puedes comprar hasta %s unidades.');
		assert.equal(translator.trn('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 20), 'Podes comprar até %s unidades.');
	})
})