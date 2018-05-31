"use strict";

var assert = require('assert');
var translator = require('../index.js');

describe('Node Translator Test', function() {
	before(function() {
		translator.init('./test/i18n', 'pt-BR');
	});
	it('tr - should translate some texts', function() {
		assert.equal(translator.tr('Sin interés'), 'Sem juros');
		assert.equal(translator.tr('Te regalamos %s de descuento de tu compra pagando con', 'ocho porciento'), 'Presenteamos você com ocho porciento de desconto na sua compra pagando com o');
		
	});

	it('trd - should translate some texts', function() {
		assert.equal(translator.trd('Sin interés', 'es-AR'), 'Sin interés');
		assert.equal(translator.trd('Te regalamos %s de descuento de tu compra pagando con', 'es-AR', 'ocho porciento'), 'Te regalamos ocho porciento de descuento de tu compra pagando con');
	});	
	
	it('trn - should translate some texts', function() {
		assert.equal(translator.trn('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 1), 'Podes comprar até %s unidade.');
		assert.equal(translator.trn('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 20), 'Podes comprar até %s unidades.');		
	});	
	
	it('trnd - should translate some texts', function() {
		assert.equal(translator.trnd('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 1, 'es-AR'), 'Puedes comprar hasta %s unidad.');
		assert.equal(translator.trnd('Puedes comprar hasta %s unidad.', 'Puedes comprar hasta %s unidades.', 20, 'es-AR'), 'Puedes comprar hasta %s unidades.');
	});			

	it('trp - should translate some texts', function() {
		assert.equal(translator.trp('String con un contexto', 'context1'), 'String con un contextinho 1');
		assert.equal(translator.trp('String con un contexto', 'context2'), 'String con un contextinho 2');

		assert.equal(translator.trp('String con un contexto y variables como %s y %s', 'context2', 'perro', 'gato'), 'String con un contextinho 2 y variables como perro y gato');
	});			

	it('trpd - should translate some texts', function() {
		assert.equal(translator.trpd('String con un contexto', 'es-AR', 'context1'), 'String con un contexto 1');
		assert.equal(translator.trpd('String con un contexto', 'es-AR', 'context2'), 'String con un contexto 2');

		assert.equal(translator.trpd('String con un contexto y variables como %s y %s', 'es-AR', 'context2', 'perro', 'gato'), 'String con un contexto 2 y variables como perro y gato');
	});			

	it('trnp - should translate some texts', function() {
		assert.equal(translator.trnp('String con un contexto y singular', 'String con un contexto y plural', 1, 'context1'), 'String con un contextinho 1 y singular');
		assert.equal(translator.trnp('String con un contexto y singular', 'String con un contexto y plural', 2, 'context2'), 'String con un contextinho 2 y plural');

		assert.equal(translator.trnp('String con un contexto y singular y variables como %s y %s', 'String con un contexto y plural y variables como %s y %s', 1, 'context2', 'perro', 'gato'), 'String con un contextinho 2 y singular y variables como perro y gato');
		assert.equal(translator.trnp('String con un contexto y singular y variables como %s y %s', 'String con un contexto y plural y variables como %s y %s', 2, 'context2', 'perro', 'gato'), 'String con un contextinho 2 y plural y variables como perro y gato');
	});			

	it('trnpd - should translate some texts', function() {
		assert.equal(translator.trnpd('String con un contexto y singular', 'String con un contexto y plural', 1, 'es-AR', 'context1'), 'String con un contexto 1 y singular');
		assert.equal(translator.trnpd('String con un contexto y singular', 'String con un contexto y plural', 2, 'es-AR', 'context2'), 'String con un contexto 2 y plural');

		assert.equal(translator.trnpd('String con un contexto y singular y variables como %s y %s', 'String con un contexto y plural y variables como %s y %s', 1, 'es-AR', 'context2', 'perro', 'gato'), 'String con un contexto 2 y singular y variables como perro y gato');		
		assert.equal(translator.trnpd('String con un contexto y singular y variables como %s y %s', 'String con un contexto y plural y variables como %s y %s', 2, 'es-AR', 'context2', 'perro', 'gato'), 'String con un contexto 2 y plural y variables como perro y gato');		
	})
})