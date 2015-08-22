/**
 * Crea un componente de autocomplete, asociado a un input[type=text].
 * 
 * Usage: $('input#myInput').simpleAutocomplete(options);
 * 
 * IMPORTANTE: Si hay mas de un componente funcionando en la misma pagina, 
 * los inputs en los que se ingresa el texto deben tener un id para poder
 * bindear correctamente los eventos.
 */

(function($) {
	$.fn.simpleAutocomplete = function(method) {
		//default settings
		var settings = {
			/* La fuente (source) puede ser:
			 * 		- un array u objeto de elementos a filtrar
			 *		- un string con la url que devuelva un json, 
			 * 		- el string 'googlePlaces' que busca en la base de places de google.
			 */
			source : [],
			width : 'auto',  //ancho fijo del popup desactivado
			//ancho minimo y maximo del popup puede ser numerico 
			//o el string 'element' que hace referencia al ancho del input asociado
			'max-width' : 'none',  
			'min-width' : 'none',
			elementClass : '',
			listClass : '',
			containerClass : 'com-autocomplete',
			minSearchLength : 3, //minimos caracteres a buscar
			maxResults : 10, 
			timeoutAmout : 400, //el tiempo que espera a que el usuario siga tipeando antes de pedir el servicio
			returnOnEnter : false
		};
		var timeout = null;
		
		//public callable methods
		var methods = {
			
			init : function(options) {
			    var id = $(this).attr('id');
				$("div#" + id +"_autocomplete").remove();
				log("Inicializando Autocomplete");
				$.extend(settings, options);
				$(this).data('autocomplete-settings', settings);
				var popup = $('body').append(
						"<div id='" + id + "_autocomplete' class='" + settings.containerClass + "' style='display: none'> " +
								"<ul class='" + settings.listClass + "'>"+
								//Se usan dos ul anidadas para seguir el markup de nibbler y poder consumir directamente sus estilos
								//De lo contrario el siguiente li y ul no son necesarias
								"<li><ul></ul></li>" +
								"</ul></div>")
						.find("#" + id + "_autocomplete");
				popup.find('ul').show();
				this.data('simpleAutocompleteObject', popup);
				initStyle(this);
				bindActions(this, popup);
			},
			/**
			 * Muestra el popup de este objeto
			 */
			showPopup : function() {
				visiblePopup(this, true);
			},

			/**
			 * Oculta el popup de este objeto
			 */
			hidePopup : function() {
				visiblePopup(this, false);
			},
			/**
			 * Realiza la busqueda en la fuente seteada.
			 */
			search : function() {
			    //  cada vez que se hace una nueva búsqueda se limpia el data con el hotel-id para evitar redirects no deseados a Detail
			    this.data('hotel-id', null);
				if (this.val().length < settings.minSearchLength) {
					visiblePopup(this, false);
					return;
				}
				var $this = this;
				var $popup = getPopup(this);
				var list = "";
				var visibleItems = 0;
				var baseText = $(this).val();
				var thisSettings = $(this).data('autocomplete-settings');
				if (settings.source == 'googlePlaces') {
					settings.googleService.getPlacePredictions({ componentRestrictions: {country: thisSettings.country}, input: baseText }, 
						function(predictions, status) {
						if (status == 'OVER_QUERY_LIMIT') {
							amplify.publish('placeSearchOverQuota', 'googleService.getPlacePredictions');
						}
							// si es un array de resultados 
							var regexSearch = new RegExp(strChars(strClean(baseText)), "i");
							for ( var i in predictions) {
									visibleItems++;
									list += generateItem(predictions[i].description, predictions[i].reference, baseText);
							}
							$popup.find('ul:last').html(list);
							visiblePopup($this, !!visibleItems);
					});
				}
				
				else if (typeof settings.source == "string") {
					//si es una fuente ajax
					$.ajax({
						url : settings.source + baseText + '/' + settings.maxResults,
						dataType: 'json', 
						success : function(response) {
										if (response && response.data) {
											for (var i in response.data) {
												// list += generateItem(response.data[i].name, response.data[i].name_id, baseText);
												list += generateWeatherItem(response.data[i], baseText);
												visibleItems++;
												if (visibleItems >= settings.maxResults) {
													break;
												}
											}
										}
										$popup.find('ul:last').html(list);
										visiblePopup($this, !!visibleItems);
									}
					});
				} else if (typeof settings.source == "object"){
					// si es un array de resultados 
					var regexSearch = new RegExp(strChars(strClean(baseText)), "i");
					for ( var i in settings.source) {
						if (regexSearch.test(settings.source[i])) {
							visibleItems++;
							list += generateItem(settings.source[i], i, baseText);
						}
					}
					$popup.find('ul:last').html(list);
					visiblePopup($this, !!visibleItems);
				}
			},

			/**
			 * Selecciona un item de la lista
			 * @param which : mixed. 
			 * 		Puede recibir:
			 * 			- los strings 'next' o 'prev' para pasar el proximo o anterior
			 * 			- el objeto html del item
			 * 			- el numero de orden del item que se desea seleccionar
			 */
			selectItem : function(which) {
				//se usa la ultima ul, por los dos niveles requeridos por nibbler
				var $popup = getPopup(this).find('ul:last');
				var activeItem = $();
				if ($(which).length) { // si le pasamos el objeto
					activeItem = $(which);
				} else if (which == 'next') { // si le decimos que seleccione el proximo
					activeItem = $popup.find('.active').next('li');
					if (!activeItem.length) {
						activeItem = $popup.find('li:first');
					}
				} else if (which == 'prev') { // si le decimos que lija el anterior
					activeItem = $popup.find('.active').prev('li');
					if (!activeItem.length) {
						activeItem = $popup.find('li:last');
					}
				} else if (isNumber(which)) { // si le pasamos el numero de orden del elemento
					activeItem = $popup.find('li:eq(' + which + ')');
				} else {
					return;
				}
				
				if (activeItem.length) {
					activeItem.addClass('active')
						.siblings().removeClass('active');
                  // this.val(activeItem.text()); // si queremos que autocomplete el input al seleccionar
				}
			},

			/**
			 * Confirma la seccion del item activo
			 */
			confirmActiveItem : function() {
				var $objSelected = null; 
					try {
						var popup = getPopup(this);
						if (popup.is(':visible')) {
							$objSelected = popup.find('.active:first');
							if ($objSelected.length) {
							    // guardamos en el input el hotel id para poder hacer el redirect a Detail
							    this.data('data', JSON.stringify($objSelected.data()));
								this.val($objSelected.text());
							}
						}
					}
					catch(e) {}
				this.blur();
				var thisSettings = $(this).data('autocomplete-settings');
				if (thisSettings && typeof (thisSettings.callback) === "function") {
					thisSettings.callback(this, $objSelected);
				}
			}
		}; // end exposed methods

		/**
		 * Genera el html de un item del autocomplete
		 * @param text texto del item
		 * @param id id del item
		 * @param textSearch texto buscado por el usuario
		 */
		function generateItem(text, id, textSearch) {
			textSearch = strChars(strClean(textSearch));
			var search_pattern = '(' + textSearch.replace(/\s+/g, '|') + ')';
			text = text.replace(RegExp(search_pattern, 'ig'), '<span>$1</span>');
			
			return "<li class='item-autocomplete " + settings.elementClass + "' data-id='" + id + "'><a>" + text + "</a></li>";
		}

		function generateWeatherItem(item, textSearch) {
			textSearch = strChars(strClean(textSearch));
			var search_pattern = '(' + textSearch.replace(/\s+/g, '|') + ')';
			var text = "<b>" + item.name + "</b>";
			if (item.parent) text += ', ' + item.parent;
			if (item.grandparent) text += ', ' + item.grandparent;
			text = text.replace(RegExp(search_pattern, 'ig'), '<span>$1</span>');
			
			return "<li class='item-autocomplete " + settings.elementClass + ' ' + item.type + "' data-id='" + item.name_id + "' data-type='" + item.type +"'><a>" + text + "</a></li>";
		}

		/**
		 * Setea los binds a los eventos
		 * @param obj objeto jquery del input
		 * @param popup objeto del popup
		 */
		function bindActions(obj, popup) {
			obj.off().on(
					{
						keydown : function(e) {
							
							switch (e.keyCode) {
							case 13:
								var $popup = getPopup(obj);
								if ($popup.is(":visible") && $popup.find('.active').length) {
										methods.confirmActiveItem.apply(obj, []);
										e.stopImmediatePropagation();
										e.preventDefault();
										return false;
								}
								else if (settings.returnOnEnter && typeof settings.callback == 'function') {
									settings.callback(obj, null);
								}
								break;
							case 38:
								methods.selectItem.apply(obj, [ 'prev' ]);
								return false;
							case 40:
								methods.selectItem.apply(obj, [ 'next' ]);
								return false;
							}
						},

						keyup : function(e) {
							switch (e.keyCode) {
							case 27:
								if (timeout) clearTimeout(timeout);
								visiblePopup(obj, false);
								break;
							case 37:
							case 38:
							case 39:
							case 40:
								return false;
							case 13:
								obj.blur();
								break;
							default:
								if (timeout) clearTimeout(timeout);
								timeout = setTimeout(function() {
									methods.search.apply(obj, []);
								}, settings.timeoutAmout);
							}
						},
						focus : function() {
							obj.select();
							methods.search.apply(obj, []);
						},
						blur : function() {
							if (timeout) clearTimeout(timeout);
							visiblePopup(obj, false);
						},
						mouseup : function(e){
							e.preventDefault();
						}
					});
//			//se usa la ultima ul por los dos niveles requeridos por nibbler
			popup.find('li.item-autocomplete').die().live('mousedown', function() {
				methods.selectItem.apply(obj, [ this ]);
				methods.confirmActiveItem.apply(obj, []);

			})
			.live(
					'hover', function() {
						$(this).addClass('active')
							.siblings().removeClass('active');
					});
		}

		/**
		 * Muestar u oculta el popup de acuerdo al estado visible.
		 * @param obj input
		 * @para visible boolean
		 */
		function visiblePopup(obj, visible) {
			var $popup = getPopup(obj);
			if (visible) {
				var coors = obj.offset();
				$popup.css({
					display : 'block',
					top : (coors.top + obj.outerHeight()),
					left : coors.left
				});
				//el ul:last es necesario para seguir el markup de nibbler que usa dos listas anidadas
				methods.selectItem.apply(obj, [$("ul:last li:first", $popup)]);
			} else {
				$popup.hide();
			}
		}

		/**
		 * Setea estilo de popup
		 * @param obj es el input
		 */
		function initStyle(obj) {
			var $popup = getPopup(obj);
			var value;
			var stylesToCheck = [ 'width', 'min-width', 'max-width' ];
			for ( var i in stylesToCheck) {
				if (settings[stylesToCheck[i]] == 'element') {
					value = obj.outerWidth();
				} else if (isNumber(settings[stylesToCheck[i]])) {
					value = settings[stylesToCheck[i]] + 'px';
				} else {
					value = settings[stylesToCheck[i]];
				}
				$popup.css(stylesToCheck[i], value);
			}
			$popup.css({'position' : 'absolute'});
		}
		
		
		/**
		 * Recibe el objeto input y devuelve el popup asociado a ese input
		 */
		function getPopup(obj) {
			return obj.data('simpleAutocompleteObject');
		}

		/**
		 * Devuelve boolean si es un numero
		 */
		function isNumber(n) {
			return !isNaN(parseInt(n, 10));
		}

		/**
		 * Elimina caracteres especiales, los espacios repetidos, los del inicio
		 * y del final del string
		 */
		function strClean(value) {
			return value.replace(/([.,:;@!~_=<>`#"\'?*%+^$[\]\/\\(){}|-])/g,
					' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
		}

		/**
		 * Crea grupos de caracteres "insensitivos" entre si
		 */
		function strChars(value) {
			var groups = [ '\u0061\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5', // a à
																			// á â
																			// ã ä
																			// å
			'\u0065\u00E8\u00E9\u00EA\u00EB', // e è é ê ë
			'\u0069\u00EC\u00ED\u00EE\u00EF', // i ì í î ï
			'\u006F\u00F2\u00F3\u00F4\u00F5\u00F6', // o ò ó ô õ ö
			'\u0075\u00F9\u00FA\u00FB\u00FC', // u ù ú û ü
			'\u006E\u00F1', // n ñ
			'\u0060\u0027\u00B4' // ` ' ´
			];

			for ( var i = 0; i < groups.length; i++) {
				value = value.replace(new RegExp('[' + groups[i] + ']', 'ig'),
						'[' + groups[i] + ']');
			}

			return value;
		}

		
		// public 
		return this.each(function() {
			if (methods[method]) {
				return methods[method].apply($(this), Array.prototype.slice.call(arguments, 1));
			} else if (typeof method === 'object' || !method) {
				return methods.init.apply($(this), [ method ]);
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.simpleAutocomplete');
			}
		});

	};
})(jQuery);