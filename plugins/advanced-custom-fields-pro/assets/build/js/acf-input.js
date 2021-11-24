(function($, undefined){
	
	// vars
	var storage = [];
	
	/**
	*  acf.Field
	*
	*  description
	*
	*  @date	23/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.Field = acf.Model.extend({
		
		// field type
		type: '',
		
		// class used to avoid nested event triggers
		eventScope: '.acf-field',
		
		// initialize events on 'ready'
		wait: 'ready',
		
		/**
		*  setup
		*
		*  Called during the constructor function to setup this field ready for initialization
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	jQuery $field The field element.
		*  @return	void
		*/
		
		setup: function( $field ){
			
			// set $el
			this.$el = $field;
			
			// inherit $field data
			this.inherit( $field );
			
			// inherit controll data
			this.inherit( this.$control() );
		},
		
		/**
		*  val
		*
		*  Sets or returns the field's value
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	mixed val Optional. The value to set
		*  @return	mixed
		*/
		
		val: function( val ){
			
			// Set.
			if( val !== undefined ) {
				return this.setValue( val );
			
			// Get.
			} else {
				return this.prop('disabled') ? null : this.getValue();
			}
		},
		
		/**
		*  getValue
		*
		*  returns the field's value
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	mixed
		*/
		
		getValue: function(){
			return this.$input().val();
		},
		
		/**
		*  setValue
		*
		*  sets the field's value and returns true if changed
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	mixed val
		*  @return	boolean. True if changed.
		*/
		
		setValue: function( val ){
			return acf.val( this.$input(), val );
		},
		
		/**
		*  __
		*
		*  i18n helper to be removed
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		__: function( string ){
			return acf._e( this.type, string );
		},
		
		/**
		*  $control
		*
		*  returns the control jQuery element used for inheriting data. Uses this.control setting.
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	jQuery
		*/
		
		$control: function(){
			return false;
		},
		
		/**
		*  $input
		*
		*  returns the input jQuery element used for saving values. Uses this.input setting.
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	jQuery
		*/
		
		$input: function(){
			return this.$('[name]:first');
		},
		
		/**
		*  $inputWrap
		*
		*  description
		*
		*  @date	12/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		$inputWrap: function(){
			return this.$('.acf-input:first');
		},
		
		/**
		*  $inputWrap
		*
		*  description
		*
		*  @date	12/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		$labelWrap: function(){
			return this.$('.acf-label:first');
		},
		
		/**
		*  getInputName
		*
		*  Returns the field's input name
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	string
		*/
		
		getInputName: function(){
			return this.$input().attr('name') || '';
		},
		
		/**
		*  parent
		*
		*  returns the field's parent field or false on failure.
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	object|false
		*/
		
		parent: function() {
			
			// vars
			var parents = this.parents();
			
			// return
			return parents.length ? parents[0] : false;
		},
		
		/**
		*  parents
		*
		*  description
		*
		*  @date	9/7/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		parents: function(){
			
			// vars
			var $parents = this.$el.parents('.acf-field');
			
			// convert
			var parents = acf.getFields( $parents );
			
			// return
			return parents;
		},
		
		show: function( lockKey, context ){
			
			// show field and store result
			var changed = acf.show( this.$el, lockKey );
			
			// do action if visibility has changed
			if( changed ) {
				this.prop('hidden', false);
				acf.doAction('show_field', this, context);
			}
			
			// return
			return changed;
		},
		
		hide: function( lockKey, context ){
			
			// hide field and store result
			var changed = acf.hide( this.$el, lockKey );
			
			// do action if visibility has changed
			if( changed ) {
				this.prop('hidden', true);
				acf.doAction('hide_field', this, context);
			}
			
			// return
			return changed;
		},
		
		enable: function( lockKey, context ){
			
			// enable field and store result
			var changed = acf.enable( this.$el, lockKey );
			
			// do action if disabled has changed
			if( changed ) {
				this.prop('disabled', false);
				acf.doAction('enable_field', this, context);
			}
			
			// return
			return changed;
		},
		
		disable: function( lockKey, context ){
			
			// disabled field and store result
			var changed = acf.disable( this.$el, lockKey );
			
			// do action if disabled has changed
			if( changed ) {
				this.prop('disabled', true);
				acf.doAction('disable_field', this, context);
			}
			
			// return
			return changed;
		},
		
		showEnable: function( lockKey, context ){
			
			// enable
			this.enable.apply(this, arguments);
			
			// show and return true if changed
			return this.show.apply(this, arguments);
		},
		
		hideDisable: function( lockKey, context ){
			
			// disable
			this.disable.apply(this, arguments);
			
			// hide and return true if changed
			return this.hide.apply(this, arguments);
		},
		
		showNotice: function( props ){
			
			// ensure object
			if( typeof props !== 'object' ) {
				props = { text: props };
			}
			
			// remove old notice
			if( this.notice ) {
				this.notice.remove();
			}
			
			// create new notice
			props.target = this.$inputWrap();
			this.notice = acf.newNotice( props );
		},
		
		removeNotice: function( timeout ){
			if( this.notice ) {
				this.notice.away( timeout || 0 );
				this.notice = false;
			}
		},
		
		showError: function( message ){
			
			// add class
			this.$el.addClass('acf-error');
			
			// add message
			if( message !== undefined ) {
				this.showNotice({
					text: message,
					type: 'error',
					dismiss: false
				});
			}
			
			// action
			acf.doAction('invalid_field', this);
			
			// add event
			this.$el.one('focus change', 'input, select, textarea', $.proxy( this.removeError, this ));	
		},
		
		removeError: function(){
			
			// remove class
			this.$el.removeClass('acf-error');
			
			// remove notice
			this.removeNotice( 250 );
			
			// action
			acf.doAction('valid_field', this);
		},
		
		trigger: function( name, args, bubbles ){
			
			// allow some events to bubble
			if( name == 'invalidField' ) {
				bubbles = true;
			}
			
			// return
			return acf.Model.prototype.trigger.apply(this, [name, args, bubbles]);
		},
	});
	
	/**
	*  newField
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newField = function( $field ){
		
		// vars
		var type = $field.data('type');
		var mid = modelId( type );
		var model = acf.models[ mid ] || acf.Field;
		
		// instantiate
		var field = new model( $field );
		
		// actions
		acf.doAction('new_field', field);
		
		// return
		return field;
	};
	
	/**
	*  mid
	*
	*  Calculates the model ID for a field type
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	string type
	*  @return	string
	*/
	
	var modelId = function( type ) {
		return acf.strPascalCase( type || '' ) + 'Field';
	};
	
	/**
	*  registerFieldType
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.registerFieldType = function( model ){
		
		// vars
		var proto = model.prototype;
		var type = proto.type;
		var mid = modelId( type );
		
		// store model
		acf.models[ mid ] = model;
		
		// store reference
		storage.push( type );
	};
	
	/**
	*  acf.getFieldType
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getFieldType = function( type ){
		var mid = modelId( type );
		return acf.models[ mid ] || false;
	}
	
	/**
	*  acf.getFieldTypes
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getFieldTypes = function( args ){
		
		// defaults
		args = acf.parseArgs(args, {
			category: '',
			// hasValue: true
		});
		
		// clonse available types
		var types = [];
		
		// loop
		storage.map(function( type ){
			
			// vars
			var model = acf.getFieldType(type);
			var proto = model.prototype;
						
			// check operator
			if( args.category && proto.category !== args.category )  {
				return;
			}
			
			// append
			types.push( model );
		});
		
		// return
		return types;
	};
	
})(jQuery);
(function($, undefined){
	
	/**
	*  findFields
	*
	*  Returns a jQuery selection object of acf fields.
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	object $args {
	*		Optional. Arguments to find fields.
	*
	*		@type string			key			The field's key (data-attribute).
	*		@type string			name		The field's name (data-attribute).
	*		@type string			type		The field's type (data-attribute).
	*		@type string			is			jQuery selector to compare against.
	*		@type jQuery			parent		jQuery element to search within.
	*		@type jQuery			sibling		jQuery element to search alongside.
	*		@type limit				int			The number of fields to find.
	*		@type suppressFilters	bool		Whether to allow filters to add/remove results. Default behaviour will ignore clone fields.
	*  }
	*  @return	jQuery
	*/
	
	acf.findFields = function( args ){
		
		// vars
		var selector = '.acf-field';
		var $fields = false;
		
		// args
		args = acf.parseArgs(args, {
			key: '',
			name: '',
			type: '',
			is: '',
			parent: false,
			sibling: false,
			limit: false,
			visible: false,
			suppressFilters: false,
		});
		
		// filter args
		if( !args.suppressFilters ) {
			args = acf.applyFilters('find_fields_args', args);
		}
		
		// key
		if( args.key ) {
			selector += '[data-key="' + args.key + '"]';
		}
		
		// type
		if( args.type ) {
			selector += '[data-type="' + args.type + '"]';
		}
		
		// name
		if( args.name ) {
			selector += '[data-name="' + args.name + '"]';
		}
		
		// is
		if( args.is ) {
			selector += args.is;
		}
		
		// visibility
		if( args.visible ) {
			selector += ':visible';
		}
		
		// query
		if( args.parent ) {
			$fields = args.parent.find( selector );
		} else if( args.sibling ) {
			$fields = args.sibling.siblings( selector );
		} else {
			$fields = $( selector );
		}
		
		// filter
		if( !args.suppressFilters ) {
			$fields = $fields.not('.acf-clone .acf-field');
			$fields = acf.applyFilters('find_fields', $fields);
		}
		
		// limit
		if( args.limit ) {
			$fields = $fields.slice( 0, args.limit );
		}
		
		// return
		return $fields;
		
	};
	
	/**
	*  findField
	*
	*  Finds a specific field with jQuery
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	string key 		The field's key.
	*  @param	jQuery $parent	jQuery element to search within.
	*  @return	jQuery
	*/
	
	acf.findField = function( key, $parent ){
		return acf.findFields({
			key: key,
			limit: 1,
			parent: $parent,
			suppressFilters: true
		});
	};
	
	/**
	*  getField
	*
	*  Returns a field instance
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	jQuery|string $field	jQuery element or field key.
	*  @return	object
	*/
	
	acf.getField = function( $field ){
		
		// allow jQuery
		if( $field instanceof jQuery ) {
		
		// find fields
		} else {
			$field = acf.findField( $field );
		}
		
		// instantiate
		var field = $field.data('acf');
		if( !field ) {
			field = acf.newField( $field );
		}
		
		// return
		return field;
	};
	
	/**
	*  getFields
	*
	*  Returns multiple field instances
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	jQuery|object $fields	jQuery elements or query args.
	*  @return	array
	*/
	
	acf.getFields = function( $fields ){
		
		// allow jQuery
		if( $fields instanceof jQuery ) {
		
		// find fields	
		} else {
			$fields = acf.findFields( $fields );
		}
		
		// loop
		var fields = [];
		$fields.each(function(){
			var field = acf.getField( $(this) );
			fields.push( field );
		});
		
		// return
		return fields;
	};
	
	/**
	*  findClosestField
	*
	*  Returns the closest jQuery field element
	*
	*  @date	9/4/18
	*  @since	5.6.9
	*
	*  @param	jQuery $el
	*  @return	jQuery
	*/
	
	acf.findClosestField = function( $el ){
		return $el.closest('.acf-field');
	};
	
	/**
	*  getClosestField
	*
	*  Returns the closest field instance
	*
	*  @date	22/1/18
	*  @since	5.6.5
	*
	*  @param	jQuery $el
	*  @return	object
	*/
	
	acf.getClosestField = function( $el ){
		var $field = acf.findClosestField( $el );
		return this.getField( $field );
	};
	
	/**
	*  addGlobalFieldAction
	*
	*  Sets up callback logic for global field actions
	*
	*  @date	15/6/18
	*  @since	5.6.9
	*
	*  @param	string action
	*  @return	void
	*/
	
	var addGlobalFieldAction = function( action ){
		
		// vars
		var globalAction = action;
		var pluralAction = action + '_fields';	// ready_fields
		var singleAction = action + '_field';	// ready_field
		
		// global action
		var globalCallback = function( $el /*, arg1, arg2, etc*/ ){
			//console.log( action, arguments );
			
			// get args [$el, ...]
			var args = acf.arrayArgs( arguments );
			var extraArgs = args.slice(1);
			
			// find fields
			var fields = acf.getFields({ parent: $el });
			
			// check
			if( fields.length ) {
				
				// pluralAction
				var pluralArgs = [ pluralAction, fields ].concat( extraArgs );
				acf.doAction.apply(null, pluralArgs);
			}
		};
		
		// plural action
		var pluralCallback = function( fields /*, arg1, arg2, etc*/ ){
			//console.log( pluralAction, arguments );
			
			// get args [fields, ...]
			var args = acf.arrayArgs( arguments );
			var extraArgs = args.slice(1);
			
			// loop
			fields.map(function( field, i ){
				//setTimeout(function(){
				// singleAction
				var singleArgs = [ singleAction, field ].concat( extraArgs );
				acf.doAction.apply(null, singleArgs);
				//}, i * 100);
			});
		};
		
		// add actions
		acf.addAction(globalAction, globalCallback);
		acf.addAction(pluralAction, pluralCallback);
		
		// also add single action
		addSingleFieldAction( action );
	}
	
	/**
	*  addSingleFieldAction
	*
	*  Sets up callback logic for single field actions
	*
	*  @date	15/6/18
	*  @since	5.6.9
	*
	*  @param	string action
	*  @return	void
	*/
	
	var addSingleFieldAction = function( action ){
		
		// vars
		var singleAction = action + '_field';	// ready_field
		var singleEvent = action + 'Field';		// readyField

		// single action
		var singleCallback = function( field /*, arg1, arg2, etc*/ ){
			//console.log( singleAction, arguments );
			
			// get args [field, ...]
			var args = acf.arrayArgs( arguments );
			var extraArgs = args.slice(1);
			
			// action variations (ready_field/type=image)
			var variations = ['type', 'name', 'key'];
			variations.map(function( variation ){
				
				// vars
				var prefix = '/' + variation + '=' + field.get(variation);
				
				// singleAction
				args = [ singleAction + prefix , field ].concat( extraArgs );
				acf.doAction.apply(null, args);
			});
			
			// event
			if( singleFieldEvents.indexOf(action) > -1 ) {
				field.trigger(singleEvent, extraArgs);
			}
		};
		
		// add actions
		acf.addAction(singleAction, singleCallback);	
	}
	
	// vars
	var globalFieldActions = [ 'prepare', 'ready', 'load', 'append', 'remove', 'unmount', 'remount', 'sortstart', 'sortstop', 'show', 'hide', 'unload' ];
	var singleFieldActions = [ 'valid', 'invalid', 'enable', 'disable', 'new', 'duplicate' ];
	var singleFieldEvents = [ 'remove', 'unmount', 'remount', 'sortstart', 'sortstop', 'show', 'hide', 'unload', 'valid', 'invalid', 'enable', 'disable', 'duplicate' ];
	
	// add
	globalFieldActions.map( addGlobalFieldAction );
	singleFieldActions.map( addSingleFieldAction );
	
	/**
	*  fieldsEventManager
	*
	*  Manages field actions and events
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	void
	*  @param	void
	*/
	
	var fieldsEventManager = new acf.Model({
		id: 'fieldsEventManager',
		events: {
			'click .acf-field a[href="#"]':	'onClick',
			'change .acf-field':			'onChange'
		},
		onClick: function( e ){
			
			// prevent default of any link with an href of #
			e.preventDefault();
		},
		onChange: function(){
			
			// preview hack allows post to save with no title or content
			$('#_acf_changed').val(1);
		}
	});

	var duplicateFieldsManager = new acf.Model({
		id: 'duplicateFieldsManager',
		actions: {
			'duplicate': 'onDuplicate',
			'duplicate_fields': 'onDuplicateFields',
		},
		onDuplicate: function( $el, $el2 ){
			var fields = acf.getFields({ parent: $el });
			if( fields.length ) {
				var $fields = acf.findFields({ parent: $el2 });
				acf.doAction( 'duplicate_fields', fields, $fields );
			}
		},
		onDuplicateFields: function( fields, duplicates ){
			fields.map(function( field, i ){
				acf.doAction( 'duplicate_field', field, $(duplicates[i]) );
			});
		}
	});
	
})(jQuery);
(function($, undefined){
	
	var i = 0;
	
	var Field = acf.Field.extend({
		
		type: 'accordion',
		
		wait: '',
		
		$control: function(){
			return this.$('.acf-fields:first');
		},
		
		initialize: function(){
			
			// Bail early if this is a duplicate of an existing initialized accordion.
			if( this.$el.hasClass('acf-accordion') ) {
				return;
			}
			
			// bail early if is cell
			if( this.$el.is('td') ) return;
			
			// enpoint
			if( this.get('endpoint') ) {
				return this.remove();
			}
			
			// vars
			var $field = this.$el;
			var $label = this.$labelWrap()
			var $input = this.$inputWrap();
			var $wrap = this.$control();
			var $instructions = $input.children('.description');
			
			// force description into label
			if( $instructions.length ) {
				$label.append( $instructions );
			}
			
			// table
			if( this.$el.is('tr') ) {
				
				// vars
				var $table = this.$el.closest('table');
				var $newLabel = $('<div class="acf-accordion-title"/>');
				var $newInput = $('<div class="acf-accordion-content"/>');
				var $newTable = $('<table class="' + $table.attr('class') + '"/>');
				var $newWrap = $('<tbody/>');
				
				// dom
				$newLabel.append( $label.html() );
				$newTable.append( $newWrap );
				$newInput.append( $newTable );
				$input.append( $newLabel );
				$input.append( $newInput );
				
				// modify
				$label.remove();
				$wrap.remove();
				$input.attr('colspan', 2);
				
				// update vars
				$label = $newLabel;
				$input = $newInput;
				$wrap = $newWrap;
			}
			
			// add classes
			$field.addClass('acf-accordion');
			$label.addClass('acf-accordion-title');
			$input.addClass('acf-accordion-content');
			
			// index
			i++;
			
			// multi-expand
			if( this.get('multi_expand') ) {
				$field.attr('multi-expand', 1);
			}
			
			// open
			var order = acf.getPreference('this.accordions') || [];
			if( order[i-1] !== undefined ) {
				this.set('open', order[i-1]);
			}
			
			if( this.get('open') ) {
				$field.addClass('-open');
				$input.css('display', 'block'); // needed for accordion to close smoothly
			}
			
			// add icon
			$label.prepend( accordionManager.iconHtml({ open: this.get('open') }) );
			
			// classes
			// - remove 'inside' which is a #poststuff WP class
			var $parent = $field.parent();
			$wrap.addClass( $parent.hasClass('-left') ? '-left' : '' );
			$wrap.addClass( $parent.hasClass('-clear') ? '-clear' : '' );
			
			// append
			$wrap.append( $field.nextUntil('.acf-field-accordion', '.acf-field') );
			
			// clean up
			$wrap.removeAttr('data-open data-multi_expand data-endpoint');
		},
		
	});
	
	acf.registerFieldType( Field );


	/**
	*  accordionManager
	*
	*  Events manager for the acf accordion
	*
	*  @date	14/2/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
	
	var accordionManager = new acf.Model({
		
		actions: {
			'unload':	'onUnload'
		},
		
		events: {
			'click .acf-accordion-title': 'onClick',
			'invalidField .acf-accordion':	'onInvalidField'
		},
		
		isOpen: function( $el ) {
			return $el.hasClass('-open');
		},
		
		toggle: function( $el ){
			if( this.isOpen($el) ) {
				this.close( $el );
			} else {
				this.open( $el );
			}
		},
		
		iconHtml: function( props ){
			
			// Use SVG inside Gutenberg editor.
			if( acf.isGutenberg() ) {
				if( props.open ) {
					return '<svg class="acf-accordion-icon" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><g><path fill="none" d="M0,0h24v24H0V0z"></path></g><g><path d="M12,8l-6,6l1.41,1.41L12,10.83l4.59,4.58L18,14L12,8z"></path></g></svg>';
				} else {
					return '<svg class="acf-accordion-icon" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><g><path fill="none" d="M0,0h24v24H0V0z"></path></g><g><path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z"></path></g></svg>';
				}
			} else {
				if( props.open ) {
					return '<i class="acf-accordion-icon dashicons dashicons-arrow-down"></i>';
				} else {
					return '<i class="acf-accordion-icon dashicons dashicons-arrow-right"></i>';
				}
			}
		},
		
		open: function( $el ){
			var duration = acf.isGutenberg() ? 0 : 300;
			
			// open
			$el.find('.acf-accordion-content:first').slideDown( duration ).css('display', 'block');
			$el.find('.acf-accordion-icon:first').replaceWith( this.iconHtml({ open: true }) );
			$el.addClass('-open');
			
			// action
			acf.doAction('show', $el);
			
			// close siblings
			if( !$el.attr('multi-expand') ) {
				$el.siblings('.acf-accordion.-open').each(function(){
					accordionManager.close( $(this) );
				});
			}
		},
		
		close: function( $el ){
			var duration = acf.isGutenberg() ? 0 : 300;
			
			// close
			$el.find('.acf-accordion-content:first').slideUp( duration );
			$el.find('.acf-accordion-icon:first').replaceWith( this.iconHtml({ open: false }) );
			$el.removeClass('-open');
			
			// action
			acf.doAction('hide', $el);
		},
		
		onClick: function( e, $el ){
			
			// prevent Defailt
			e.preventDefault();
			
			// open close
			this.toggle( $el.parent() );
			
		},
		
		onInvalidField: function( e, $el ){
			
			// bail early if already focused
			if( this.busy ) {
				return;
			}
			
			// disable functionality for 1sec (allow next validation to work)
			this.busy = true;
			this.setTimeout(function(){
				this.busy = false;
			}, 1000);
			
			// open accordion
			this.open( $el );
		},
		
		onUnload: function( e ){
			
			// vars
			var order = [];
			
			// loop
			$('.acf-accordion').each(function(){
				var open = $(this).hasClass('-open') ? 1 : 0;
				order.push(open);
			});
			
			// set
			if( order.length ) {
				acf.setPreference('this.accordions', order);
			}
		}
	});

})(jQuery);
(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'button_group',
		
		events: {
			'click input[type="radio"]': 'onClick'
		},
		
		$control: function(){
			return this.$('.acf-button-group');
		},
		
		$input: function(){
			return this.$('input:checked');
		},
		
		setValue: function( val ){
			this.$('input[value="' + val + '"]').prop('checked', true).trigger('change');
		},
		
		onClick: function( e, $el ){
			
			// vars
			var $label = $el.parent('label');
			var selected = $label.hasClass('selected');
			
			// remove previous selected
			this.$('.selected').removeClass('selected');
			
			// add active class
			$label.addClass('selected');
			
			// allow null
			if( this.get('allow_null') && selected ) {
				$label.removeClass('selected');
				$el.prop('checked', false).trigger('change');
			}
		}
	});
	
	acf.registerFieldType( Field );

})(jQuery);
(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'checkbox',
		
		events: {
			'change input':					'onChange',
			'click .acf-add-checkbox':		'onClickAdd',
			'click .acf-checkbox-toggle':	'onClickToggle',
			'click .acf-checkbox-custom':	'onClickCustom'
		},
		
		$control: function(){
			return this.$('.acf-checkbox-list');
		},
		
		$toggle: function(){
			return this.$('.acf-checkbox-toggle');
		},
		
		$input: function(){
			return this.$('input[type="hidden"]');
		},
		
		$inputs: function(){
			return this.$('input[type="checkbox"]').not('.acf-checkbox-toggle');
		},
		
		getValue: function(){
			var val = [];
			this.$(':checked').each(function(){
				val.push( $(this).val() );
			});
			return val.length ? val : false;
		},
		
		onChange: function( e, $el ){
			
			// Vars.
			var checked = $el.prop('checked');
			var $label = $el.parent('label');
			var $toggle = this.$toggle();
			
			// Add or remove "selected" class.
			if( checked ) {
				$label.addClass('selected');
			} else {
				$label.removeClass('selected');
			}
			
			// Update toggle state if all inputs are checked.
			if( $toggle.length ) {
				var $inputs = this.$inputs();
				
				// all checked
				if( $inputs.not(':checked').length == 0 ) {
					$toggle.prop('checked', true);
				} else {
					$toggle.prop('checked', false);
				}
			}
		},
		
		onClickAdd: function( e, $el ){
			var html = '<li><input class="acf-checkbox-custom" type="checkbox" checked="checked" /><input type="text" name="' + this.getInputName() + '[]" /></li>';
			$el.parent('li').before( html );	
		},
		
		onClickToggle: function( e, $el ){
			
			// Vars.
			var checked = $el.prop('checked');
			var $inputs = this.$('input[type="checkbox"]');
			var $labels = this.$('label');
			
			// Update "checked" state.
			$inputs.prop('checked', checked);
			
			// Add or remove "selected" class.
			if( checked ) {
				$labels.addClass('selected');
			} else {
				$labels.removeClass('selected');
			}
		},
		
		onClickCustom: function( e, $el ){
			var checked = $el.prop('checked');
			var $text = $el.next('input[type="text"]');
			
			// checked
			if( checked ) {
				$text.prop('disabled', false);
				
			// not checked	
			} else {
				$text.prop('disabled', true);
				
				// remove
				if( $text.val() == '' ) {
					$el.parent('li').remove();
				}
			}
		}
	});
	
	acf.registerFieldType( Field );
	
})(jQuery);
(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'color_picker',
		
		wait: 'load',
		
		events: {
			'duplicateField': 'onDuplicate'
		},

		$control: function(){
			return this.$('.acf-color-picker');
		},
		
		$input: function(){
			return this.$('input[type="hidden"]');
		},
		
		$inputText: function(){
			return this.$('input[type="text"]');
		},
		
		setValue: function( val ){
			
			// update input (with change)
			acf.val( this.$input(), val );
			
			// update iris
			this.$inputText().iris('color', val);
		},
		
		initialize: function(){
			
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();
			
			// event
			var onChange = function( e ){
				
				// timeout is required to ensure the $input val is correct
				setTimeout(function(){ 
					acf.val( $input, $inputText.val() );
				}, 1);
			}
			
			// args
			var args = {
				defaultColor: false,
				palettes: true,
				hide: true,
				change: onChange,
				clear: onChange
			};
			
 			// filter
 			var args = acf.applyFilters('color_picker_args', args, this);
        	
 			// initialize
			$inputText.wpColorPicker( args );
		},

		onDuplicate: function( e, $el, $duplicate ){
			
			// The wpColorPicker library does not provide a destroy method.
			// Manually reset DOM by replacing elements back to their original state.
			$colorPicker = $duplicate.find('.wp-picker-container');
			$inputText = $duplicate.find('input[type="text"]');
			$colorPicker.replaceWith( $inputText );
		}
	});
	
	acf.registerFieldType( Field );
	
})(jQuery);
(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'date_picker',
		
		events: {
			'blur input[type="text"]':	'onBlur',
			'duplicateField':			'onDuplicate'
		},
		
		$control: function(){
			return this.$('.acf-date-picker');
		},
		
		$input: function(){
			return this.$('input[type="hidden"]');
		},
		
		$inputText: function(){
			return this.$('input[type="text"]');
		},
				
		initialize: function(){
			
			// save_format: compatibility with ACF < 5.0.0
			if( this.has('save_format') ) {
				return this.initializeCompatibility();
			}
			
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();
			
			// args
			var args = { 
				dateFormat:			this.get('date_format'),
				altField:			$input,
				altFormat:			'yymmdd',
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.get('first_day')
			};
			
			// filter
			args = acf.applyFilters('date_picker_args', args, this);
			
			// add date picker
			acf.newDatePicker( $inputText, args );
			
			// action
			acf.doAction('date_picker_init', $inputText, args, this);
			
		},
		
		initializeCompatibility: function(){
			
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();
			
			// get and set value from alt field
			$inputText.val( $input.val() );
			
			// args
			var args =  { 
				dateFormat:			this.get('date_format'),
				altField:			$input,
				altFormat:			this.get('save_format'),
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.get('first_day')
			};
			
			// filter for 3rd party customization
			args = acf.applyFilters('date_picker_args', args, this);
			
			// backup
			var dateFormat = args.dateFormat;
			
			// change args.dateFormat
			args.dateFormat = this.get('save_format');
				
			// add date picker
			acf.newDatePicker( $inputText, args );
			
			// now change the format back to how it should be.
			$inputText.datepicker( 'option', 'dateFormat', dateFormat );
			
			// action for 3rd party customization
			acf.doAction('date_picker_init', $inputText, args, this);
		},
		
		onBlur: function(){
			if( !this.$inputText().val() ) {
				acf.val( this.$input(), '' );
			}
		},
		
		onDuplicate: function( e, $el, $duplicate ){
			$duplicate.find('input[type="text"]').removeClass('hasDatepicker').removeAttr('id');
		}
	});
	
	acf.registerFieldType( Field );
	
	
	// manager
	var datePickerManager = new acf.Model({
		priority: 5,
		wait: 'ready',
		initialize: function(){
			
			// vars
			var locale = acf.get('locale');
			var rtl = acf.get('rtl');
			var l10n = acf.get('datePickerL10n');
			
			// bail ealry if no l10n
			if( !l10n ) {
				return false;
			}
			
			// bail ealry if no datepicker library
			if( typeof $.datepicker === 'undefined' ) {
				return false;
			}
			
			// rtl
			l10n.isRTL = rtl;
			
			// append
			$.datepicker.regional[ locale ] = l10n;
			$.datepicker.setDefaults(l10n);
		}
	});
	
	// add
	acf.newDatePicker = function( $input, args ){
		
		// bail ealry if no datepicker library
		if( typeof $.datepicker === 'undefined' ) {
			return false;
		}
		
		// defaults
		args = args || {};
		
		// initialize
		$input.datepicker( args );
		
		// wrap the datepicker (only if it hasn't already been wrapped)
		if( $('body > #ui-datepicker-div').exists() ) {
			$('body > #ui-datepicker-div').wrap('<div class="acf-ui-datepicker" />');
		}
	};
	
})(jQuery);
(function($, undefined){
	
	var Field = acf.models.DatePickerField.extend({
		
		type: 'date_time_picker',
		
		$control: function(){
			return this.$('.acf-date-time-picker');
		},
		
		initialize: function(){
			
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();
			
			// args
			var args = {
				dateFormat:			this.get('date_format'),
				timeFormat:			this.get('time_format'),
				altField:			$input,
				altFieldTimeOnly:	false,
				altFormat:			'yy-mm-dd',
				altTimeFormat:		'HH:mm:ss',
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.get('first_day'),
				controlType: 		'select',
				oneLine:			true
			};
			
			// filter
			args = acf.applyFilters('date_time_picker_args', args, this);
			
			// add date time picker
			acf.newDateTimePicker( $inputText, args );
			
			// action
			acf.doAction('date_time_picker_init', $inputText, args, this);
		}
	});
	
	acf.registerFieldType( Field );
	
	
	// manager
	var dateTimePickerManager = new acf.Model({
		priority: 5,
		wait: 'ready',
		initialize: function(){
			
			// vars
			var locale = acf.get('locale');
			var rtl = acf.get('rtl');
			var l10n = acf.get('dateTimePickerL10n');
			
			// bail ealry if no l10n
			if( !l10n ) {