var SF = {
	View : {}
};



SF.View.Tab = Backbone.View.extend({
	tabItemTpl  : _.template('<li class="<%=active?"active":""%>"><a href="#"  data-toggle="tab"><%=title%></a></li>'),
	contentItemTpl : _.template('<div class="tab-pane fade in <%=active?"active":""%>"><%=html%></div>'),
	events : {
		'click .nav-tabs li' : 'onTitleClick'
	},
	onTitleClick : function(e){
		alert(e.currentTarget)
		
	},
	removeItem : function(index){
		this.tab.remove(this.tab.at(index));
	},
	addItem : function(index){
		
		
	},
	activeItem : function(index){
		
	},
	initialize :function(cfg){
		$.extend(this,cfg);
		var me = this;
		me.tab = new Backbone.Collection([{title :'tab1',active : true,html : '123'},{title :'tab2',active : false,html :'321'},{title :'tab3',active : false,html:'456'}]);
		me.listenTo(me.tab,'remove',me.render,me)
		me.headEl = $("<ul/>").addClass('nav nav-tabs');
		me.contentEl = $("<div/>").addClass('tab-content');
		me.$el.append(me.headEl).append(me.contentEl);
		this.render();
	},
	activeItem : 0,
	genTabTitle : function(item,index){
		console.log(item)
		this.headEl.append(this.tabItemTpl(item));
	},
	genTabContent : function(item,index){
		this.contentEl.append(this.contentItemTpl(item));
	},
	render : function(){
		var me = this;
		me.headEl.empty();
		me.contentEl.empty();
		me.tab.each(function(item,index){
			me.genTabTitle(item.toJSON(),index);
			me.genTabContent(item.toJSON(),index);
		});
		$(document.body).append(me.$el)
		return this;
	}
});

SF.View.Tree =  Backbone.View.extend({
	
	
});
